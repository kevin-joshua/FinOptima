import User from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const {name, email, password, role, company} = req.body;
  
  try{
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message: "User already exists"});

    const newUser = await User.create({name, email, password, role, company});
    await newUser.save();

    res.status(201).json({message: "User created successfully", user: newUser});
  }catch(err){
    console.error(err);
    res.status(500).json({error: "Registraton failed"});
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await generateToken(user._id);
    res.json({ message: "Login successfull", token : token});
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing' }); // Handle missing ID
}
  try {
   
    const user = await User.findById(userId);
  
    const {name, password, company} = req.body;
    if(!user) return res.status(404).json({ message: 'User not found' });
    if(name) user.name = name;
    if(password) user.password = password;
    if(company) user.company = company;

    

    
    const updatedUser = await user.save();
    res.status(200).json({message: "user updated successfully", user: updatedUser})
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Couldn't update user details"})
  }

  

}

export const getUserProfile = async (req, res) => {

  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
 
}

