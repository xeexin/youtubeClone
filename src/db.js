import { error } from "console";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ");
const handelError = (error) => console.log("🚨 DB ERROR", error);

db.on("error", handelError);
db.once("open", handleOpen);
