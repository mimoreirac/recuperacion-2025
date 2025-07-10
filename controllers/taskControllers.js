import Tasks from "../models/Task.js";

function getTasks(req, res) {
  res.status(200).json(Tasks);
}

function addTasks(req, res) {
  const { id, title, description, completed, priority } = req.body;
  const taskExists = Tasks.find((task) => task.id == id);
  if (taskExists) {
    return res.status(400).json({ message: "El id ya existe" });
  }
  if (priority < 1 || priority > 5) {
    return res
      .status(400)
      .json({ message: "La prioridad debe estar entre 1 y 5." });
  }
  const newTask = {
    id: id,
    title: title,
    description: description,
    completed: completed,
    priority: priority,
  };
  Tasks.push(newTask);
  res.status(201).json(newTask);
}

function updateTasks(req, res) {
  try {
    const id = Number(req.params.id);
    const updates = req.body;
    const taskIndex = Tasks.findIndex((task) => task.id === id);
    const updatedTask = { ...Tasks[taskIndex], ...updates };
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
  }
}

function deleteTasks(req, res) {
  const id = Number(req.params.id);
  const taskIndex = Tasks.findIndex((task) => task.id === id);
  const deletedTask = Tasks[taskIndex];
  Tasks.splice(deletedTask, 1);
  res.status(200).json({ message: "Tarea eliminada" });
}

function taskSummary(req, res) {
  const completedTasks = Tasks.filter((tarea) => tarea.completed === true);
  const prioridadTotal = Tasks.reduce((sum, tarea) => sum + tarea.priority, 0);
  const promedio = prioridadTotal / Tasks.length;
  const percentage = (completedTasks.length / Tasks.length) * 100;
  const response = {
    total: Tasks.length,
    completed: completedTasks.length,
    averagePriority: promedio,
    percentageCompleted: percentage.toFixed(2),
  };
  res.status(200).json(response);
}

function priorityTasks(req, res) {}

export {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
  taskSummary,
  priorityTasks,
};
