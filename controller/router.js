const HomeStayRouting = require('./handler/homeStayRouting');
const handler={
    "":HomeStayRouting.showHome,
    "homestay/edit":HomeStayRouting.showEdit,
    "homestay/create":HomeStayRouting.showCreate,
    "homestay/delete":HomeStayRouting.showDeleteHomeStay
}
module.exports=handler;