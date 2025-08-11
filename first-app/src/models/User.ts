import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    messages: Message[];
    createdAt: Date;
    verifyCode: string;
    verifyCodeExpires: Date;
    isVerified: boolean,
    isAcceptingMessages: boolean;
}
const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: [MessageSchema],
    createdAt: { type: Date, default: Date.now },
    verifyCode: { type: String, required: true },
    verifyCodeExpires: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessages: { type: Boolean, default: true }
});

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema));


export default UserModel;