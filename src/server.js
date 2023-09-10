import express from "express";
const app = express();

const PORT = 4000;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("ALLOWED");
  next();
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", (req, res) => {
  return res.send("HELLO");
});

app.get("/login", (req, res) => {
  return res.send("Login Page");
});

app.get("/protected", (req, res) => {
  return res.send("Welcome to the private rounge");
});

app.listen(PORT, () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`)
);
