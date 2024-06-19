import React, { useState } from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../component/Navbar";
import TeamDetails from "../component/TeamDetails";
import TeamSearch from "../component/TeamSearch";

function TeamSearchPage() {
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <>
            <NavigationBar />
            <Container className="mt-4">
                {!selectedTeam ? (
                    <TeamSearch onSelectTeam={setSelectedTeam} />
                ) : (
                    <TeamDetails team={selectedTeam} onBack={() => setSelectedTeam(null)} />
                )}
            </Container>
        </>
    );
}

export default TeamSearchPage;