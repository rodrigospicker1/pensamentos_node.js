const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res){
        console.log(req.session.userid)
        var userid = req.session.userid
        res.render('toughts/home', {userid})
    }

    static dashboard(req, res){
        res.render('toughts/dashboard')
    }

    static createTought(req, res){
        res.render('toughts/create')
    }
}