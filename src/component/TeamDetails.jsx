import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Alert, Button } from "react-bootstrap";

function TeamDetails({ team, onBack }) {
    return (
        <>
            <Container className="mt-4">
                {team ? (
                    <>
                        <Button variant="secondary" onClick={onBack}>
                            Back to Search
                        </Button>
                        <h1 className="mt-4">{team.teamName}</h1>
                        <Row className="mt-4">
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Coaches</Card.Title>
                                        <ListGroup>
                                            {team.coaches.map((coach, index) => (
                                                <ListGroupItem key={index}>
                                                    {coach.position}: {coach.firstName} {coach.lastName}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Players</Card.Title>
                                        <ListGroup>
                                            {team.rooster.map((player, index) => (
                                                <ListGroupItem key={index}>
                                                    {player.position}: {player.firstName} {player.lastName}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Alert variant="danger">No team details available.</Alert>
                )}
            </Container>
        </>
    );
}

export default TeamDetails;