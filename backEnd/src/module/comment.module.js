import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
           required: true,
        },
        content: {
            type: String,
             required: true,
             maxLength: 280,
        },
        likes: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",
            },
        ],

    },
    {timestamps: true}
);

const comment = mongoose.model("comment",commentSchema);

export default comment;