const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const accountRouter = require("./routers/routes/account");
const todosRouter = require("./routers/routes/todos");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/account", accountRouter);
app.use("/todos", todosRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On Port ${PORT}`);
});
