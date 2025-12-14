// src/routes/stockRoutes.js
import express from 'express';
import {
  getStock,
  updateStock,
  addStockItem,
  deleteStockItem
} from '../controllers/stockController.js';

const router = express.Router();

// Get all stock items
router.get('/', getStock);

// Add new stock item (admin only)
router.post('/', addStockItem);

// Update stock quantity (admin only)
router.put('/:id', updateStock);

// Delete stock item (admin only)
router.delete('/:id', deleteStockItem);

export default router;