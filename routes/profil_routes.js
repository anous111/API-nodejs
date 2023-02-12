const express=require("express")
const route=express.Router()
const db=require('../models')

//create Profil
route.post('/createprofil',(req,res,next)=>{
    db.Profil.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        Age:req.body.Age,
        UserId:req.body.UserId,


    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//retrive one profil
route.get('/profil/:id',(req,res,next)=>{
    db.Profil.findOne({where:{id:req.params.id},include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

//retrive ALL profil
route.get('/profils',(req,res,next)=>{
    db.Profil.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//UPDATE profil
route.patch('/profil/:id',(req,res,next)=>{
    db.Profil.update({
        name:req.body.name,
        description:req.body.description,
        UserId:req.body.UserId,

    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//DELETE Project
route.delete('/profil/:id',(req,res,next)=>{
    db.Profil.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

module.exports= route