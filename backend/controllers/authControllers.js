"user strict"
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModels');
const UserHelper = require('../helpers/userHelper');
const AdminModel = require('../models/adminModels');
exports.login = async(req, res, next) => {
    try {
        let err = validationResult(req);
        if (!err.isEmpty()) {
            error = new Error();
            error.statusCode = 400;
            error.status = false;
            error.data = err.array();
            throw error;
        }
        let db = req.db;
        let email = req.body.email;
        let role = req.body.role;
        let password = req.body.password;
        user = await UserModel.getUserByEmail({ 'email': email }, db)
        if (!user.length == 0) {
            let isEqual = await UserHelper.comparePass(password, user[0].password)
            if (!isEqual) {
                res.status(401).json({ "msg": "entered wrong email or pasworrd!", "status": false });
            } else {
                let token = await UserHelper.genToken({ "email": email, "role": user[0].role, "name": user[0].username });
                res.status(200).json({
                    "token": token,
                    "status": true
                })
            }
        } else {
            res.status(302).json({ "msg": "User Not exists", "status": false });
        }
    } catch (e) {
        res.status(500).json({
            "msg": "Error Occured !",
            "error": e.stack,
            "status": false
        });
        next(e)

    }
}

exports.adminLogin = async(req, res, next) => {
    try {
        let err = validationResult(req);
        if (!err.isEmpty()) {
            error = new Error();
            error.statusCode = 400;
            error.status = false;
            error.data = err.array();
            throw error;
        }
        let db = req.db;
        let email = req.body.email;
        let password = req.body.password;
        user = await AdminModel.getAdminByEmail({ "email": email }, db);
        if (!user.length == 0) {
            let isEqual = await UserHelper.comparePass(password, user[0].password)
            if (!isEqual) {
                res.status(401).json({ "msg": "entered wrong email or pasworrd!", "status": false });
            } else {
                let token = await UserHelper.genToken({ "email": email, "role": user[0].role, "name": user[0].username });
                res.status(200).json({
                    "token": token,
                    "status": true,
                    "role": user[0].role,
                    "_id": user[0]._id
                })
            }
        } else {
            res.status(302).json({ "msg": "User Not exists", "status": false });
        }
    } catch (e) {
        res.status(500).json({
            "msg": "Error Occured !",
            "error": e.stack,
            "status": false
        });
        next(e)

    }
}