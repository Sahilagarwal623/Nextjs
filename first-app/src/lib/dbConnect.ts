import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connnection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connnection.isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI as string || "", {})

        connnection.isConnected = db.connections[0].readyState;
        console.log("New database connection established");
    } catch (error) {
        console.log("Error connecting to the database:", error);
        process.exit(1);
    }
}

export default dbConnect;