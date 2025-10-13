const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const multer = require('multer');
const path = require("path");

const router = express.Router();

// 📁 Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier local
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });
// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  upload.single("image"), // 👈 accepte un fichier image
  async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
      // const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
      const imagePath = req.file ? `/${req.file.filename}` : "";

      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        image: imagePath,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Update product (admin only)
// router.put('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).populate('category');
    
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
    
//     res.json(product);
//   } catch (error) {
//     console.error('Update product error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  upload.single("image"), // ✅ accepte une nouvelle image
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.stock = req.body.stock || product.stock;

      if (req.file) {
        product.image = `/${req.file.filename}`; // ✅ remplace l’image
      }

      const updated = await product.save();
      res.json(updated);
    } catch (error) {
      console.error("Update product error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete product (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;