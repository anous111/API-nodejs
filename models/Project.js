const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize,DataTypes)=>{
    const Project=Sequelize.define("Project",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        }

    });

    Project.associate=models=>{
        Project.belongsTo(models.User,{
            onDelete:"cascade"
        })
        
    }
    return Project
}