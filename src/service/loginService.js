import database from '../repository/connectionDB.js';

async function login(userEmail, password) {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuarios WHERE email = ? AND senha = ? AND usuario_deletado = 0';
    const dataLogin = [userEmail, password];
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();
    return rows;
}

async function changePassword(newPassword, userEmail) {
    const conn = await database.connect();
    const sql = 'UPDATE tbl_usuarios set senha = ? where email = ? AND usuario_deletado = 0';
    const dataNewPass = [newPassword, userEmail];
    await conn.query(sql, dataNewPass);
}

export default {login, changePassword};