const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res){
        console.log(req.session.userid)
        var userid = req.session.userid
        res.render('toughts/home', {userid})
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard')
    }

    static async createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){

        const tought = {
            title: req.body.title,
            UserId: req.session.userid,
        }

        var userid = req.session.userid

        try{

            await Tought.create(tought)

            req.flash('success', 'Pensamento compartilhado')
                res.redirect('/toughts/home', {userid})

        }catch(error){
            console.log('Aconteceu um erro: '+ error)
        }
    }
}