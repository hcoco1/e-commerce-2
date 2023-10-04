import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import api from './api'; 

// Define styled components
const StyledForm = styled(Form)`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormDiv = styled.div`
    margin-bottom: 15px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const StyledInput = styled(Field)`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    &:focus {
        border-color: #1877f2;
        outline: none;
    }
`;

const StyledButton = styled.button`
    background-color: #1877f2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: #166fea;
    }
`;

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-size: 12px;
    margin-bottom: 5px;
`;

function UserLogin({ onLogin }) {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                email: '',
                password_hash: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email').required('Required'),
                password_hash: Yup.string().required('Required')
            })}
            onSubmit={(values) => {
                api.login(values)
                    .then(response => {
                        const user = response.data;
                        if (user.message) {
                            alert(user.message);
                        } else {
                            console.log("Logged in as:", user);
                            onLogin(user);
                            navigate('/products'); // Navigate to the products route
                        }
                    })
                    .catch(error => {
                        console.error("Error during login:", error.message || error);
                        alert('Login failed. Please try again.');
                    });
            }}
            
        >
            <StyledForm>
                <FormDiv>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledInput name="email" type="email" />
                    <StyledErrorMessage name="email" component="div" />
                </FormDiv>

                <FormDiv>
                    <StyledLabel htmlFor="password_hash">Password</StyledLabel>
                    <StyledInput name="password_hash" type="password" />
                    <StyledErrorMessage name="password_hash" component="div" />
                </FormDiv>

                <StyledButton type="submit">Login</StyledButton>
            </StyledForm>
        </Formik>
    );
}

export default UserLogin;
