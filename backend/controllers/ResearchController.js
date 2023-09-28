import Research from '../models/ResearchModel.js';

export const createResearch= async (req, res) => {
    try {
        const research = await Research.create(req.body);
        res.status(201).json({ msg: "Research Created", data: research });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam menginput data Research.' });
    }
}

export const showAllResearch = async (req, res) => {
    const { id_dosen } = req.params;
    try {
        const response = await Research.findAll(
            {
                where: { id_dosen: id_dosen }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Research.' });
    }
}

export const getResearchById = async (req, res) => {
    const { id_dosen, id_research } = req.params;
    try {
        const response = await Research.findOne(
            {
                where: { id_dosen: id_dosen, id_research: id_research }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data Research.' });
    }
}

export const updateResearch = async (req, res) => {
    try {
        await Research.update(req.body, {
            where: {
                id_research: req.params.id_research
            }
        });
        res.status(201).json({ msg: "Berhasil update Research" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengupdate Research" });
    }
}

export const deleteResearch = async (req, res) => {
    try {
        const id = req.params.id_research; // Ambil ID dari parameter URL

        // Menggunakan klausa 'where' untuk menghapus Research dengan ID yang sesuai
        const data = await Research.destroy({
            where: {
                id_research: id
            }
        });

        if (data === 1) {
            // Data berhasil dihapus (data === 1 menunjukkan satu baris dihapus)
            res.status(200).json({ msg: "Research berhasil dihapus" });
        } else {
            // Data tidak ditemukan
            res.status(404).json({ msg: "Research tidak ditemukan" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus Research" });
    }
};