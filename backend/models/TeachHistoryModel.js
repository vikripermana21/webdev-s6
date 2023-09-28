import db from "../config/database.js";
import { DataTypes } from 'sequelize';

const TeachHistory = db.define('teaching_history', {
    id_teaching_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    institution: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
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
    tableName: 'teaching_history',
    timestamps: false,
    freezeTableName: true
});

export default TeachHistory;

(async () => {
    await db.sync();
})();