import mongoose from 'mongoose'; 


const connectDB = async(MONGO_URL)=>{
    try {
        const conn = await mongoose.connect(MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // useFindAndModify: true,
        });
        console.log(`Connected to MongoDb:${conn.connection.host}`)
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

export default connectDB;