const bcrypt = require("bcrypt");
const express = require("express");
const { user } = require("../Model/User");
const { setUser } = require("../Service/auth");
const { validate } = require("deep-email-validator");

const handleSignUp = async (req, res) => {
    async function isEmailValid(email) {
        return validate({
            email,
            sender: "noreply@yourapp.com",
            validateRegex: true,
            validateMx: true,
            validateTypo: false,
            validateDisposable: true,
            validateSMTP: false,
        });
    }

    try {

        const token = req.cookies?.uid;

        if (token) {
            res.clearCookie("uid", {
                httpOnly: true,
                secure:true,
                sameSite: "none",
            });
        }

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ error: "All fields are required" });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered", flag: 0 });
        }

        const { valid, reason } = await isEmailValid(email);
        if (!valid) {
            return res.status(400).json({
                message: "Email address is not real or unreachable",
                flag: 0
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        await user.create({
            name,
            email,
            password: hashedPassword,
        });

        const loguser1 = await user.findOne({ email });
        const token1 = setUser(loguser1);

        res.cookie("uid", token1, {
            httpOnly: true,
            secure:true, // set true in production with HTTPS
            sameSite: "none",
            maxAge: 100 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ message: "Signup successful!", flag: 1 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error", flag: 0 });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loguser = await user.findOne({ email });

        if (!loguser) {
            return res.json({ flag: 0, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, loguser.password);
        if (!isMatch) {
            return res.json({ flag: 0, message: "Invalid email or password" });
        }

        const token = setUser(loguser);

        res.cookie("uid", token, {
            httpOnly: true,
            secure: true, // set true in production with HTTPS
            sameSite: "none",
            maxAge: 100 * 24 * 60 * 60 * 1000,
        });

        return res.json({ flag: 1, message: "Logged in Successfully" });
    } catch (err) {
        console.error(err);
        return res.json({ flag: -1, message: "Something went wrong. Failed to login" });
    }
};

const handleLogOut = async (req, res) => {
    res.clearCookie("uid", {
        httpOnly: true,
        secure: true,// set true in production with HTTPS
        sameSite: "none",
    });
    return res.status(200).json({ flag: 1 });
}

const handleLogStatus = (req, res) => {
    const token = req.cookies?.uid;
    if (token) {
        res.json({ logedIn: true })
    } else {
        res.json({ logedIn: false })
    }
}

module.exports = { handleSignUp, handleLogin, handleLogOut, handleLogStatus };