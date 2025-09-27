import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) res.json(order);
  else res.status(404).json({ message: "Order not found" });
};

export const createOrder = async (req, res) => {
  const order = new Order({ ...req.body, user: req.user._id });
  const created = await order.save();
  res.status(201).json(created);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status || order.status;
  const updated = await order.save();
  res.json(updated);
};
