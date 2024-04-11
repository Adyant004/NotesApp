import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    heading: {
        type: String,
        default: "Untitled Note"
    },
    content: {
        type: String,
        default: "",
    }
},{timestamps: true})

export const Notes = mongoose.model("Notes",noteSchema);