const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Voter = require("../model/votelist");

const router = express.Router();

router.post("/voterlist", async (req, res) => {
    try {
        const {
            user_id,
            candidate_name,
            date
        } = req.body;
     //   const visitedVoter = await Voter.findOne({ user_id });
        const visitedVoter = await Voter.findOne({ "user_id":user_id,"date":{"gte": date }});
        if (visitedVoter) {
            return res.status(409).send({"success": false , "message": "Voting already completed,further Request denied"});
        }else{
            const vote = await Voter.create({
                user_id,
                candidate_name,
                date
            }) ;
            return res.status(201).json({"voter": vote, "success": true , "message": "Voted successfully"});

        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;