import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, login } from "../store/authSlice";
import axios from "axios";

///////login request url
const enterApiUrl = "https://exam.pishgamanasia.com/webapi/Account/Login";

const LoginForm: React.FC = () => {
  /////states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  //////
  //handling submit on login button

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      // Make the POST request to the login API
      const response = await axios.post(enterApiUrl, {
        username,
        password,
      });

      // Assuming the API returns user data on successful login
      const data = await response.data;

      // Dispatch the setCredentials action with the response data
      if (data.status === 1) {
        const userToken = data.data.userToken; // Ensure this is defined
        dispatch(setCredentials({ username, password, userToken })); // Dispatch credentials
        dispatch(login()); // Then log in
      }

      setError(data.message);
    } catch (err) {
      // Handle error appropriately
      if (axios.isAxiosError(err)) {
        console.error("Error logging in:", err.response?.data);
        setError(err.response?.data?.message || "Login failed");
      } else {
        console.error("Unexpected error:", err);
        setError("Login failed");
      }
    }

  };

  // const authState = useSelector((state: RootState) => state.auth);
/////////JSX
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-200 to-cyan-400 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 border border-gray-300 fontMedium"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">ورود</h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            کلمه عبور
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <p className="text-red-400 text-xs my-3">{error}</p>
        <button
          type="submit"
          className="w-full bg-yellow-400  font-bold py-2 rounded-full hover:bg-yellow-500 transition duration-200 cursor-pointer text-black shadow-sm"
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
