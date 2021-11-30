"user strict"
const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');

//requiring controller..
const userControllers = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');

router.post('/login', authController.login);
router.get('/sales', isAuth, userControllers.sales);
router.post('/made-sale', isAuth, userControllers.madeSale);
router.get('/get-medicines', isAuth, userControllers.getMedicines);
router.post('/add-medicine', isAuth, userControllers.addMedicines);
router.get('/get-medicine/:id', isAuth, userControllers.getMedicinesById);
router.post('/update-medicine', isAuth, userControllers.updateMedicines)
router.get('/invoices', isAuth, userControllers.invoices);
router.get('/get-invoice/:id', isAuth, userControllers.getInvoiceById);
router.post('/add-requirement', isAuth, userControllers.addRequirement);
router.get('/delete-requirement', isAuth, userControllers.deleteRequirement);
router.get('/get-requirement', isAuth, userControllers.getRequirement);

module.exports = router;