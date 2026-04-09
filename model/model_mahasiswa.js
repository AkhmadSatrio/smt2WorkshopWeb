const connection = require('../config/database');

class model_mahasiswa {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mahasiswa ORDER BY id_mahasiswa DESC', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO mahasiswa SET ?', Data, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE mahasiswa SET ? WHERE id_mahasiswa = ?', [Data, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = model_mahasiswa;
