import database from '../repository/connectionDB.js';

async function insertUser(email, password, userName) {
    const conn = await database.connect();
    const sql = 'INSERT INTO tbl_usuarios(email, senha, usuario) VALUES(?, ?, ?)';
    const newUserData = [email, password, userName];
    conn.query(sql, newUserData);
    conn.end();
}

async function updateUser(email, password, userName, id_login) {
    const conn = await database.connect();
    const sql = `UPDATE tbl_usuarios
                   SET  email   = ?,
                        senha   = ?,
                        usuario = ?
                        WHERE   id_login = ?`;
    const altUserData = [email, password, userName, id_login];
    conn.query(sql, altUserData);
    conn.end();
}

async function selectUsers() {
    const conn = await database.connect();
    const sql = `SELECT * FROM tbl_usuarios`;
    conn.query(sql);
    conn.end();
}

async function selectUser(email) {
    const conn = await database.connect();
    const sql = `SELECT * FROM tbl_usuarios WHERE email = ?`;
    const selectUser = [email];
    conn.query(sql, selectUser);
    conn.end();
}

async function deleteUser(id_login) {
    const conn = await database.connect();
    const sql = `UPDATE tbl_usuarios 
                   SET usuario_deletado = 1
                   WHERE id_login = ?`;
    const disableUser = [id_login];
    conn.query(sql, disableUser);
    conn.end();
}


export default {insertUser, updateUser, selectUsers, selectUser, deleteUser};