const Joi = require('joi')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),

})

exports.registre=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
        let validation=schema.validate({username,email,password})
        if(validation.error){
            reject(validation.error.details[0].message)
        }

        db.User.count({ where: { email: email } }).then(doc => {
            if (doc!=0) {
                reject("this email already exist")
            }else {
                bcrypt.hash(password, 10).then(hashedPassword => {
                    db.User.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
    
                    }).then((response) => resolve(response))
                      .catch((err) => reject(err))
                })
            }
        })
    })
}


const privateKey="this is private key dgvgdvgdvfcfcedcdsx!:!!o,elklee:!;:;,;; e;e;e;e"
exports.login=(username,password)=>{
    return new Promise((resolve,reject)=>{
        db.User.findOne({where:{username:username}}).then(user=>{
            if(!user){
                reject("invalid password and username")
            }else{
                bcrypt.compare(password,user.password).then(same=>{
                    if(same){
                        var token = jwt.sign({ id: user.id,username:user.username  }, privateKey, { expiresIn: '1h' })
                        // console.log(token)
                        resolve(token)
                    }else{
                        reject("invalid password and username")
                    }
                })
            }
        })
    })
}