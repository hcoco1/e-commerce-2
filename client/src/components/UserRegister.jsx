import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Your provided styles
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

// Validation schema
const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
});


const MyForm = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5555/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password_hash: values.password // Assuming the backend expects 'password_hash'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
      } else {
        console.error("Error registering user:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  }

  return (
    <Formik
        initialValues={{
            username: '',
            email: '',
            password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
    >
        {() => (
            <StyledForm>
                <FormDiv>
                    <StyledLabel htmlFor="username">Username</StyledLabel>
                    <StyledInput name="username" type="text" />
                    <StyledErrorMessage name="username" component="div" />
                </FormDiv>

                <FormDiv>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledInput name="email" type="email" />
                    <StyledErrorMessage name="email" component="div" />
                </FormDiv>

                <FormDiv>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput name="password" type="password" />
                    <StyledErrorMessage name="password" component="div" />
                </FormDiv>

                <StyledButton type="submit">Register</StyledButton>
            </StyledForm>
        )}
    </Formik>
);
};

export default MyForm;