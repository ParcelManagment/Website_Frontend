const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {connectDb,getConnection, endConnection} = require('../database/database.js')

router.post('/signup', async (req, res, next) => {
   
  // database connection
  const connection = getConnection();
  if(!connection){
    console.log("Database connection unavailable")
    res.status(500).json({Error: "Database Error"})
    return;
  }

  // extracting the submitted data
  const data = req.body;
  const employee_id = data.employee_id;
  const first_name = data.first_name;
  const last_name = data.last_name;
  //const name = data.name;
  const password = data.password;


  if(!employee_id || !first_name || !last_name || !password){
    res.status(500).json({Error: "Please submit all the required field"})
    return;
  }
   


  // checking the user email is already registered
  try{
    const newEmployee = await registered(employee_id, connection);
     
  }catch(err){
    res.status(500).json({Error: err, message: 'Registration Failed'})
    return;
  }
   
  // validate the user inputs
  const validationError = validate(employee_id, first_name,last_name, password);
  if(validationError){
    res.status(500).json({Error: validationError})
    return;
  }
   
  try{
    const hash = await hashPassword(password)
    console.log("hash -- ",hash) // developing

    // SAVE DATA IN DATABSE
    const result = await savaUserCredientials(employee_id, first_name, last_name, hash, connection)
    const token = jwt.sign({first_name: first_name, employee_id: employee_id },process.env.JWT_SECRET, {expiresIn:'1h'});
    console.log('jwt -- ', token) // developing
    res.cookie('token',token,{httpOnly: true}) // set cookie
    res.status(201).json({Error: null, message: 'Registration Successful', userId: result.employee_id, 
    })

  }catch(err){
    try{
    console.log("registration error occured", err); // developing
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
  if (!connection) {
    console.log("Database connection unavailable");
    res.status(500).json({ Error: "Database Error" });
    return;
  }

  const data = req.body;
  const employee_id = data.employee_id;
  const password = data.password;

  // check empty fields
  if (!employee_id || !password) {
    res.status(400).json({ Error: "Empty Fields. Please Try Again" });
    return;
  }

  try {
    const user = await findUser(employee_id, connection);
    if (!user) {
      res.status(401).json({ Error: "User not found" });
      return;
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      res.status(401).json({ Error: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ employee_id: user.employee_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ Error: null, message: "Login Successful" });

  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});




// validation of the user inputs
function validate(employee_id, first_name, last_name, password){

  if(typeof first_name !== 'string'){
    return 'Invalid Username'
  }

  if (first_name.length < 3 || first_name.length > 20) {
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
  if(!(/^\d{5}$/.test(employee_id))){
    return "invalid employee number"
  }

}


// validatae whether already registered or not using the employee_id. 
async function registered(employee_id, connection){
  
  return new Promise((resolve, reject) =>{
    const query = 'SELECT * FROM station_staff WHERE employee_id = ?';
    connection.query(query, [employee_id], (err, result) =>{
      if(err){
        reject("Server Error")
        return
      } 
      if(result.length>0){
        reject("You Are Already Registered")
        return
      }
      resolve("not registered");
      })
    }) 
};

async function hashPassword(password){
  const saltRound = 10;
  const hash = await bcrypt.hash(password,saltRound);
  return hash;
}

// save user details in the database
 function savaUserCredientials(employee_id,first_name, last_name, hashPassword, connection){
   
  const query = 'INSERT INTO station_staff (employee_id,first_name,last_name, password) VALUES (?,?,?,?)';
  return new Promise((resolve, reject)=>{
  connection.query(query, [employee_id, first_name, last_name, hashPassword], (err, result) =>{
    if(err){
      reject(err);
    }else{
      resolve(result)
    }
  })
  
   
  });

   
}


async function findUser(employee_id, connection){
  return new Promise((resolve, reject) =>{
    const query = 'SELECT * FROM station_staff WHERE employee_id = ?';
    connection.query(query, [employee_id], (err, result) =>{
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