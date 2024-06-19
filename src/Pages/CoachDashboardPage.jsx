import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../component/Navbar';

function CoachDashboardPage() {
    return (
        <>
            <NavigationBar />
            <Container className="mt-5">
                <h1>Coach Dashboard</h1>
                <Button as={Link} to="/team" variant="primary" className="mr-2">
                    Go to Team Page
                </Button>
                <Button as={Link} to="/game" variant="success">
                    Go to Game Page
                </Button>
            </Container>
        </>
    );
}

export default CoachDashboardPage;
