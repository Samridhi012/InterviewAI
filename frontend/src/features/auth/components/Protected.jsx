import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const {loading, user} = useAuth();

    if(loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to="/login" />;
    }

  return children; 
  //if the user is authenticated, we render the children components that are wrapped inside the Protected component.
}

export default Protected
