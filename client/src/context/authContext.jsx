import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";
// Create context.
const AuthContext = createContext();

// create provider
const AuthContextProvider = (prop) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userDetails) => {
    try {
      // const res = await axios.post(
      //   "http://localhost:3333/api/auth/login",
      //   userDetails
      // );
      const res = await axiosClient.post("/auth/login", userDetails);
      if (res.data.success == true) {
        setUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        console.log(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const values = {
    user,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={values}>{prop.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
