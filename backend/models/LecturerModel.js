import mongoose from "mongoose";
import profileSchema from "./profile.model";
import teachingHistorySchema from "./teaching-history.model";
import educationHistorySchema from "./education-history.model";
import researchSchema from "./research.model";
import pkmSchema from "./pkm.model";

const lecturerSchema = mongoose.Schema({
  Username: String,
  Password: String,
  Full_Name: String,
  Email: String,
  Phone_Number: String,
  Position: String,
  Major: String,
  Profile: profileSchema,
  Teaching_history: [teachingHistorySchema],
  Education_history: [educationHistorySchema],
  Research: [researchSchema],
  PKM: [pkmSchema],
});

export default mongoose.model('Lecturer', lecturerSchema);