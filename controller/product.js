const uuid = require("uuid");
const { read_file, write_file } = require("../fs/file_system");

const getAllProducts = async (req, res) => {
  try {
    const products = read_file("products.json");
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = read_file("products.json");
    const foundedProduct = products.find((pro) => pro.id === id);
    if (!foundedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, price, quantity } = req.body;
    const products = read_file("products.json");
    products.push({ id: uuid.v4(), title, price, quantity });
    write_file("products.json", products);
    res.status(201).json({ message: "Added new product" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, quantity } = req.body;
    const products = read_file("products.json");
    const foundedProduct = products.find((pro) => pro.id === id);
    if (!foundedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    products.forEach((product) => {
      if (product.id === id) {
        product.title = title ? title : product.title;
        product.price = price ? price : product.price;
        product.quantity = quantity ? quantity : product.quantity;
      }
    });
    write_file("products.json", products);
    res.status(200).json({ message: "Updated product" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = read_file("products.json");
    const foundedProduct = products.find((pro) => pro.id === id);
    if (!foundedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const filteredProducts = products.filter((pro) => pro.id !== id);
    write_file("products.json", filteredProducts);
    res.status(200).json({ message: "Deleted product" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPhones = (req, res) => {
  const phones = [
    { name: "Samsung S10", xotira: "128GB", narx: "$300" },
    { name: "Samsung S21 Ultra", xotira: "256GB", narx: "$700" },
    { name: "Samsung S26 Ultra", xotira: "512GB", narx: "$1200" },
  ];
  res.status(200).json(phones);
};

const getCars = (req, res) => {
  const cars = [
    { name: "Mercedes G63 AMG", yil: 2024, narx: "$180,000" },
    { name: "Mercedes S-Class S580", yil: 2023, narx: "$120,000" },
    { name: "Mercedes EQS 580", yil: 2024, narx: "$105,000" },
  ];
  res.status(200).json(cars);
};

const getAllData = (req, res) => {
  const phones = [
    { name: "Samsung S10", xotira: "128GB", narx: "$300" },
    { name: "Samsung S21 Ultra", xotira: "256GB", narx: "$700" },
    { name: "Samsung S26 Ultra", xotira: "512GB", narx: "$1200" },
  ];
  const cars = [
    { name: "Mercedes G63 AMG", yil: 2024, narx: "$180,000" },
    { name: "Mercedes S-Class S580", yil: 2023, narx: "$120,000" },
    { name: "Mercedes EQS 580", yil: 2024, narx: "$105,000" },
  ];
  res.status(200).json({ phones, cars });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProducts,
  updateProduct,
  getPhones,
  getCars,
  getAllData,
};
