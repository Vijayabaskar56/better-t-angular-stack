import mongoose, { type ObjectId } from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

const connection = mongoose.connection.useDb(process.env.DATABASE_NAME)
const objectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format')
    }
    return new mongoose.Types.ObjectId(id)
}
export { connection, connectDB, objectId }
