//---------------HOOK LAYER------------------------------------
//Connecting State and API layer

//"AuthContext" or "auth.context.jsx" denotes STATE LAYER
//STATE LAYER provided {user, setUser, loading, setLoading} to the entire app through AuthProvider in App.jsx
//"auth.api.jsx" denotes API LAYER
//API LAYER provides functions to make API calls to the backend (register, login, logout, getMe)

//"useAuth.jsx" is the HOOK LAYER that connects the STATE LAYER and API LAYER. 
// It allows us to access the authentication state and functions from the AuthContext in any component that calls useAuth.

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext); // useContext is a React hook that allows us to access the context value (user, setUser, loading, setLoading) provided by the AuthProvider component. 
    // By calling useContext(AuthContext), we can access the current authentication state and functions to update it from any component that calls useAuth.
    
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({email,password}) => {
        // When the handleLogin function is called, it first sets the loading state to true to indicate that a login request is in progress.
        //this is because we want to show a loading indicator in the UI while the login request is being processed.
        //since it might happen that the login request takes some time to complete (e.g., due to network latency), setting loading to true allows us to provide feedback to the user that something is happening in the background.
        setLoading(true);
        try{
            const data = await login({email, password}); //this "data" contains the user information returned by the login API. We get user information from the backend after a successful login.
        setUser(data.user);
        }
        catch(error){
            console.error("Login failed:", error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleRegister = async ({username,email,password}) => {
        setLoading(true);
        try{
            const data = await register({username,email,password});
            setUser(data.user);
        }
        catch(error){
            console.error("Register failed:", error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try{
            const data = await logout();
            setUser(null);
        }
        catch(error){
            console.error("Logout failed:", error);
        }
        finally{
            setLoading(false);
        }
    };

    return {user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout}; //hook returns all this
}