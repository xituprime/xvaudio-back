import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      tls: true,
      tlsAllowInvalidCertificates: false
    });

    console.log("🚀 MongoDB Atlas conectado correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
