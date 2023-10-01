//ProfileDosenControllers.js

import ProfileDosen from '../models/ProfileModel.js';
import EduHistory from '../models/EduHistoryModel.js';
import TeachHistory from '../models/TeachHistoryModel.js';
import Research from '../models/ResearchModel.js';
import PKM from '../models/PKMModel.js';

export const getAllLecturers = async (req, res) => {
    try {
      const profileWithRelation = await ProfileDosen.findAll({
        include: [EduHistory, TeachHistory, Research, PKM],
      });
      res.status(200).json(profileWithRelation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

export const createLecturer = async (req, res) => {
    try {
        // const lecturer = await ProfileDosen.create(req.body);
        const lecturer = await ProfileDosen.create({
            profile_picture: req.body.profile_picture,
            full_name: req.body.full_name,
            place_of_birth: req.body.place_of_birth,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            email: req.body.email,
            bio: req.body.bio,
            id_user_account: req.body.id_user_account,
            major: req.body.major,
            position: req.body.position,
            study_program: req.body.study_program
          });
        res.status(201).json({ msg: "Lecturer Created", data: lecturer });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam menginput data Lecturer.' });
    }

};

export const getLecturerById = async (req, res) => {
  const { id_dosen } = req.params;
  try {
    const response = await ProfileDosen.findOne({
      where: { id_dosen: id_dosen },
      include: [ EduHistory, TeachHistory, Research, PKM],
    });

    if (!response) {
      return res.status(404).json({ error: 'Profile Dosen tidak ditemukan' });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil Profile Dosen' });
  }
}

export const updateLecturer = async (req, res) => {
  const { id_dosen } = req.params;

  try {
    // Remove enum fields from req.body to prevent conflicts
    delete req.body.gender;

    const [updated] = await ProfileDosen.update(req.body, {
      where: { id_dosen: id_dosen },
    });

    if (updated) {
      const updatedProfile = await ProfileDosen.findOne({
        where: { id_dosen: id_dosen },
        include: [EduHistory, TeachHistory, Research, PKM],
      });
      return res.status(200).json({ message: 'Profile Dosen updated', data: updatedProfile });
    }

    return res.status(404).json({ error: 'Profile Dosen tidak ditemukan' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Terjadi kesalahan dalam mengupdate Profile Dosen' });
  }
};

export const deleteLecturer = async (req, res) => {
  const { id_dosen } = req.params;

  try {
    // Mengambil data yang akan dihapus
    const dataToDelete = await ProfileDosen.findOne({
      where: { id_dosen: id_dosen },
    });

    if (!dataToDelete) {
      return res.status(404).json({ error: 'Profile Dosen tidak ditemukan' });
    }

    // Hapus data yang telah ditemukan
    await dataToDelete.destroy();

    dataToDelete.gender = null;

    return res.status(204).json({ message: 'Profile Dosen deleted' });
  } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Terjadi kesalahan dalam menghapus Profile Dosen' });
  }
};