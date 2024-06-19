import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../component/Navbar';
import TeamCoachList from '../component/TeamCoachList';
import CreateTeamForm from '../component/CreateTeamForm';
import TeamPlayerList from '../component/TeamPlayerList';
import AuthContext from '../Auth/AuthContext';
import TeamAPI from '../api/TeamAPI';

function TeamPage() {
    const { user } = useContext(AuthContext);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (user) {
            fetchUserTeam(user.sub, token);
        }
    }, [user]);

    const fetchUserTeam = (userEmail, token) => {
        TeamAPI.findTeamFromUserEmail(userEmail, token)
            .then(response => {
                setTeam(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching team:', error);
                setLoading(false);
            });
    };

    const handleDeleteTeam = () => {
        if (!team) return;

        TeamAPI.deleteTeamByTeamName(team.teamName, token)
            .then(() => {
                setTeam(null);
                handleCloseDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting team:', error);
            });
    };

    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <NavigationBar />
            <Container className="mt-4">
                {team ? (
                    <>
                        <Row>
                            <Col>
                                <h2>Team: {team.teamName}</h2>
                                <Button variant="danger" onClick={handleShowDeleteModal}>
                                    Delete Team
                                </Button>
                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirm Deletion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete the team "{team.teamName}"?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={handleDeleteTeam}>
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <TeamCoachList teamName={team.teamName} />
                            </Col>
                            <Col>
                                <TeamPlayerList teamName={team.teamName} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Button as={Link} to="/coach-dashboard" variant="secondary">
                                    Back to Coach Dashboard
                                </Button>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row>
                        <Col>
                            <CreateTeamForm />
                            <Button variant="primary" className="mt-3" onClick={() => console.log('Create Team')}>
                                Create Team
                            </Button>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}

export default TeamPage;