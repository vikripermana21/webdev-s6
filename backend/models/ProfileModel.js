import db from "../config/database.js";
import { DataTypes } from 'sequelize';
import EduHistory from './EduHistoryModel.js';
import TeachHistory from './TeachHistoryModel.js';
import Research from './ResearchModel.js';
import PKM from './PKMModel.js';

const ProfileDosen = db.define('profile_dosen', {
    id_dosen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    profile_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    place_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
        allowNull: false,
        defaultValue: 'Laki-Laki',
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_user_account: { // Define the foreign key field
        type: DataTypes.INTEGER,
        references: {
            model: 'user_account', // Reference the DataDiri model
            key: 'id_user_account', // Reference the id_person field in DataDiri
        },
    },
    major:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    position:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    study_program:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'profile_dosen',
    timestamps: false,
    freezeTableName:true
});

ProfileDosen.hasMany(EduHistory, {
    foreignKey: 'id_dosen', 
    onDelete: 'CASCADE',
});

ProfileDosen.hasMany(TeachHistory, {
    foreignKey: 'id_dosen', 
    onDelete: 'CASCADE', 
});

ProfileDosen.hasMany(Research, {
    foreignKey: 'id_dosen', 
    onDelete: 'CASCADE', 
});

ProfileDosen.hasMany(PKM, {
    foreignKey: 'id_dosen', 
    onDelete: 'CASCADE', 
});



export default ProfileDosen;

(async () => {
    await db.sync();
})();