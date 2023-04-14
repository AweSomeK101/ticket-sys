import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import useUser from "../context/userProvider";

function LoginLayout() {
  const { user, token } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== {} && token !== "") {
      if (user.role === "user") {
        console.log("in effect");
        navigate("dashboard/u");
      } else if (user.role === "employee") {
        navigate("dashboard/e");
      }
    }
  });

  return (
    <div className="login">
      <h3>Welcome</h3>
      <LoginForm />
    </div>
  );
}

export const loginAction = (login) =>
  async function ({ request }) {
    const formData = await request.formData();
    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
    const errObj = {};

    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    fetch(`${baseUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.status === 404 || res.status === 401) {
          errObj.status = res.status;
          return res.json();
        }
        if (!res.ok) {
          console.log("res not okay", res.status, res.statusText);
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          alert(data.message);
          errObj.message = data.message;
          return errObj;
        }
        return login(data.user, data.token);
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  };

export default LoginLayout;
