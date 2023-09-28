import db from "../config/database.js";
import { DataTypes } from 'sequelize';

const EduHistory = db.define('education_history', {
    id_education_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    institution: {
        type: DataTypes.STRING,
    },
    degree: {
        type: DataTypes.STRING,
    },
    graduation_date: {
        type: DataTypes.DATE,
    },
    id_dosen: { // Define the foreign key field
        type: DataTypes.INTEGER,
        references: {
            model: 'profile_dosen', // Reference the DataDiri model
            key: 'id_dosen', // Reference the id_person field in DataDiri
        },
    },
}, {
    tableName: 'education_history',
    timestamps: false,
    freezeTableName: true
});

export default EduHistory;

(async () => {
    await db.sync();
})();