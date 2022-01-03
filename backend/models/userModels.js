"use strict";
const ObjectID = require("mongodb").ObjectID;

module.exports = class User {
  constructor() {}
  static async createMedicine(data, db) {
    return await db.collection("carpet_details").insertOne(data);
  }
  static async getUserByEmail(userObj, db) {
    const user = db.collection("sales_agents");
    return await user.find(userObj).toArray();
  }
  static async createNewUser(userobj, db) {
    return await db.collection("sales_agents").insertOne(userobj);
  }
  static async getMedicines(db) {
    return await db.collection("carpet_details").find({}).toArray();
  }
  static async getMedicinesForSales(db) {
    const date = new Date();
    return await db
      .collection("carpet_details")
      .find({totalStip: { $gte: 1 } })
      .toArray();
  }
  static async getMedicineByName(medicineName, db) {
    return await db
      .collection("carpet_details")
      .findOne({ medicineName: medicineName });
  }
  static async getInvoices(db) {
    return await db.collection("invoices").find({}).toArray();
  }
  static async getInvoiceById(db, invoiceId) {
    const id = new ObjectID(invoiceId);
    return await db.collection("invoices").findOne({ _id: id });
  }
  static async getMedicineById(db, medicineId) {
    const id = new ObjectID(medicineId);
    return await db.collection("carpet_details").findOne({ _id: id });
  }
  static async updateStock(db, updatedStock, _id) {
    const id = new ObjectID(_id);
    return await db.collection("carpet_details").updateOne(
      { _id: id },
      {
        $set: {
          totalStip: parseFloat(updatedStock),
        },
      }
    );
  }
  static async createInvoice(db, data) {
    return await db.collection("invoices").insertOne(data);
  }
  static async updateMedicine(medicine, db) {
    const id = new ObjectID(medicine._id);
    return await db.collection("carpet_details").updateOne(
      { _id: id },
      {
        $set: {
          medicineName: medicine.medicineName,
          sellingPrice: medicine.sellingPrice,
          mrp: medicine.mrp,
          type: medicine.type,
          medicineCompany: medicine.medicineCompany,
          medicineInStip: medicine.medicineInStip,
          totalStip: medicine.totalStip,
        },
      }
    );
  }
  static async deleteRequirement(db) {
    return await db.collection("requirements").drop();
  }
  static async getRequirement(db) {
    return await db.collection("requirements").find({}).toArray();
  }
  static async addRequirement(db, data) {
    return await db.collection("requirements").insertOne(data);
  }
  static async updateRequirement(db, data) {
    return await db
      .collection("requirements")
      .updateOne({}, { $set: { quantity: data } });
  }
  static async getRequirementByName(db, data) {
    return await db.collection("requirements").findOne({ name: data });
  }
};
