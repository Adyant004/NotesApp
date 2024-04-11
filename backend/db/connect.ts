import mongoose from 'mongoose';

const connectToDB = async (url: string | undefined) => {
    if(!url) {
        throw new Error("Mongo URL not provided!");
    }
    
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error: any) {
        console.log("An error has occurred", error.message);
    }
}

export default connectToDB;
