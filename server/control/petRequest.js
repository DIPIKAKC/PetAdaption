const {RegisterCustomer,RegisterShelter, RegisterAdmin, Pet} = require("../schema/registerSchema") //imported schema
const Request = require("../schema/requestPet")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const nodemailer = require("nodemailer")
const { Feedback } = require('../schema/registerSchema')

const showPetRequest = async (req, res) => {
    try {
        const shelterId = req.params.id; // Adjust the parameter name if needed
        // console.log(shelterId);
        
        // Fetching requests for a specific shelterId
        const showPet = await Request.find({shelterId}).populate("userId").populate("petId").populate("shelterId");

        if(!showPet){
            return res.status(404).json({success:false, message:"Pet not found!!"})
        }
        
        // Sending the filtered requests in the response
        res.status(200).json({ success: true, showPet });
    } catch (error) {
        console.log(error);
        // Sending error response if any error occurs
        res.status(500).json({ error: 'Internal server error' });
    }
}
const acceptPetReq = async(req, res) =>{
    try {
        const reqId = req.params.id;
        const {petId} = req.body
        console.log(reqId, petId)
        const acceptReq = await Request.findByIdAndUpdate({_id:reqId},{
            status:"Accepted"
        })
        const updatePet = await Pet.findByIdAndUpdate({_id:petId},{
            status:"booked"
        })
        if(!acceptReq && !updatePet){
            return res.status(400).json({success:false, message:"Unable to accept the request!!"})
        }
        return res.status(200).json({success:true, message:"Successfully accepted." , acceptReq})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:"Error accepting request :", error})
    }
}


const rejectPetReq = async(req, res) =>{
    try {
        const reqId = req.params.id;
        // console.log(reqId)
        const acceptReq = await Request.findByIdAndDelete({_id:reqId})
        if(!acceptReq){
            return res.status(400).json({success:false, message:"Unable to reject the request!!"})
        }
        return res.status(200).json({success:true, message:"Successfully rejected." })
        
    } catch (error) {
        res.status(400).json({success:false, message:"error while rejecting :", error})
    }
}




module.exports = {
    showPetRequest,
    acceptPetReq,
    rejectPetReq
}