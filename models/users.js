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
    .select("user_id", "first_name", "email", "password", "phone")
    .where({ email });
};

export const _getInfo = (user_id) => {
  return db("users")
  .select()
  .where({user_id});
}
