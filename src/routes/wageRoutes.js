import express from 'express';
import {
  createWage,
  getWages,
  updateWage,
  deleteWage,
} from '../controllers/wageController.js';

const router = express.Router();

// Create a new wage record
router.post('/', createWage);

// Get all wage records
router.get('/', getWages);

// Update wage record
router.put('/:id', updateWage);

// Delete a wage record
router.delete('/:id', deleteWage);

export default router;
