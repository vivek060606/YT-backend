import mongoose, {schema} from "mongoose"


const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Type.ObjectId,
        ref:"user"
    }
},{timestamps: true})


export const Subscription = mongoose.model("subscription", subscriptionSchema)