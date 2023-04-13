import { Form, useFetcher } from "react-router-dom";

function LoginForm() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form className="Form" method="post" action="/">
      <div>
        <p>User type</p>
        <select name="role" id="role" required defaultValue="user">
          <option value="user">Customer</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      <div>
        <p>Username</p>
        <input type="text" name="username" id="username" required />
      </div>
      <div>
        <p>Password</p>
        <input type="password" name="password" id="password" required />
      </div>
      <button disabled={fetcher.state === "submitting"} className="FormBtn">
        {fetcher.state === "submitting" ? "Logging in..." : "Login"}
      </button>
    </fetcher.Form>
  );
}

export default LoginForm;
