const ObjectID = require("mongodb").ObjectID;

module.exports = class Admin {
  constructor() {}

  static async getAdminByEmail(userObj, db) {
    return await db.collection("admin_user").find(userObj).toArray();
  }
  static async getMedicineById(db, medicineId) {
    const id = new ObjectID(medicineId);
    return await db.collection("carpet_details").findOne({ _id: id });
  }

  static async getAgentById(db, agentId) {
    const id = new ObjectID(agentId);
    return await db.collection("sales_agents").findOne({ _id: id });
  }

  static async getInvoiceById(db, invoiceId) {
    const id = new ObjectID(invoiceId);
    return await db.collection("invoices").findOne({ _id: id });
  }

  static async getAgentByUsername(db, username) {
    return await db.collection("sales_agents").findOne({ username: username });
  }

  static async getMedicineByName(medicineName, db) {
    return await db
      .collection("carpet_details")
      .findOne({ medicineName: medicineName });
  }

  static async createMedicine(data, db) {
    return await db.collection("carpet_details").insertOne(data);
  }
  static async getMedicines(db) {
    return await db.collection("carpet_details").find({}).toArray();
  }
  static async getInvocies(db) {
    return await db.collection("invoices").find({}).toArray();
  }
  static async getAgents(db) {
    return await db.collection("sales_agents").find({}).toArray();
  }
  static async getAgentCount(db) {
    return await db.collection("sales_agents").count();
  }
  static async getMedicineCount(db) {
    return await db.collection("carpet_details").count();
  }
  static async getinvoiceCount(db) {
    return await db.collection("invoices").count();
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
  static async updateAgent(agent, db) {
    const id = new ObjectID(agent._id);
    return await db.collection("sales_agents").updateOne(
      { _id: id },
      {
        $set: {
          name: agent.name,
          role: agent.role,
          password: agent.password,
          agentDOB: agent.agentDOB,
        },
      }
    );
  }
  static async updatePassword(agent, db) {
    const id = new ObjectID(agent._id);
    return await db.collection("admin_user").updateOne(
      { _id: id },
      {
        $set: {
          password: agent.password,
        },
      }
    );
  }

  static async deleteMedicine(db, medicine) {
    const id = new ObjectID(medicine);
    return await db.collection("carpet_details").deleteOne({ _id: id });
  }
  static async deleteAgent(db, agent) {
    const id = new ObjectID(agent);
    return await db.collection("sales_agents").deleteOne({ _id: id });
  }
  static async deleteInvoice(db, invoice) {
    const id = new ObjectID(invoice);
    return await db.collection("invoices").deleteOne({ _id: id });
  }
  static async genReport(db, fromDate, toDate) {
    return await db
      .collection("invoices")
      .find({ date: { $gte: fromDate, $lte: toDate } })
      .toArray();
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

  static async registrationUser(data, db) {
    return await db.collection("admin_user").insertOne(data);
  }
};
