import db from "../config/database.js";
import { DataTypes } from 'sequelize';

const Research = db.define('research', {
    id_research: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    research_title: {
        type: DataTypes.STRING,
    },
    publication_date: {
        type: DataTypes.DATE,
    },
    doi_link: {
        type: DataTypes.STRING,
    },
    id_dosen: { // Define the foreign key field
        type: DataTypes.INTEGER,
        references: {
            model: 'profile_dosen', // Reference the DataDiri model
            key: 'id_dosen', // Reference the id_person field in DataDiri
        },
    },
}, {
    tableName: 'research',
    timestamps: false,
    freezeTableName: true
});

export default Research;

(async () => {
    await db.sync();
})();