import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

const Register = () => {
  const { handleLogin } = useAuth();

  const [inputs, setInputs] = useState({
    role: "",
    first_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { role, first_name, email, password, phone } = inputs;
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { role, first_name, email, password, phone };
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parsedResp = await response.json();
      setInputs({
        role: "",
        first_name: "",
        email: "",
        password: "",
        phone: "",
      });
      handleLogin(parsedResp.token);
      window.location.replace("/profile");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="role"
            id="exampleRadios1"
            value="talktome"
            checked
          />
          <label class="form-check-label" for="exampleRadios1">
            I need to talk
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="role"
            id="exampleRadios2"
            value="ihearyou"
          />
          <label class="form-check-label" for="exampleRadios2">
            I want to listen
          </label>
        </div>
        <input
          type="text"
          name="first_name"
          placeholder="first name"
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="phone"
          placeholder="099-999-99-99"
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />

        <button className="btn btn-success d-block">Submit</button>
      </form>
    </>
  );
};
export default Register;
