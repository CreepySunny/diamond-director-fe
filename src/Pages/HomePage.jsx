import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../component/Navbar";

function HomePage() {
    return (
        <>
            <NavigationBar />
            <Container className="mt-4">
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Welcome to Diamond Director!</Card.Title>
                        <Card.Text>
                            Manage your baseball team with ease. Track player stats, manage schedules, and more.
                        </Card.Text>
                        <Button as={Link} to="/search-teams" variant="primary">
                            Go to Team Search
                        </Button>
                        <Button as={Link} to="/live" variant="primary">
                            Go to Live Game Scores
                        </Button>
                    </Card.Body>
                </Card>
                <Row className="mt-4">
                    <Col>
                        <h2>About Us</h2>
                        <p>
                            Diamond Director is a comprehensive tool designed to help coaches, managers, and team
                            owners efficiently manage their baseball teams. From tracking individual player
                            performance to scheduling games and practices, our app provides all the necessary tools
                            in one place.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
