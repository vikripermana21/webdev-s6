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

// Additional CRUD operations for array documents

export const getTeachingHistoryById = async (req, res) => {
    try {
      const lecturer = await Lecturer.findById(req.params.lecturerId);
      if (!lecturer) {
        return res.status(404).send("Lecturer not found");
      }
      const teachingHistory = lecturer.Teaching_history.id(req.params.historyId);
      if (!teachingHistory) {
        return res.status(404).send("Teaching history not found");
      }
      res.send(teachingHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//   export const saveTeachingHistory = async (req, res) => {
//     try {
//       const lecturer = await Lecturer.findById(req.params.lecturerId);
//       if (!lecturer) {
//         return res.status(404).send("Lecturer not found");
//       }
//       lecturer.Teaching_history.push(req.body);
//       await lecturer.save();
//       res.status(201).json(lecturer.Teaching_history[lecturer.Teaching_history.length - 1]);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

// Menggunakan async/await untuk menangani permintaan POST teaching-history
export const saveTeachingHistory = async (req, res) => {
    try {
      const lecturerId = req.params.lecturerId;
      const lecturer = await Lecturer.findById(lecturerId);
      
      if (!lecturer) {
        return res.status(404).send("Lecturer not found");
      }
  
      // Buat objek teachingHistory tanpa _id, MongoDB akan menghasilkan ID unik secara otomatis
      const teachingHistory = {
        Institution: req.body.Institution,
        Position: req.body.Position,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date
      };
  
      // Tambahkan teachingHistory ke array Teaching_history di dosen
      lecturer.Teaching_history.push(teachingHistory);
  
      // Simpan perubahan ke dalam dokumen dosen
      await lecturer.save();
  
      // Kirimkan data teachingHistory yang telah disimpan sebagai respons
      res.status(201).json(lecturer.Teaching_history[lecturer.Teaching_history.length - 1]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  export const updateTeachingHistory = async (req, res) => {
    try {
      const lecturer = await Lecturer.findById(req.params.lecturerId);
      if (!lecturer) {
        return res.status(404).send("Lecturer not found");
      }
      const teachingHistory = lecturer.Teaching_history.id(req.params.historyId);
      if (!teachingHistory) {
        return res.status(404).send("Teaching history not found");
      }
      Object.assign(teachingHistory, req.body);
      await lecturer.save();
      res.json(teachingHistory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteTeachingHistory = async (req, res) => {
    try {
      const lecturer = await Lecturer.findById(req.params.lecturerId);
      if (!lecturer) {
        return res.status(404).send("Lecturer not found");
      }
      const teachingHistory = lecturer.Teaching_history.id(req.params.historyId);
      if (!teachingHistory) {
        return res.status(404).send("Teaching history not found");
      }
      teachingHistory.remove();
      await lecturer.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Similar CRUD operations can be added for Education_history, Research, and PKM arrays