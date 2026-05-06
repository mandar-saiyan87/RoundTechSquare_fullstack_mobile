import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let { DB_URI } = process.env

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(DB_URI)
        if (connect) {
            console.log('Database Connected')
        }
    } catch (error) {
        console.error('Error connecting to database:', error)
        process.exit(1)
    }
}

export default connectDB