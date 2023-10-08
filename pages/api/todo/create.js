import User from "@/backEnd/models/user";
import ConnectionDB from "@/backEnd/utils/connectDB";
import { getSession } from "next-auth/react";

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

    const data = req.body;
    console.log(data);
    if (!data?.session?.user) return res.status(401).json({ success: false, status: 401, message: 'Token not defined' });



    const user = await User.findOne({ email: data.session.user.email });
    if (!user) return res.status(404).json({ success: false, status: 404, message: 'User not defined' });
    if (!data.title || !data.status) return res.status(422).json({ success: false, status: 422, message: 'Invalid data' });

    // await User.updateOne({ email: data.session.user.email }, { $push: { "user.todos": { title: data.title, status: data.status } } });
    await user.todos.push({ title: data.title, status: data.status });
    await user.save();

    return res.json({
        success: true,
        status: 200,
        message: 'Create new todo',
        data,
    });
}