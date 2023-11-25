import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import LoadingScreen from "../LoadingScreen";

const Register = () => {
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    first_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { first_name, email, password, phone } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const role = e.target.role.value;
    const body = { first_name, email, password, phone };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parsedResp = await response.json();
      if (!response.ok) {
        return console.log("not ok!", response, parsedResp.msg);
      }
      setInputs({
        first_name: "",
        email: "",
        password: "",
        phone: "",
      });
      handleLogin(parsedResp.token);
    } catch (err) {
      console.log(err.message);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1 className="text-center my-5">Register</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="role"
                id="exampleRadios1"
                value="talktome"
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
            </div> */}
            <input
              type="text"
              name="first_name"
              placeholder="first name"
              value={first_name}
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
              value={password}
              className="form-control my-3"
              required
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              name="phone"
              placeholder="099-999-99-99"
              value={phone}
              className="form-control my-3"
              required
              onChange={(e) => onChange(e)}
            />

            <button className="btn btn-success d-block">Submit</button>
          </form>
        </>
      )}
    </>
  );
};
export default Register;
