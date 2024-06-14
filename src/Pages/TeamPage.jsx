import React from "react";
import RegistrationForm from "../component/RegistratioForm";
import NavigationBar from "../component/Navbar";
import { Container } from "react-bootstrap";
import TeamCoachList from "../component/TeamCoachList";

function TeamPage(){
    return (
        <>
        <NavigationBar />
        <Container>
            <TeamCoachList />
        </Container>
        </>
    )
}

export default TeamPage;