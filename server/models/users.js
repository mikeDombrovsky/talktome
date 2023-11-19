import { db } from "../config/db";

export const _register = (user) => {
  const { role, first_name, last_name, email, password, phone } = user;

  return db("users").insert(
    {
      role,
      first_name,
      last_name,
      email,
      password,
      phone,
    },
    ["user_id", "first_name", "last_name"]
  );
};

export const _login = (email) => {
  return db("users")
  .select("user_id", "role", "email", "password")
  .where({email});
};


