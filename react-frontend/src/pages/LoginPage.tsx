import { useForm } from "react-hook-form";
import "../assets/styles/login.css";
import { createUser, getUserById } from "../services/userService";
import { useState } from "react";
import userModel from "../models/userModel";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../contexts/AlertContext";

const LoginPage = () => {
  const alertContext = useAlertContext();
  const navigate = useNavigate();
  const userContext = useUserContext();
  const { register, handleSubmit } = useForm();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  const onSubmit = async (data: any) => {
    if (!isLoginMode) {
      await createUser(data);
      alertContext.setIsDisplayed(false);
      userContext.setUsername(data.username);
      navigate("/");
      return;
    }
    let isValid = await validateUser(data);
    if (isValid) {
      alertContext.setIsDisplayed(false);
      userContext.setUsername(data.username);
      navigate("/");
      return;
    }
  };

  const validateUser = async (potentialUser: userModel) => {
    try {
      const correctUser = await getUserById(potentialUser.username);
      const isValid =
        potentialUser.password === correctUser.password ? true : false;
      if (!isValid) {
        alertContext.setMessage("Incorrect Password!");
        alertContext.setIsDisplayed(true);
      }
      return isValid;
    } catch (error) {
      alertContext.setMessage("Username Does Not Exist!");
      alertContext.setIsDisplayed(true);
      return false;
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {isLoginMode ? (
          <span className="login-text">Login</span>
        ) : (
          <span className="login-text">Register</span>
        )}
        <div className="error">{alertContext.message}</div>

        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          maxLength={10}
          required
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          maxLength={15}
          required
        />
        <button className="submit">Submit</button>

        {isLoginMode ? (
          <div className="register-text">
            Don't have an account?
            <span
              onClick={() => {
                setIsLoginMode(false);
              }}
            >
              Sign up
            </span>
          </div>
        ) : (
          <div className="register-text">
            Have an account?
            <span
              onClick={() => {
                setIsLoginMode(true);
              }}
            >
              Login
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
