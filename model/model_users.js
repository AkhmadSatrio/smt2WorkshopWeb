const connection = require('../config/database');

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
                resolve(result);
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
}

module.exports = model_users;
