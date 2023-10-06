import User from "@/backEnd/models/user";
import { hashPassword } from "@/backEnd/utils/auth";
import ConnectionDB from "@/backEnd/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    try {
        await ConnectionDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'Error: Connecting to the database'
        });
    };

    const { email, password } = req.body;
    if (!email || !password) return res.status(422).json({ success: false, status: 422, message: 'Check your email or password' });
    const user = await User.findOne({ email });
    if (user) return res.status(422).json({ success: false, status: 422, message: 'The user exists' });
    const resutlPassword = await hashPassword(password);
    await User.create({ email, password: resutlPassword });
    return res.status(201).json({
        success: true,
        status: 201,
        message: 'User was created'
    });
}