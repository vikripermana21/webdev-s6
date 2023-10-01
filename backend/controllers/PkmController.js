import PKM from '../models/PKMModel.js';

export const createPKM= async (req, res) => {
    try {
        const pkm = await PKM.create(req.body);
        res.status(201).json({ msg: "PKM Created", data: pkm });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam menginput data PKM.' });
    }
}

export const showAllPKM = async (req, res) => {
    const { id_dosen } = req.params;
    try {
        const response = await PKM.findAll(
            {
                where: { id_dosen: id_dosen }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data PKM.' });
    }
}

export const getPKMById = async (req, res) => {
    const { id_dosen, id_pkm } = req.params;
    try {
        const response = await PKM.findOne(
            {
                where: { id_dosen: id_dosen, id_pkm: id_pkm }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data PKM.' });
    }
}

export const updatePKM = async (req, res) => {
    try {
        await PKM.update(req.body, {
            where: {
                id_pkm: req.params.id_pkm
            }
        });
        res.status(201).json({ msg: "Berhasil update PKM" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengupdate PKM" });
    }
}

export const deletePKM = async (req, res) => {
    try {
        const id = req.params.id_pkm; // Ambil ID dari parameter URL

        // Menggunakan klausa 'where' untuk menghapus PKM dengan ID yang sesuai
        const data = await PKM.destroy({
            where: {
                id_pkm: id
            }
        });

        if (data === 1) {
            // Data berhasil dihapus (data === 1 menunjukkan satu baris dihapus)
            res.status(200).json({ msg: "PKM berhasil dihapus" });
        } else {
            // Data tidak ditemukan
            res.status(404).json({ msg: "PKM tidak ditemukan" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus PKM" });
    }
};