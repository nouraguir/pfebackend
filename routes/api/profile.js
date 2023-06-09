const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const Profile = require('../../models/Profile')
//@Route GET api/profile/me
// @desc Get current user profile
// @ access Private

router.get('/me', auth, async(req, res)=>{
  try{
    const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile){
      return res.status(400).json({ msg: 'there is no profile for this user'});
    }
    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})