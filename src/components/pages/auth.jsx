import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://soal.staging.id/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "password",
          client_id: "e78869f77986684a",
          client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
    //   console.log("Response Login", data);

      if (response.ok) {
        const { token_type, access_token } = data;
        const authHeader = `${token_type} ${access_token}`;

        localStorage.setItem("authToken", authHeader);
        navigate("/");
        toast.success("Login Successfully!");
      } else {
        toast.error("Login failed: " + data.error_description || "Unauthorized");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="">
      <div className="flex flex-col  items-center h-screen gap-28">
        <img src="/assets/logo-techno.png" alt="logo" className="mt-20" />
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex flex-col items-center">
            <label htmlFor="email" className="text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Input email...."
              className="border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-300"
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <label htmlFor="password" className="text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Input password...."
              className="border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="mt-10 border border-gray-200 px-10 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
