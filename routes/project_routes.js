const express=require("express")
const route=express.Router()
const db=require('../models')

//create Project
route.post('/createproject',(req,res,next)=>{
    db.Project.create({
        name:req.body.name,
        description:req.body.description,
        UserId:req.body.UserId,

    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//retrive one Project
route.get('/project/:id',(req,res,next)=>{
    db.Project.findOne({where:{id:req.params.id},include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

//retrive ALL Project
route.get('/projects',(req,res,next)=>{
    db.Project.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//UPDATE Project
route.patch('/project/:id',(req,res,next)=>{
    db.Project.update({
        name:req.body.name,
        description:req.body.description,
        UserId:req.body.UserId,

    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


//DELETE Project
route.delete('/project/:id',(req,res,next)=>{
    db.Project.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

module.exports= route