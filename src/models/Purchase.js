import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qty: Number,
        price: Number
    }],
    total: Number,
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Purchase", purchaseSchema);