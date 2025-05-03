import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("user").then((val) => {
      setUserData(val);
      setIsLoggedIn(true);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userData, setUserData, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
