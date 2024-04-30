const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const requireAuth = require('../middleware/requireAuth'); 

const router = require('express').Router();


router.post('/add-income', requireAuth, addIncome);
router.get('/get-incomes', requireAuth, getIncomes);
router.delete('/delete-income/:id', requireAuth, deleteIncome);

router.post('/add-expense', requireAuth, addExpense);
router.get('/get-expenses', requireAuth, getExpense);
router.delete('/delete-expense/:id', requireAuth, deleteExpense);

module.exports = router;