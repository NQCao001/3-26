const Connection = require('../model/connection');
Connection.connecting();
class CityService{
    static getCity(){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from city`, (err, cities) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cities)
                }
            })
        })
    }
}
module.exports=CityService;