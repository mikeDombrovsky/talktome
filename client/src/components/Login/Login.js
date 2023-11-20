import { useAuth } from "../../hooks/AuthProvider";
import { useState } from "react";
import { NotAuth } from "../NotAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, handleLogin } = useAuth();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parsedResp = await response.json();
      setInputs({
        email: "",
        password: "",
      });
      handleLogin(parsedResp.token);
      navigate('/pofile')
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button className="btn btn-success d-block">Submit</button>
      </form>
    </>
  );
};
export default Login;
