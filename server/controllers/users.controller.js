import { _register, _login } from "../models/users";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

const secretKey = process.env.SECRET;

export const register = async (req, res)  => {

const {role, first_name, last_name, email, password, phone } = req.body;

try{
    const hashedPassword = bcrypt.hashSync(password, 10);
    const row = await _register({
        role,
        first_name,
        last_name,
        last_name,
        email,
        password: hashedPassword,
        phone
    });
    const token = jwt.sign({ id: newUser.id, username }, secretKey, { expiresIn: "1h",});

  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({ msg: "user registered", token });

}catch(err){
    console.log(err);
    res.status(404).json({ msg: "email already exist" });
}
  

}

export const login = async (req, res) ={
    
}