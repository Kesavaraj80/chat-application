import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'



// Function Import
import generateToken from '../config/generateToken.js'

const registerUser = asyncHandler(async (req, res) =>{
    const {name,email,password,pic} =  req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter All Details");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User Allready Exists");
    }

    const newUser = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(newUser){
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pic: newUser.pic,
          token: generateToken(newUser._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }
});

export const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
});

// /api/user?search=piyush
export const allUsers = asyncHandler(async(req, res)=>{
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
}); 

export default registerUser;
