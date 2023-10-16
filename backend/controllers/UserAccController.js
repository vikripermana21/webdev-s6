//AdminControllers.js

import UserAcc from "../models/UserAccModel.js";
import jwt from "jsonwebtoken";
import ProfileDosen from "../models/ProfileModel.js";
import TeachHistory from "../models/TeachHistoryModel.js";
import Research from "../models/ResearchModel.js";
import PKM from "../models/PKMModel.js";
import EduHistory from "../models/EduHistoryModel.js";
const loggedOutTokens = new Set();

export const createAccount = async (req, res) => {
  try {
    const { nip, password, role } = req.body;

    // Cek apakah admin dengan nip yang sama sudah ada
    const existingAdmin = await UserAcc.findOne({
      where: { nip: nip },
    });

    // Jika admin dengan nip yang sama sudah ada, kembalikan pesan kesalahan
    if (existingAdmin) {
      return res.status(409).json({ error: "NIP sudah digunakan" });
    }

    // Buat admin baru
    const newAdmin = await UserAcc.create({
      nip: nip,
      password: password,
      role: role,
    });

    res.status(201).json({ message: "Registrasi berhasil", data: newAdmin });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat registrasi" });
  }
};

export const login = async (req, res) => {
  const token = jwt.sign(
    {
      id_user_account: UserAcc.id_user_account,
      nip: UserAcc.nip,
      password: UserAcc.password,
    },
    "secret-key"
  );
  try {
    const { nip, password } = req.body;

    // Cari account berdasarkan nip
    const account = await UserAcc.findOne({
      where: { nip: nip },
      include: [ProfileDosen],
    });

    // Jika account tidak ditemukan, kembalikan pesan kesalahan
    if (!account) {
      return res.status(401).json({ error: "NIP atau password salah" });
    }

    // Cek apakah password sesuai
    if (account.password !== password) {
      return res.status(401).json({ error: "NIP atau password salah" });
    }

    res
      .status(200)
      .json({ message: "Login berhasil", data: token, infoAkun: account });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
};

export const logout = async (req, res) => {
  try {
    // Dapatkan token dari header permintaan
    const token = req.headers.authorization;

    // Cek apakah token ada
    if (!token) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    // Periksa apakah token sudah ada dalam daftar token yang sudah logout
    // Jika sudah, kembalikan pesan bahwa pengguna sudah logout sebelumnya
    if (loggedOutTokens.has(token)) {
      return res.status(401).json({ error: "Anda sudah logout sebelumnya" });
    }

    // Tambahkan token ke daftar token yang sudah logout
    loggedOutTokens.add(token);

    res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat logout" });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    // Mengambil semua data akun dari database
    const accounts = await UserAcc.findAll();

    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id_user_account } = req.params; // Ambil id_user_account dari parameter URL

    // Cari akun berdasarkan id_user_account
    const account = await UserAcc.findOne(id_user_account);

    // Jika akun ditemukan, kirimkan sebagai respons JSON
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "Akun tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const deleteAccountWhole = async (req, res) => {
  try {
    console.log(req.params);
    // Find the profile to be deleted
    const profile = await ProfileDosen.findOne({
      where: { id_user_account: req.params.id_dosen },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Use Promise.all() to perform parallel deletion of related records
    await Promise.all([
      TeachHistory.destroy({ where: { id_dosen: profile.id_dosen } }),
      Research.destroy({ where: { id_dosen: profile.id_dosen } }),
      PKM.destroy({ where: { id_dosen: profile.id_dosen } }),
      EduHistory.destroy({ where: { id_dosen: profile.id_dosen } }),
      profile.destroy(),
      UserAcc.destroy({ where: { id_user_account: req.params.id_dosen } }),
    ]);

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
