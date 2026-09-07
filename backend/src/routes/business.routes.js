import { Router } from 'express';
import { body } from 'express-validator';
import {
  runAssessment,
  getHistory,
  getAssessmentById
} from '../controllers/business.controller.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/businesses/assess
// optionalAuth: logged-in users get results saved to DB, guests get results without saving
router.post('/assess', optionalAuth, [
  body('business_type').notEmpty().withMessage('Business type is required'),
  body('investment_amount').isNumeric().withMessage('Investment amount must be a number'),
  body('loan_amount').isNumeric().withMessage('Loan amount must be a number'),
  body('monthly_income').isNumeric().withMessage('Monthly income must be a number'),
  body('household_expenses').isNumeric().withMessage('Household expenses must be a number'),
  body('population').isNumeric().withMessage('Village population must be a number'),
  body('existing_shops_count').isNumeric().withMessage('Existing shops count must be a number')
], runAssessment);

// GET /api/businesses/history  (auth required)
router.get('/history', requireAuth, getHistory);

// GET /api/businesses/:id  (auth required)
router.get('/:id', requireAuth, getAssessmentById);

export default router;
