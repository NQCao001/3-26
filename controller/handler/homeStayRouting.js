const qs = require('qs');
const fs = require('fs');
const HomeStayService = require('C:\\Users\\NQCao\\WebstormProjects\\Demo_KT_31\\10\\service\\homeStayService.js')
const CityService = require('C:\\Users\\NQCao\\WebstormProjects\\Demo_KT_31\\10\\service\\CityService.js')

class HomeStayRouting {
    static getHtmlHomeStay(listHomeStay, indexHtml) {
        let tbody = '';
        listHomeStay.map((homeStay, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${homeStay.namehomestay}</td>
            <td>${homeStay.name}</td>
            <td>${homeStay.price}</td>
            <td><a href="homestay/edit/${homeStay.id}">Edit</a> </td>
            <td><a href="homestay/delete/${homeStay.id}">Delete</a> </td>

        </tr>`
        })
        indexHtml = indexHtml.replace('listHomeStay', tbody)
        return indexHtml
    }

    static showHome(req, res) {
        fs.readFile('./views/index.html', "utf8", async (err, dataHtml) => {
            if (err) {
                console.log(err)
            } else {
                let homeStay = await HomeStayService.getHomeStay()
                dataHtml = HomeStayRouting.getHtmlHomeStay(homeStay, dataHtml)
                res.writeHead(200, 'text/html');
                res.write(dataHtml)
                res.end();
            }
        })
    }

    static showEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/homeStayRouting/edit.html', "utf8", async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let cities = await CityService.getCity();
                    let optionHtml = ''
                    for (let i = 0; i < cities.length; i++) {
                        optionHtml += `<option value="${cities[i].id}">${cities[i].name}</option>`
                    }
                    let homeStay = await HomeStayService.findById(id);
                    editHtml = editHtml.replace('{name}', homeStay[0].name);
                    editHtml = editHtml.replace('{bedroom}', homeStay[0].quantity_bedroom);
                    editHtml = editHtml.replace('{wc}', homeStay[0].quantity_wc);
                    editHtml = editHtml.replace('{price}', homeStay[0].price);
                    editHtml = editHtml.replace('{description}', homeStay[0].description);
                    editHtml = editHtml.replace('{cities}', optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml)
                    res.end();
                }
            })
        } else {
            {
                let homeStayChunk = '';
                req.on('data', chunk => {
                    homeStayChunk += chunk
                    console.log(homeStayChunk)
                });
                req.on('end', async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let homeStay = qs.parse(homeStayChunk);
                        await HomeStayService.editHomeStay(homeStay, id);
                        res.writeHead(301, {'location': '/'});
                        res.end();
                    }
                });
            }
        }
    }

    static showCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/homeStayRouting/create.html', "utf8", async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let cities = await CityService.getCity();
                    let optionHtml = ''
                    for (let i = 0; i < cities.length; i++) {
                        optionHtml += `<option value="${cities[i].id}">${cities[i].name}</option>`
                    }
                    editHtml = editHtml.replace('{cities}', optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml)
                    res.end();
                }
            })
        } else {
            {
                let homeStayChunk = '';
                req.on('data', chunk => {
                    homeStayChunk += chunk
                    console.log(homeStayChunk)
                });
                req.on('end', async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let homeStay = qs.parse(homeStayChunk);
                        await HomeStayService.createHomeStay(homeStay);
                        res.writeHead(301, {'location': '/'});
                        res.end();
                    }
                });
            }
        }
    }

    static showDeleteHomeStay(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/homeStayRouting/delete.html', "utf-8",  (err, deleteHtml) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(deleteHtml);
                res.end();
            });
        } else {
            HomeStayService.delete(id).then(r => {
                res.writeHead(301, {'location': '/'});
                res.end();
            });

        }
    }
}

module.exports = HomeStayRouting;