import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/InputField";
import {
  requestPasswordReset,
  confirmPasswordReset,
  clearMessage,
} from "../store/slices/authSlice";

import {
  RiMailLine,
  RiLockLine,
} from "react-icons/ri";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (token && isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [token, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (token) {
      dispatch(
        confirmPasswordReset({
          token,
          password,
        })
      );
    } else {
      dispatch(requestPasswordReset(email));
    }
  };

  return (
    <div className="p-5">

      {!token ? (

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto mt-20 bg-white shadow-xl rounded-lg p-6 flex flex-col gap-5"
        >

          <h2 className="text-2xl font-bold text-center">
            Forgot Password
          </h2>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            Icon={RiMailLine}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && (
            <p className="text-center text-blue-600 font-semibold">
              {message}
            </p>
          )}

          <input
            type="submit"
            disabled={loading}
            value={
              loading
                ? "Sending..."
                : "Send Reset Link"
            }
            className="bg-blue-600 text-white rounded-md p-3 cursor-pointer disabled:bg-gray-400"
          />

        </form>

      ) : (

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto mt-20 bg-white shadow-xl rounded-lg p-6 flex flex-col gap-5"
        >

          <h2 className="text-2xl font-bold text-center">
            Reset Password
          </h2>

          <InputField
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter your new password"
            Icon={RiLockLine}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && (
            <p className="text-center text-blue-600 font-semibold">
              {message}
            </p>
          )}

          <input
            type="submit"
            disabled={loading}
            value={
              loading
                ? "Updating..."
                : "Reset Password"
            }
            className="bg-blue-600 text-white rounded-md p-3 cursor-pointer disabled:bg-gray-400"
          />

        </form>

      )}

    </div>
  );
}
