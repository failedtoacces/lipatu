const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const productsFilePath = path.join(__dirname, 'products.json');
const categoriesFilePath = path.join(__dirname, 'categories.json');

const readProducts = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const readCategories = () => {
    const data = fs.readFileSync(categoriesFilePath);
    return JSON.parse(data);
};

const writeCategories = (categories) => {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.get('/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

app.post('/products', upload.single('imageFile'), (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: req.body.name,
        description: req.body.description,
        sizes: req.body.sizes.split(',').map(size => size.trim()),
        colors: req.body.colors.split(',').map(color => color.trim()),
        price: parseFloat(req.body.price), // Tambahkan harga produk
        image: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
        category: req.body.category
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

app.put('/products/:id', upload.single('imageFile'), (req, res) => {
    const products = readProducts();
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            name: req.body.name,
            description: req.body.description,
            sizes: req.body.sizes.split(',').map(size => size.trim()),
            colors: req.body.colors.split(',').map(color => color.trim()),
            price: parseFloat(req.body.price), // Tambahkan harga produk
            image: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || products[productIndex].image,
            category: req.body.category
        };
        products[productIndex] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/products/:id', (req, res) => {
    const products = readProducts();
    const id = parseInt(req.params.id);
    const newProducts = products.filter(product => product.id !== id);
    writeProducts(newProducts);
    res.status(204).end();
});

app.get('/categories', (req, res) => {
    const categories = readCategories();
    res.json(categories);
});

app.post('/categories', (req, res) => {
    const categories = readCategories();
    const newCategory = {
        id: categories.length ? categories[categories.length - 1].id + 1 : 1,
        name: req.body.name
    };
    categories.push(newCategory);
    writeCategories(categories);
    res.status(201).json(newCategory);
});

app.put('/categories/:id', (req, res) => {
    const categories = readCategories();
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(category => category.id === id);
    if (categoryIndex !== -1) {
        const updatedCategory = {
            ...categories[categoryIndex],
            name: req.body.name
        };
        categories[categoryIndex] = updatedCategory;
        writeCategories(categories);
        res.json(updatedCategory);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

app.delete('/categories/:id', (req, res) => {
    const categories = readCategories();
    const id = parseInt(req.params.id);
    const newCategories = categories.filter(category => category.id !== id);
    writeCategories(newCategories);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
