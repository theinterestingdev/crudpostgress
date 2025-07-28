const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController.js");

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Working..." });
});

router.get("/viewemp", employeeController.getEmployeesController);
router.post("/addemp", employeeController.addEmployeesController);
router.patch("/updateemp/:empid", employeeController.updateEmployeesController);
router.delete("/deleteemp/:empid", employeeController.deleteEmployeesController);

module.exports = router;
