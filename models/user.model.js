import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        enum: ['user', 'tech_support', 'admin'],
        default: 'user',
    }
})

export default mongoose.model('user', userSchema)