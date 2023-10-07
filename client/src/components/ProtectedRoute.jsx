import  { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

import { useEffect } from 'react';


function ProtectedRoute({ children, fallback }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(fallback);
        }
    }, [user, navigate, fallback]);

    if (!user) {
        return null; 
    }

    return children;
}


export default ProtectedRoute;
