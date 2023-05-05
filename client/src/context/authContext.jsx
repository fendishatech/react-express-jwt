import { createContext, useState, useEffect } from "react";

// Create context.
const AuthContext = createContext();

// create provider
const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userDetails) => {
    localStorage.setItem("user", JSON.stringify(userDetails));
    setUser(userDetails);
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
    <AuthContext.Provider values={values}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
