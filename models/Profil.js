const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize,DataTypes)=>{
    const Profil=Sequelize.define("Profil",{
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Age:{
            type:DataTypes.STRING,
            allowNull:false
        }

    });

    Profil.associate=models=>{
        Profil.belongsTo(models.User,{
            onDelete:"cascade"
        })
        
    }
    return Profil
}