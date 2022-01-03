const { validationResult } = require("express-validator");
const AdminModel = require("../models/adminModels");
const UserModel = require("../models/userModels");
const UserHelper = require("../helpers/userHelper");
const moment = require("moment");

exports.addAgent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;
    const agentDOB = req.body.agentDOB;
    let userObj = {
      email: email,
    };
    let db = req.db;
    let user = await UserModel.getUserByEmail(userObj, db);
    userObj.username = username;
    userObj.role = role;
    userObj.name = name;
    userObj.agentDOB = agentDOB;
    if (user.length == 0) {
      userObj.password = await UserHelper.genHash(password);
      let userID = await UserModel.createNewUser(userObj, db);
      if (userID.result.ok) {
        res.status(200).json({ msg: "Agent added sucessfully" });
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    } else {
      res.status(302).json({ msg: "Agent aleady exists" });
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
    let medicine = await AdminModel.getMedicineByName(medicineName, db);
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
      let medicineID = await AdminModel.createMedicine(med, db);
      if (medicineID.result.ok) {
        res.status(200).json({ msg: "Item added sucessfully", status: true });
      } else {
        res.status(500).json({ msg: "Internal Server Error", status: false });
      }
    } else {
      res.status(302).json({ msg: "Item aleady exists", status: false });
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
    let medicineID = await AdminModel.updateMedicine(med, db);
    if (medicineID.result.ok) {
      res.status(200).json({ msg: "Item updated sucessfully", status: true });
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

exports.updateAgent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let db = req.db;
    let userObj = {
      name: req.body.name,
      role: req.body.role,
      agentDOB: req.body.agentDOB,
      _id: req.body._id,
    };
    userObj.password = await UserHelper.genHash(req.body.password);
    let AgentID = await AdminModel.updateAgent(userObj, db);
    if (AgentID.result.ok) {
      res.status(200).json({ msg: "Agent updated sucessfully", status: true });
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

exports.updatePassword = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let db = req.db;
    let userObj = {
      _id: req.body._id,
    };
    userObj.password = await UserHelper.genHash(req.body.password);
    let AgentID = await AdminModel.updatePassword(userObj, db);
    if (AgentID.result.ok) {
      res
        .status(200)
        .json({ msg: "Password updated sucessfully", status: true });
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
    const medicine = await AdminModel.getMedicines(db);
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
    const medicine = await AdminModel.getMedicineById(req.db, id);
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

exports.getAgents = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const agents = await AdminModel.getAgents(db);
    if (agents.length > 0) {
      res.status(200).json({
        data: agents,
        status: true,
      });
    } else {
      res.status(500).json({
        msg: "Internal Server Error",
        status: false,
      });
    }
    res.status(200).json({
      msg: "user fetch Sucessfully",
      status: true,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error Occured !",
      error: e.stack,
      status: false,
    });
    next(e);
  }
};

exports.getAgentById = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const agent = await AdminModel.getAgentById(req.db, id);
    if (agent) {
      res.status(200).json({
        data: agent,
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
    const invoice = await AdminModel.getInvoiceById(req.db, id);
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

exports.deleteMedicine = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const medicine = await AdminModel.deleteMedicine(req.db, id);
    if (medicine.result.ok) {
      res.status(200).json({
        msg: "Item deleted successfully",
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

exports.deleteAgent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const medicine = await AdminModel.deleteAgent(req.db, id);
    if (medicine.result.ok) {
      res.status(200).json({
        msg: "Item deleted successfully",
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

exports.deleteInvoice = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const id = req.params.id;
    const invoice = await AdminModel.deleteInvoice(req.db, id);
    if (invoice.result.ok) {
      res.status(200).json({
        msg: "Invoice deleted successfully",
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

exports.options = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    res.status(200).json({
      msg: "user fetch Sucessfully",
      status: true,
    });
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
    const invoices = await AdminModel.getInvocies(req.db);
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
exports.genReport = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const report = [];
    let total = 0;
    const fromDate = new Date(req.params.date);
    const date = `${req.params.date}T23:59:59.000Z`;
    const toDate = new Date(date);
    const invoices = await AdminModel.genReport(req.db, fromDate, toDate);
    for (let i = 0; i < invoices.length; i++) {
      total += invoices[i].totalPrice;
      for (let j = 0; j < invoices[i].medicines.length; j++) {
        let matchInd = "";
        matchInd = report.findIndex((el) => {
          if (el.medicineName === invoices[i].medicines[j].medicineName) {
            return el;
          }
        });
        if (matchInd !== -1) {
          report[matchInd].price += invoices[i].medicines[j].price;
          report[matchInd].quantity += invoices[i].medicines[j].quantity;
        }
        if (matchInd === -1) {
          const medObj = {
            medicineName: invoices[i].medicines[j].medicineName,
            price: invoices[i].medicines[j].price,
            quantity: invoices[i].medicines[j].quantity,
          };
          report.push(medObj);
        }
      }
    }
    if (report.length > 0) {
      res.status(200).json({
        data: report,
        total: total,
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
exports.dashboard = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    const db = req.db;
    const agentCount = await AdminModel.getAgentCount(db);
    const medicineCount = await AdminModel.getMedicineCount(db);
    const invoiceCount = await AdminModel.getinvoiceCount(db);
    const count = {
      medicine: medicineCount,
      invoice: invoiceCount,
      agent: agentCount,
    };
    if (agentCount || medicineCount || invoiceCount) {
      res.status(200).json({
        msg: "user fetch Sucessfully",
        data: count,
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
    const requirement = await AdminModel.getRequirementByName(
      db,
      req.body.name
    );
    if (requirement) {
      const req = parseInt(requirement.quantity) + reqQuantity;
      added = await AdminModel.updateRequirement(db, req);
    } else {
      const data = {
        name: req.body.name,
        quantity: reqQuantity,
      };
      added = await AdminModel.addRequirement(db, data);
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
    const agentCount = await AdminModel.deleteRequirement(db);

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
    const data = await AdminModel.getRequirement(db);

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

exports.registerUser = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      error = new Error();
      error.statusCode = 400;
      error.data = err.array();
      throw error;
    }
    let db = req.db;
    let userObj = {
      name: req.body.name,
      role: req.body.role,
      agentDOB: req.body.agentDOB,
      _id: req.body._id,
    };
    userObj.password = await UserHelper.genHash(req.body.password);
    let AgentID = await AdminModel.registrationUser(userObj, db);
    if (AgentID.result.ok) {
      res
        .status(200)
        .json({ msg: "Agent registered sucessfully", status: true });
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
