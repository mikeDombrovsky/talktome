import { db } from "../config/db.js";

export const _register = (user) => {
  const { first_name, email, password, phone } = user;

  return db("users").insert(
    {
      first_name,
      email,
      password,
      phone,
    },
    ["user_id", "first_name", "phone"]
  );
};

export const _login = (email) => {
  return db("users")
    .select("user_id", "email", "password",'phone')
    .where({ email });
};
