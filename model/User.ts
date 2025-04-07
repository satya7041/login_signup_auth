import mongoose, { model, Schema } from "mongoose";
import { IUser } from "@/interface/IUser";

const UserSchema = new Schema<IUser>({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.models.User || model<IUser>('User',UserSchema);
export default User;