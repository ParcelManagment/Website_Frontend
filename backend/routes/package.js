const express = require('express');
const router = express.Router();
const Package = require("../models/package");
const validateNewPackage = require('../util/validation/package/input');
const findParticipant = require("../util/validation/participant/findParticipant");
const isStaff = require('../util/auth/staffAuth');



router.post('/new',isStaff, validateNewPackage, findParticipant, async (req, res, next) => {

  const t = req.transaction;
  try {
    
    const packageData= req.body.package;
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const emp_id = req.staff_id;
       
    const newPackage = await Package.create({
        tag_id: packageData.tag_id,
        type: packageData.type,
        package_condition: packageData.package_condition,
        destination: packageData.destination,
        price: packageData.price,
        tracking_device_id: packageData.tracking_device_id,
        sender_id: sender.sender_id, 
        sender_type: sender.sender_type,
        receiver_id: receiver.receiver_id,
        receiver_type: receiver.receiver_type,
        submitted_by:emp_id
    }, {transaction: t});

    t.commit()
    res.status(201).send("Package Inserted")
    console.log('Inserted Package:');////////////////////////////

  } catch (error) {
    console.error('Error inserting newParcel',error);/////////////////
    t.rollback()
    res.status(500).json({Error: "Something went wrong"})
    return


    // error can be accured due to foreign key constraint violation of data (duplicate tag_id)
  }
})


module.exports = router;