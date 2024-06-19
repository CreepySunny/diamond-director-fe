import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import TeamAPI from "../api/TeamAPI";

function TeamSearch({ onSelectTeam }) {
    const [searchCriteria, setSearchCriteria] = useState({
        teamName: "",
    });
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await TeamAPI.searchForTeamUsingName(searchCriteria.teamName);
            setSearchResults(response.data);
            setSearchError(null);
        } catch (error) {
            setSearchResults([]);
            setSearchError("An error occurred while searching for teams.");
            console.error("Error searching for teams:", error);
        }
    };

    return (
        <>
            <Container className="mt-4">
                <h1>Search for a Team</h1>
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSearch}>
                                    <Form.Group controlId="teamName">
                                        <Form.Label>Team Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter team name"
                                            name="teamName"
                                            value={searchCriteria.teamName}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Search
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {searchError && (
                    <Row className="mt-4">
                        <Col>
                            <Alert variant="danger">{searchError}</Alert>
                        </Col>
                    </Row>
                )}
                {searchResults.length > 0 && (
                    <Row className="mt-4">
                        <Col>
                            <h2>Search Results</h2>
                            {searchResults.map((team) => (
                                <Card key={team.teamName} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{team.teamName}</Card.Title>
                                        <Button variant="primary" onClick={() => onSelectTeam(team)}>
                                            View Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}

export default TeamSearch;