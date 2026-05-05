const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class model_users {

    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users ORDER BY id_users DESC', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', Data, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id_users = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Update(id, Data){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id_users = ?', [Data, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Delete(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id_users = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async registerEmail(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                connection.query(
                    'INSERT INTO users (email, password) VALUES (?, ?)', 
                    [email, hashedPassword], 
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    static async login_JWT(email, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.query(sql, [email], async (err, result) => {
                if (err) return reject({ status : 500, message : 'Error pada server', error : err});
                if (result.length === 0) {
                    return reject({ status : 401, message : 'Email tidak ditemukan' });
                }

                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return reject({ status : 401, message : 'Password Salah' });
                }

                const token = jwt.sign(
                    {
                        id: user.id_users,
                        email: user.email
                    },
                    process.env.JWT_SECRET,
                    { expiresIn : '1h' }
                );
                resolve({ token });
            });
        });
    }
}

module.exports = model_users;
