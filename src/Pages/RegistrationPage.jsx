import React from "react";
import RegistrationForm from "../component/RegistratioForm";
import NavigationBar from "../component/Navbar";
import { Container } from "react-bootstrap";

function RegistrationPage(){
    return (
        <>
        <NavigationBar />
        <Container>
        <h1>register</h1>
        <RegistrationForm/>
        </Container>
        </>
    )
}

export default RegistrationPage;