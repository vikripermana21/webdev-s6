import EduHistory from '../models/EduHistoryModel.js';

export const createEducationHistory= async (req, res) => {
    try {
        const education_history = await EduHistory.create(req.body);
        res.status(201).json({ msg: "EduHistory Created", data: education_history });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam menginput data Education History.' });
    }
}

export const showAllEducationHistory = async (req, res) => {
    const { id_dosen } = req.params;
    try {
        const response = await EduHistory.findAll(
            {
                where: { id_dosen: id_dosen }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Education History.' });
    }
}

export const getEducationHistoryById = async (req, res) => {
    const { id_dosen, id_education_history } = req.params;
    try {
        const response = await EduHistory.findOne(
            {
                where: { id_dosen: id_dosen, id_education_history: id_education_history }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Education History.' });
    }
}

export const updateEducationHistory = async (req, res) => {
    try {
        await EduHistory.update(req.body, {
            where: {
                id_education_history: req.params.id_education_history
            }
        });
        res.status(201).json({ msg: "Berhasil update Education History" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengupdate Education History" });
    }
}

export const deleteEducationHistory = async (req, res) => {
    try {
        const id = req.params.id_education_history; // Ambil ID dari parameter URL

        // Menggunakan klausa 'where' untuk menghapus EduHistory dengan ID yang sesuai
        const data = await EduHistory.destroy({
            where: {
                id_education_history: id
            }
        });

        if (data === 1) {
            // Data berhasil dihapus (data === 1 menunjukkan satu baris dihapus)
            res.status(200).json({ msg: "Education History berhasil dihapus" });
        } else {
            // Data tidak ditemukan
            res.status(404).json({ msg: "Education History tidak ditemukan" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus Education History" });
    }
};