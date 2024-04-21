import express from "express";
import patientRegister, {
  addNewAdmin,
  addNewDoctor,
  getAllDoctor,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/new", addNewAdmin);
router.get("/doctors", getAllDoctor);
router.get("/admin/detail", isAdminAuthenticated, getUserDetails);
router.get("/patient/detail", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

export default router;
