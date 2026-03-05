let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ppp'
});

    connection.connect(function(error){
        if (!!error){
            console.log(error);
        } else {
            console.log('Connection to Database Success');
        }
    })

    module.exports = connection;
