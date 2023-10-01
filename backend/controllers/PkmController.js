import PKM from '../models/PKMModel.js';

export const createPKM = async (req, res) => {
    try {
        const pkm = await PKM.create(req.body);
        res.status(201).json({ msg: "PKM Created", data: pkm });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error occurred while creating PKM.' });
    }
};

export const getAllPKM = async (req, res) => {
    try {
        const pkms = await PKM.findAll();
        res.status(200).json(pkms);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error occurred while fetching PKMs.' });
    }
};

export const getPKMById = async (req, res) => {
    const { id } = req.params;
    try {
        const pkm = await PKM.findByPk(id);
        if (!pkm) {
            return res.status(404).json({ error: 'PKM not found' });
        }
        res.status(200).json(pkm);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error occurred while fetching PKM.' });
    }
};

export const updatePKM = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await PKM.update(req.body, {
            where: { id_pkm: id }
        });
        if (updated) {
            const updatedPKM = await PKM.findByPk(id);
            return res.status(200).json(updatedPKM);
        }
        return res.status(404).json({ error: 'PKM not found' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error occurred while updating PKM.' });
    }
};

export const deletePKM = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await PKM.destroy({
            where: { id_pkm: id }
        });
        if (deleted) {
            res.status(200).json({ msg: "PKM deleted successfully" });
        } else {
            res.status(404).json({ error: 'PKM not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error occurred while deleting PKM.' });
    }
};
