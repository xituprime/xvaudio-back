import Product from "../models/Products.js";

export const testProductController = (req, res) => {
    res.json({ message: "Product controller is working!" });
};

//Crear producto
export const createProduct = async (req, res) => {
    try {
        const { name, description, stock, cost, price, category, brand } = req.body;

        // Validacion de campos
        if (!name || !description || !stock || !cost || !price || !category || !brand) {
            return res.status(400).json({message: "Todos los campos son requeridos"});
        }

        const images = req.files ? req.files.map(f => f.filename) : [];

        const newProduct = new Product({
            name,
            description,
            stock,
            cost,
            price,
            category,
            brand,
            images
        });

        await newProduct.save();
        res.json({ message: "Producto creado correctamente", product: newProduct});

    } catch (error){
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
};

// Listar Productos
export const getProducts = async (req, res) => {
    const products = await Product.find().sort({createdAt: -1}); // Ordenar por fecha de creacion descendente
    res.json(products);
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
};

// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const images = req.files ? req.files.map(f => f.filename) : [];

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, $push: { images: { $each: images } } },
            { new: true }
        );

        res.json({ message: "Producto actualizado correctamente", product });
        
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
};