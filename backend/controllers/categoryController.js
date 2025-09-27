import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  const created = await category.save();
  res.status(201).json(created);
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
