import mongoose from "mongoose";

const bookUserSchema =  mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        userName: {
            type: String,
            required: false,
        },
        genre: {
            type: String,
            required: false,
        
        }
    },
    {
        timestamps : true
    }
);

export const UserBook = mongoose.model('Book',bookUserSchema);