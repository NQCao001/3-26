const Connection = require('../model/connection');
Connection.connecting();

class HomeStayService {
    static getHomeStay() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select homestay.id, homestay.name as namehomestay, c.name, homestay.price, homestay.idCity
                              from homestay
                                       join city c on c.id = homestay.idCity;`, (err, homeStay) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(homeStay)
                }
            })
        })

    }

    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from homestay
                              where id = ${id}`, (err, homestay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestay);
                }
            });
        })
    }

    static editHomeStay(homeStay, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            console.log(homeStay)
            connection.query(`update homestay
                              set name            = '${homeStay.name}',
                                  quantity_bedroom='${homeStay.bedroom}',
                                  idCity=${+homeStay.idCity},
                                  price           = ${homeStay.price},
                                  quantity_wc='${homeStay.wc}',
                                  description     = '${homeStay.description}'
                              where id = ${id}`, (err, homeStay) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Edit Success !!!');
                    resolve(homeStay);
                }
            });
        })
    }

    static createHomeStay(homeStay) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into homestay(name, idCity, quantity_bedroom, quantity_wc, price, description)
                              values ('${homeStay.name}','${homeStay.idCity}','${homeStay.bedroom}','${homeStay.wc}','${homeStay.price}','${homeStay.description}');
            `, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Create Success !!!');
                    resolve(homestays);
                }
            });
        })
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            Connection.getConnection().query(` delete
                                          from homestay
                                          where id = ${id};`, (err, homestay) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Delete Success !!!');
                    resolve(homestay);
                }
            });
        })
    }
}

module.exports = HomeStayService;