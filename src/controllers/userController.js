import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {name, email, user, password} = req.body;

        const exist = await User.findOne({ $or: [ { email }, { user } ] });

        if (exist) {
            return res.status(400).json({ message: "Email or username already in use" });
        };
        const hash =  await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, user, password: hash });

        res.json({ message: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { user, password } = req.body;

        const found = await User.findOne({user});

        if (!found) {
            return  res.status(400).json({ message: "Invalid username or password" });
        }
        
        const match = await bcrypt.compare(password, found.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({
            id: found._id,
            admin: found.admin,
            user: found.user
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        
    );

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};