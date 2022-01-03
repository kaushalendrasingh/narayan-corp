"use strict";
const { validationResult } = require("express-validator");
const userModel = require("../models/userModels");
const moment = require("moment");
exports.sales = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const medicine = await userModel.getMedicinesForSales(db);
    if (medicine.length > 0) {
      res.status(200).json({
        data: medicine,
        status: true,
      });
    } else {
      res.status(200).json({
        msg: "All medicine Expired",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.getMedicines = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const medicine = await userModel.getMedicines(db);
    if (medicine.length > 0) {
      res.status(200).json({
        data: medicine,
        status: true,
      });
    } else {
      res.status(500).json({
        msg: "Internal Server Error",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.getMedicinesById = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const medicine = await userModel.getMedicineById(req.db, id);
    if (medicine) {
      res.status(200).json({
        data: medicine,
      });
    } else {
      res.status(500).json({
        msg: "Internal Server Error",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const invoice = await userModel.getInvoiceById(req.db, id);
    if (invoice) {
      res.status(200).json({
        data: invoice,
        status: true,
      });
    } else {
      res.status(500).json({
        msg: "Internal Server Error",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.invoices = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const invoices = await userModel.getInvoices(req.db);
    if (invoices.length > 0) {
      res.status(200).json({
        data: invoices,
        status: true,
      });
    } else {
      res.status(500).json({
        msg: "Internal Server Error",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.madeSale = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let updateMedicineStock = "";
    const medicines = req.body.medicines;
    for (let i = 0; i < medicines.length; i++) {
      const getMedicine = await userModel.getMedicineById(
        req.db,
        medicines[i]._id
      );
      const totalStock =
        parseInt(getMedicine.medicineInStip) * parseInt(getMedicine.totalStip);
      let updatedStock = totalStock - parseInt(medicines[i].quantity);
      updatedStock = updatedStock / parseInt(getMedicine.medicineInStip);
      updateMedicineStock = await userModel.updateStock(
        req.db,
        updatedStock,
        getMedicine._id
      );
    }
    const invoiceData = req.body;
    invoiceData.date = new Date();
    const invoice = await userModel.createInvoice(req.db, invoiceData);
    if (invoice.result.ok && updateMedicineStock.result.ok) {
      res.status(200).json({
        msg: "Sale Made Sucessfully",
        status: true,
      });
    } else {
      res.status(500).json({
        msg: "Internal server Error!!!",
        status: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.addMedicines = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let db = req.db;
    let medicineName = req.body.medicineName;
    let medicine = await userModel.getMedicineByName(medicineName, db);
    const med = {
      medicineName: req.body.medicineName,
      medicineCompany: req.body.medicineCompany,
      totalStip: parseInt(req.body.totalStip),
      medicineInStip: parseInt(req.body.medicineInStip),
      mrp: parseFloat(req.body.mrp),
      sellingPrice: parseFloat(req.body.sellingPrice),
      type: req.body.type,
    };
    if (!medicine) {
      let medicineID = await userModel.createMedicine(med, db);
      if (medicineID.result.ok) {
        res
          .status(200)
          .json({ msg: "Medicine added sucessfully", status: true });
      } else {
        res.status(500).json({ msg: "Internal Server Error", status: false });
      }
    } else {
      res.status(302).json({ msg: "Medicine aleady exists", status: false });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.updateMedicines = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let db = req.db;
    const med = {
      medicineName: req.body.medicineName,
      medicineCompany: req.body.medicineCompany,
      totalStip: parseInt(req.body.totalStip),
      medicineInStip: parseInt(req.body.medicineInStip),
      mrp: parseFloat(req.body.mrp),
      sellingPrice: parseFloat(req.body.sellingPrice),
      type: req.body.type,
      _id: req.body._id,
    };
    let medicineID = await userModel.updateMedicine(med, db);
    if (medicineID.result.ok) {
      res
        .status(200)
        .json({ msg: "Medicine updated sucessfully", status: true });
    } else {
      res.status(500).json({ msg: "Internal Server Error", status: false });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.addRequirement = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    let added = "";
    const reqQuantity = parseInt(req.body.quantity);
    const requirement = await userModel.getRequirementByName(db, req.body.name);
    if (requirement) {
      const req = parseInt(requirement.quantity) + reqQuantity;
      added = await userModel.updateRequirement(db, req);
    } else {
      const data = {
        name: req.body.name,
        quantity: reqQuantity,
      };
      added = await userModel.addRequirement(db, data);
    }
    if (added) {
      res.status(200).json({
        msg: "Requirement Added Sucessfully",
        status: true,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.deleteRequirement = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const agentCount = await userModel.deleteRequirement(db);

    if (agentCount) {
      res.status(200).json({
        msg: "Requirement deleted Sucessfully",
        status: true,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.getRequirement = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const data = await userModel.getRequirement(db);

    if (data) {
      res.status(200).json({
        msg: "Requirement Generated succesfully",
        data: data,
        status: true,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};
