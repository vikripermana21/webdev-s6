import TeachingHistory from '../models/TeachHistoryModel.js';

export const createTeachingHistory= async (req, res) => {
    try {
        const teaching_history = await TeachingHistory.create(req.body);
        res.status(201).json({ msg: "TeachHistory Created", data: teaching_history });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam menginput data Teaching History.' });
    }
}

export const showAllTeachingHistory = async (req, res) => {
    const { id_dosen } = req.params;
    try {
        const response = await TeachingHistory.findAll(
            {
                where: { id_dosen: id_dosen }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Teaching History.' });
    }
}

export const getTeachingHistoryById = async (req, res) => {
    const { id_dosen, id_teaching_history } = req.params;
    try {
        const response = await TeachingHistory.findOne(
            {
                where: { id_dosen: id_dosen, id_teaching_history: id_teaching_history }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Teaching History.' });
    }
}

export const updateTeachingHistory = async (req, res) => {
    try {
        await TeachingHistory.update(req.body, {
            where: {
                id_teaching_history: req.params.id_teaching_history
            }
        });
        res.status(201).json({ msg: "Berhasil update Teaching History" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengupdate Teaching History" });
    }
}

export const deleteTeachingHistory = async (req, res) => {
    try {
        const id = req.params.id_teaching_history; // Ambil ID dari parameter URL

        // Menggunakan klausa 'where' untuk menghapus TeachingHistory dengan ID yang sesuai
        const data = await TeachingHistory.destroy({
            where: {
                id_teaching_history: id
            }
        });

        if (data === 1) {
            // Data berhasil dihapus (data === 1 menunjukkan satu baris dihapus)
            res.status(200).json({ msg: "Teaching History berhasil dihapus" });
        } else {
            // Data tidak ditemukan
            res.status(404).json({ msg: "Teaching History tidak ditemukan" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus Teaching History" });
    }
};