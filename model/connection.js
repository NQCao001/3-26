const mysql = require('mysql');

class Connection {
    static configToMySQL = {
        hort: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'test',
        charset: 'utf8_general_ci'
    }

    static  getConnection() {
        return mysql.createConnection(this.configToMySQL)
    }

    static connecting() {
        Connection.getConnection().connect(error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Connection Success!!!')
            }
        });
    }
}

module.exports = Connection;