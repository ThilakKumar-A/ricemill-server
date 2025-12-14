import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Update order
router.put('/:id', updateOrder);

// Delete an order
router.delete('/:id', deleteOrder);

export default router;
