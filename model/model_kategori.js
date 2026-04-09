const connection = require('../config/database');

class model_kategori {

    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Kategori ORDER BY id_kategori DESC', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Kategori SET ?', Data, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Kategori WHERE id_kategori = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Update(id, Data){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Kategori SET ? WHERE id_kategori = ?', [Data, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async Delete(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Kategori WHERE id_kategori = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = model_kategori;
