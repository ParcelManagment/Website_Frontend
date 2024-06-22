const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

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
    const mobileNum = data.mobileNum

    const emptyFields = checkEmptySignUp(email, username, password, mobileNum);
    
    if(emptyFields){
        res.status(500).json({Error: emptyFields})
        return;
    }

    // checking the user email is already registered
    try{
        const validEmail = await validateEmail(email, connection);
        console.log(validEmail)
    }catch(err){
        res.status(500).json({Error: err, message: 'Registration Failed'})
        return;
    }
    
    // validate the user inputs
    const validationError = validate(email, username, password, mobileNum);
    if(validationError){
        res.status(500).json({Error: validationError})
        return;
    }
    
    try{
        const hash = await hashPassword(password)
        console.log("hash -- ",hash)  // developing

        // SAVE DATA IN DATABSE
        const result = await savaUserCredientials(email, username, hash, mobileNum, connection)
        const token = jwt.sign({username:  username, email: email, role: "user"},process.env.JWT_SECRET, {expiresIn:'1h'});
        console.log('jwt -- ', token)  // developing
        res.cookie('token',token,{httpOnly: true}) // set cookie
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

router.post('/login', async (req, res, next) => {

  
    const connection = getConnection();
    if(!connection){
        console.log("Database connection unavailable")
        res.status(500).json({Error: "Database Error"})
        return;
    }

    const data = req.body;
    const email = data.email;
    const password = data.password;

    // check empty fields
    const invalid = checkEmptyLogin(email, password);
    if(invalid){
        res.status(400).json({Error: "Empty Fields. Please Try Agian", invalid})
        return;
    }

    try{
        const user = await findUser(email, connection);
        const validPassword = await verifyPassword(password, user.password);
        
        if(!validPassword){
            res.status(401).json({Error: "invalid Password"});
            return;        
        }

        console.log("valid") //developing
        const token = jwt.sign({username: user.username, email: user.email, role: user.role},process.env.JWT_SECRET, {expiresIn:'1h'});
        console.log('jwt -- ', token)  // developing
        res.cookie('token',token,{httpOnly: true})
        res.status(200).json({Error: null, massage: "login Successful"})
        
    }catch(err){
        res.status(500).json({Error: err})
        console.log(err)
    }




})


// check the user inputs availability
function checkEmptySignUp(email, username, password, mobileNum){
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
    if(!mobileNum){
        return "Please Enter Your mobile Number."
    }

}

function checkEmptyLogin(email, password){
    if(!email){
        return "Empty Email"
    }
    if(!password){
        return "Empty Password."
    }
    return null;
}

// validation of the user inputs
function validate(email, username, password, mobileNum){

    if(typeof username !== 'string'){
        return 'Invalid Username'
    }

    if (username.length < 3 || username.length > 20) {
        return "invalid username, too short or too long"
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

    const validnum = validateSriLankanPhoneNumber(mobileNum);
    if(!validnum){
        return "Please enter valid Phone number"
    }
}

// validatae whether already registered or not using the email. 
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

// save user details in the database
 function savaUserCredientials(email,username, hashPassword, mobileNum, connection){
    
    const query = 'INSERT INTO user (email, username, password, mobile_number) VALUES (?,?,?,?)';
    return new Promise((resolve, reject)=>{
    connection.query(query, [email, username, hashPassword, mobileNum], (err, result) =>{
        if(err){
            reject(err);
        }else{
            resolve(result)
        }
    })
   
    
    });

    
}

// validate the user input mobile number
function validateSriLankanPhoneNumber(phoneNumber) {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'LK');
    return phoneNumberObj && phoneNumberObj.isValid();
}

async function findUser(email, connection){
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM user WHERE email = ?';
        connection.query(query, [email], (err, result) =>{
            if(err){
                reject("Something Went Wrong")
                return;
            } 
            if(result.length == 0){
                reject("Not Registered")
                return;
            }
            resolve(result[0]);
            })
        }) 
};

async function verifyPassword(password, hashPassword){
    return await bcrypt.compare(password, hashPassword);
}

module.exports = router;