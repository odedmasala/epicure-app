import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { ErrorHandler } from "./exceptions";
import { apiRouter } from "./routes";
dotenv.config();
import "./config/config";
import "./process";
const app = express();


app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    exposedHeaders: ['Authorization']
  })
);
app.use(
  session({
    secret: "epicure",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// API routes
app.use("/api", apiRouter);

// API handle Error in the server
app.use(ErrorHandler.handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
