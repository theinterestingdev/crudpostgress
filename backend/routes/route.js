import { Router } from "express";
import employeeController from "../controller/employeeController.js";




const router = Router()


router.get("/viewemp",employeeController.getEmployeesController)
router.post("/addemp",employeeController.addEmployeesController)
router.patch("/updateemp/:empid",employeeController.updateEmployeesController)
router.delete("/deleteemp/:empid",employeeController.deleteEmployeesController)


export default router
