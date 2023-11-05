import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // token: true
}, {
    versionKey: false
});

userSchema.methods.hashPassword = async function (password){
    this.password = await bcrypt.hash(password, 10)
}
const User = model("user", userSchema)
export default User;