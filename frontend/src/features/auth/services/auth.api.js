import axios from 'axios';

//repeatative code for all the api calls, we can create a helper function to avoid repetition and make it more maintainable
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // to send cookies with the request (axios doesn't send cookies by default)
})

export async function register({username,email,password}){
    try{
        const response = await api.post('/api/auth/register',
            {username,email,password}
            // withCredentials is already set on the API instance
        );
        return response.data;

    }catch(err){
        console.log(err);
    }
    
}

export async function login({email,password}){
    try{
        const response = await api.post('/api/auth/login',
            {email,password}
            // withCredentials is already set on the API instance
        );
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export async function logout(){
    try{
        const response = await api.get('/api/auth/logout');

        return response.data;
    }catch(err){
        console.log(err);
    }   
}

export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me');
        return response.data;
    }catch(err){
        console.log(err);
    }
}