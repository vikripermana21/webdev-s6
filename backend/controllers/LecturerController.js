import Lecturer from '../models/LecturerModel.js';

export const getLecturer = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    res.json(lecturer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveLecturer = async (req, res) => {
  const lecturer = new Lecturer(req.body);
  try {
    const insertedLecturer = await lecturer.save();
    res.status(201).json(insertedLecturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLecturer = async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updatedLecturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLecturer = async (req, res) => {
  try {
    const deletedLecturer = await Lecturer.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedLecturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};