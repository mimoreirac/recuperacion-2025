import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(4000, () => {
  console.log("Escuchando en el puerto 4000.");
});

export default app;
