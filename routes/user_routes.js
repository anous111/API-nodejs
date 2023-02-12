const express = require("express")
const route = express.Router()
const db = require('../models')
const userController=require('../controllers/userController')
const { response } = require("express")

//registre
route.post('/registre', (req, res, next) => {
    
    userController.registre(req.body.username,req.body.email,req.body.password)
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

//login
route.post('/login', (req, res, next) => {
   
    userController.login(req.body.username,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json(err))
})

//retrive one user
route.get('/user/:id', (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id }, include: [db.Profil, db.Project] })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})

//retrive ALL user
route.get('/alluser', (req, res, next) => {
    db.User.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})


//UPDATE user
route.patch('/user/:id', (req, res, next) => {
    db.User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})


//DELETE user
route.delete('/user/:id', (req, res, next) => {
    db.User.destroy({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})

module.exports = route