import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:root@localhost:27017/";

const connect = async () => {
	const connectionState = mongoose.connection.readyState;
	if (connectionState === 1) {
		console.log("Database is already connected");
		return;
	}else if (connectionState === 2) {
		console.log("Database is connecting");
		return;
	}

	try{
		await mongoose.connect(MONGODB_URI, {
			dbName: "tokens",
			bufferCommands: false,
		});
		console.log("Database connected");
	}catch(err){
		console.error("Database connection failed", err);
		throw err;
	}
}

export default connect;
