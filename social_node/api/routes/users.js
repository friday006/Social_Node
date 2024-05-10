const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// update
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });

//delete 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await   User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

// get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc // this will show details except password and updatedAt
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// follow a user
router.put("/:id/follow", async (req,res)=>{
    // Check if the requesting user is not trying to follow themselves
    if(req.body.userId !== req.params.id){
        try{
            // Find the user to be followed by their ID
            const user = await User.findById(req.params.id);
            // Find the current user (the one making the request) by their ID
            const currentUser = await User.findById(req.body.userId);
            // Check if the current user is not already following the user to be followed
            if(!user.followers.includes(req.body.userId)){
                // If not already following, update the user to be followed's followers list
                await user.updateOne({$push: {followers: req.body.userId}});
                // Update the current user's followings list
                await currentUser.updateOne({$push: {followings: req.params.id}});
                // Respond with a success message
                res.status(200).json("User has been followed");
            }
            else{
                // If already following, respond with a message indicating so
                res.status(403).json("You already followed this user");
            }
        } catch(err){
            // Handle any errors that occur during the process
            res.status(500).json(err);
        }
    } else {
        // If the requesting user is trying to follow themselves, respond with a message indicating so
        res.status(403).json("You cannot follow yourself");
    }
});

//unfollow a user
router.put("/:id/unfollow", async (req,res)=>{
    // Check if the requesting user is not trying to follow themselves
    if(req.body.userId !== req.params.id){
        try{
            // Find the user to be followed by their ID
            const user = await User.findById(req.params.id);
            // Find the current user (the one making the request) by their ID
            const currentUser = await User.findById(req.body.userId);
            // Check if the current user is not already following the user to be followed
            if(user.followers.includes(req.body.userId)){
                // If not already following, update the user to be followed's followers list
                await user.updateOne({$pull: {followers: req.body.userId}});
                // Update the current user's followings list
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                // Respond with a success message
                res.status(200).json("User has been ufollowed");
            }
            else{
                // If already following, respond with a message indicating so
                res.status(403).json("You don't follow this user");
            }
        } catch(err){
            // Handle any errors that occur during the process
            res.status(500).json(err);
        }
    } else {
        // If the requesting user is trying to follow themselves, respond with a message indicating so
        res.status(403).json("You cannot unfollow yourself");
    }
});



module.exports = router;