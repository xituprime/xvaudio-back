import Purchase from "../models/Purchase.js";
import Products from "../models/Products.js";

export const testPurchaseController = (req, res) => {
    res.json({ message: "Purchase controller is working!" });
};

export const createPurchase = async (req, res) => {
    try {
        const userId = req.user.id;
        const {items} = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({message: "No items provided for purchase"});
        }

        let total = 0;

        const processedItems = await Promise.all(
            items.map(async (item) => {
                const product = await Products.findById(item.productId);

                if (!product) throw new Error(`Product with ID ${item.productId} not found`);

                const priceAtMoment = product.price;
                total += priceAtMoment * item.qty;

                return{
                    productId: item.productId,
                    qty: item.qty,
                    price: priceAtMoment
                };
            })
        );

        const purchase = new Purchase({
            userId,
            items: processedItems,
            total,
            status: "pending"
        });

        res.status(201).json({
            message: "Purchase created successfully",
            purchase
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
};

export const getMyPurchases = async (req, res) => {
    try {
        const userId = req.user.id;

        const purchases = await Purchase.find({userId}).populate("items.productId");

        res.json(purchases);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};