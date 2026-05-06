import User from "../models/users/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/passwordHash.js"
import dotenv from "dotenv";
dotenv.config();

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // check if email exists
        const userexists = await User.findOne({ email })

        if (userexists) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const userDetails = savedUser.toObject();
        delete userDetails.password;

        res.status(201).json({
            message: "User registered successfully",
            user: userDetails,
        });

    } catch (error) {
        console.log(`Signup error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // check password validity with hashed password
        const passwordValid = await verifyPassword(password, userExists.password)

        if (!passwordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: userExists._id, email: userExists.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        const userDetails = userExists.toObject()
        delete userDetails.password;

        res.status(200).json({
            message: 'Login Succssful',
            token,
            user: userDetails
        })


    } catch (error) {
        console.error(`Login error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}




