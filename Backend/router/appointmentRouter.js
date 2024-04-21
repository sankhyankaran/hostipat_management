import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointments,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();
router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getAll", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointments);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
