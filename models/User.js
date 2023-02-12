const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize,DataTypes)=>{
    const User=Sequelize.define("User",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }

    });

    User.associate=models=>{
        User.hasMany(models.Project,{
            onDelete:"cascade"
        })
        User.hasOne(models.Profil,{
            onDelete:"cascade"
        })
    }
    return User
}