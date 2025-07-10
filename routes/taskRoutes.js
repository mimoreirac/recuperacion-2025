import express from "express";
import {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
  taskSummary,
  priorityTasks,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTasks);
router.put("/:id", updateTasks);
router.delete("/:id", deleteTasks);
router.get("/summary", taskSummary);
router.get("/priority/:level", priorityTasks);

export default router;
