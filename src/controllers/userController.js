import User from "../models/User";
//global
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const login = (req, res) => res.send("login");

//user
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delte User");
export const see = (req, res) => res.send("See user");
export const logout = (req, res) => res.send("log out");
