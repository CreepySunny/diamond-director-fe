import React from "react";
import LoginForm from "../component/LoginForm";
import NavigationBar from "../component/Navbar";
import { Container } from "react-bootstrap";

function LoginPage(){
    return (
        <>
        <NavigationBar />
        <Container>
        <LoginForm />
        </Container>
        </>
    )
}

export default LoginPage;