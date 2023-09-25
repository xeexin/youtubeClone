import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

//global
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle: "Create Account",
      errorMessage: "PW confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Username/Email is already taken",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Username doesn't exist",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

//user
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const email = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!email) {
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
};
// export const finishGithubLogin = async (req, res) => {
//   const baseUrl = "https://github.com/login/oauth/access_token";
//   const config = {
//     client_id: process.env.GITHUB_CLIENT,
//     client_secret: process.env.GITHUB_SECRET,
//     code: req.query.code,
//   };
//   const params = new URLSearchParams(config).toString();
//   const finalUrl = `${baseUrl}?${params}`;
//   const tokenRequest = await (
//     await fetch(finalUrl, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//     })
//   ).json();
//   if ("access_token" in tokenRequest) {
//     const { access_token } = tokenRequest;
//     const apiUrl = "https://api.github.com/user";
//     const userData = await (
//       await fetch(`${apiUrl}/user`, {
//         headers: {
//           Authorization: `token ${access_token}`,
//         },
//       })
//     ).json();
//     console.log(userData);
//     const emailData = await (
//       await fetch(`${apiUrl}/user/emails`, {
//         headers: {
//           Authorization: `token ${access_token}`,
//         },
//       })
//     ).json();
//     const email = emailData.find(
//       (email) => email.primary === true && email.verified === true
//     );
//     if (!email) {
//       return res.redirect("/login");
//     }
//   } else {
//     return res.redirect("/login");
//   }
// };

export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delte User");
export const see = (req, res) => res.send("See user");
export const logout = (req, res) => res.send("log out");
