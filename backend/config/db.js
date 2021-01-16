import  mongoose from 'mongoose'

const connectDB=async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline)

    } catch (error) {
        console.error(`Error : ${error.message}`.red.underline.bold)
    }
}

export default connectDB ;