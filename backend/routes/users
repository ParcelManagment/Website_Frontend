const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {connectDb,getConnection, endConnection} = require('../database/database.js')


router.post('/signup', async (req, res, next) => {
    
    const connection = getConnection();
    if(!connection){
        console.log("Database connection unavailable")
        res.status(500).json({Error: "Database Error"})
        return;
    }

    const data = req.body;
    const username = data.username;
    const password = data.password;
    const email = data.email;

    const emptyFields = checkEmpty(email, username, password);

    if(emptyFields){
        res.status(500).json({Error: emptyFields})
        return
    }

    try{
        const validEmail = await validateEmail(email, connection);
        console.log(validEmail)

    }catch(err){
        res.status(500).json({Error: err, message: 'Registration Failed'})
        return
    }


    const validationError = validate(email, username, password);
    if(validationError){
        res.status(500).json({Error: validationError})
        return;
    }
    
    try{
        const hash = await hashPassword(password)
        console.log("hash -- ",hash)  // developing

        const result = await savaUserCredientials(email, username, hash, connection)
        const token = jwt.sign({username: username},'jnldskgj435092946w7t698143y$!@%#$$^EWT$%', {expiresIn:'1h'});
        console.log('jwt -- ', token)  // developing
        res.cookie('token',token,{httpOnly: true})
        res.status(201).json({Error: null, message: 'Registration Successful', userId: result.insertId, 
        })
        
    }catch(err){
        try{
        console.log("registration error occured", err);  // developing
        res.status(500).json({Error: "Registration Failed"})
        }catch(error){
            console.log('error occured while responding to the client')
        }

    }finally{
       // endConnection()
    }
});


function checkEmpty(email, username, password){
    if(!email){
        return "Please Enter Your Email."
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(email);
    if(!valid){
        return "invalid Email"
    }
    if(!username){
        return "Please Enter Your Username."
    }

    if(!password){
        return "Please Enter a Password."
    }
}

function validate(email, username, password){
    
    if(typeof username !== 'string'){
        return 'Invalid Username'
    }

    if (username.length < 3 || username.length > 20) {
        return "invalid username, too short"
      }

    if(username.length <2){
        return "invalid username"
    }
    if(typeof password !== 'string'){
        return 'Invalid Password'
    }
    if(password.length<6){
        return "Password should have minimum 6 characters"
    }
    const containsUppercase = /[A-Z]/.test(password);
    const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if(!containsUppercase || !containsSymbol){
        return "Oops! Make sure your password has at least one uppercase letter and one special character."
    }
}

async function validateEmail(email, connection){
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM user WHERE email = ?';
        connection.query(query, [email], (err, result) =>{
            if(err){
                reject("Server Error")
                return
            } 
            if(result.length>0){
                reject("user Already Registered")
                return
            }
            resolve("valid Email")
            })
        }) 
};

async function hashPassword(password){
    const saltRound = 10;
    const hash = await bcrypt.hash(password,saltRound);
    return hash;
}

 function savaUserCredientials(email,username, hashPassword, connection){
    
    const query = 'INSERT INTO user (email, username, password) VALUES (?,?,?)';
    return new Promise((resolve, reject)=>{
    connection.query(query, [email, username, hashPassword], (err, result) =>{
        if(err){
            reject(err);
        }else{
            resolve(result)
        }
    })
   
    
    });

    
}

module.exports = router;