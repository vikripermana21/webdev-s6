import mongoose from "mongoose";

// Skema untuk Teaching_history
const teachingHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // ID unik untuk setiap teaching history
  Institution: String,
  Position: String,
  Start_Date: Date,
  End_Date: Date,
});

// Skema untuk Education_history
const educationHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // ID unik untuk setiap education history
  Degree: String,
  institution: String,
  Graduation_Date: Date,
});

// Skema untuk Research
const researchSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // ID unik untuk setiap research
  Title: String,
  Publication_Date: Date,
  Research_Publication: String,
});

// Skema untuk PKM
const pkmSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // ID unik untuk setiap PKM
  PKM_Tittle: String,
  Year: Date,
  Description: String,
});

// Skema untuk Profile
const profileSchema = mongoose.Schema({
  Date_of_birth: Date,
  gender: String,
  Bio: String,
  Profile_Picture: String,
});

// Skema utama untuk Lecturer
const lecturerSchema = mongoose.Schema({
    Username : String,
    Password : String,
    Full_Name: String,
    Email: String,
    Phone_Number: String,
    Position: String,
    Major: String,
    Profile: profileSchema,
    Teaching_history: [teachingHistorySchema], // Array dari teaching history
    Education_history: [educationHistorySchema], // Array dari education history
    Research: [researchSchema], // Array dari research
    PKM: [pkmSchema], // Array dari PKM
});

export default mongoose.model('Lecturer', lecturerSchema);