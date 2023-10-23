import db from "../config/database.js";
import { DataTypes } from "sequelize";

const PKM = db.define(
  "pkm",
  {
    id_pkm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pkm_title: {
      type: DataTypes.STRING,
    },
    pkm_year: {
      type: DataTypes.DATE,
    },
    partner_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    pdf_pkm: {
      type: DataTypes.TEXT,
    },
    id_dosen: {
      // Define the foreign key field
      type: DataTypes.INTEGER,
      references: {
        model: "profile_dosen", // Reference the DataDiri model
        key: "id_dosen", // Reference the id_person field in DataDiri
      },
    },
  },
  {
    tableName: "pkm",
    timestamps: false,
    freezeTableName: true,
  }
);

export default PKM;

(async () => {
  await db.sync();
})();
