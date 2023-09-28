import db from "../config/database.js";
import { DataTypes } from 'sequelize';
import ProfileDosen from "./ProfileModel.js";

const UserAcc = db.define('user_account', {
    // Definisikan kolom dalam model yang sesuai dengan kolom di tabel "admins"
    id_user_account: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nip: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Dosen'),
        allowNull: false,
        defaultValue: 'Dosen',
    },
}, {
    // Nama tabel yang sesuai dengan nama tabel di database
    tableName: 'user_account',
    timestamps: false,
    freezeTableName:true
});

UserAcc.hasOne(ProfileDosen, {
    foreignKey: 'id_user_account', 
    onDelete: 'CASCADE', 
});

export default UserAcc;

(async () => {
    await db.sync();
})();