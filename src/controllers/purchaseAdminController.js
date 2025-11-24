import Purchase from "../models/Purchase.js";
import Products from "../models/Products.js";

export const testPurchaseAdminController = (req, res) => {
    res.json({ message: "Purchase Admin controller is working!" });
};

export const getPendingPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate("userId").populate("items.productId");

        res.json(purchases);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const approvePurchase = async (req, res) => {
    try {
        const {id} = req.params;

        const purchase = await Purchase.findById(id).populate("items.productId");

        if (!purchase) {
            return res.status(404).json({message: "Purchase not found"});
        }

        if (purchase.status !== "pending") {
            return res.status(400).json({message: "Only pending purchases can be approved"});
        }

        // Restar stock de los productos
        for (const item of purchase.items) {
            const product = item.productId;

            if(product.stock < item.qty) {
                return res.status(400).json({message: `Insufficient stock for product ${product.name}`});
            }

            product.stock -= item.qty;
            await product.save();
        }

        purchase.status = "approved";
        await purchase.save();

        res.json({message: "Purchase approved successfully", purchase});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const cancelPurchase = async (req, res) => {
    try {
        const {id} = req.params;

        const purchase = await Purchase.findById(id).populate("items.productId");

        if (!purchase) {
            return res.status(404).json({message: "Purchase not found"});
        }

        if (purchase.status !== "pending") {
            return res.status(400).json({message: "Only pending purchases can be cancelled"});
        }

        purchase.status = "cancelled";
        await purchase.save();

        res.json({message: "Purchase cancelled successfully", purchase});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};