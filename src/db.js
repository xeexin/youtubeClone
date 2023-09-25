import { error } from "console";
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ");
const handelError = (error) => console.log("🚨 DB ERROR", error);

db.on("error", handelError);
db.once("open", handleOpen);
