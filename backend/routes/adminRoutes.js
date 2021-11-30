const express = require("express");
const Router = express.Router();

//loading controller..
const adminControllers = require("../controllers/adminControllers");
const authController = require("../controllers/authControllers");
const isAuth = require("../middlewares/auth");

Router.post("/login", authController.adminLogin);
Router.post("/registration", adminControllers.registerUser);
Router.get("/dashboard", isAuth, adminControllers.dashboard);

Router.get("/get-agents", isAuth, adminControllers.getAgents);
Router.get("/get-medicines", isAuth, adminControllers.getMedicines);

Router.get("/get-medicine/:id", isAuth, adminControllers.getMedicinesById);
Router.get("/get-agent/:id", isAuth, adminControllers.getAgentById);
Router.get("/get-invoice/:id", isAuth, adminControllers.getInvoiceById);
Router.get("/report/:date", isAuth, adminControllers.genReport);

Router.post("/add-medicine", isAuth, adminControllers.addMedicines);
Router.post("/add-agent", isAuth, adminControllers.addAgent);

Router.post("/update-medicine", isAuth, adminControllers.updateMedicines);
Router.post("/update-agent", isAuth, adminControllers.updateAgent);
Router.post("/change-password", isAuth, adminControllers.updatePassword);

Router.delete("/medicine/:id", isAuth, adminControllers.deleteMedicine);
Router.delete("/agent/:id", isAuth, adminControllers.deleteAgent);
Router.delete("/invoice/:id", isAuth, adminControllers.deleteInvoice);

Router.post("/options", isAuth, adminControllers.options);
Router.get("/invoices", isAuth, adminControllers.invoices);

Router.post("/add-requirement", isAuth, adminControllers.addRequirement);
Router.get("/delete-requirement", isAuth, adminControllers.deleteRequirement);
Router.get("/get-requirement", isAuth, adminControllers.getRequirement);

module.exports = Router;
