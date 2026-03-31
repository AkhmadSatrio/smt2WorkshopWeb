const connection = require('../config/database');

class model_kategori {

    static async getAll(){
        return new Promise((resolve, reject) => {
          connection.query('select * from Kategori order by id_kategori desc', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
          });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into Kategori set ?', Data, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        });
    }

     static async getId(id){
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM Kategori where id_kategori' + id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
          });
        });
    }

     static async Update(id, Data){
        return new Promise((resolve, reject) => {
          connection.query('update kategori set? where id_kategori = '+ id, Data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
          });
        });
    }

     static async Delete(id){
        return new Promise((resolve, reject) => {
          connection.query('delete from Kategori where id_kategori = ' + id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
          });
        });
    }

}

module.exports = model_kategori;