import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, default: '' },
    name: { type: String, default: '' },
    todos: { type: [], default: [] }
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;