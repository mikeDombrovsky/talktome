import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

const Register = () => {
  const { handleLogin } = useAuth();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = inputs;
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, password };
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parsedResp = await response.json();
      handleLogin(parsedResp.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success d-block">Submit</button>
      </form>
    </>
  );
};
export default Register;
