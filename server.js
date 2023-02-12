const express=require("express")
const app=express()
const db=require('./models')
const userRoutes=require('./routes/user_routes')
const projectRoutes=require('./routes/project_routes')
const profilRoutes=require('./routes/profil_routes')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })
app.use('/',userRoutes)
app.use('/',projectRoutes)
app.use('/',profilRoutes)

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>console.log("server listen in port 3000"))
})