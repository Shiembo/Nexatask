import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../css/ScreensCss/dashboard.css'; // Make sure you have this CSS file in the right path

function Dashboard() {

  const goals = [
    { title: 'Master DevOps Principles and Practices', date: '17-Apr-2026' },
    { title: 'Senior Developer (Establish Leadership and Mentoring Skills)', date: '17-Apr-2026' },
    { title: 'Expand Knowledge in System Design and Architecture', date: '30-Apr-2025' },
    { title: 'Deepen Technical Expertise in Core Programming Languages', date: '17-Apr-2025' },
  ];

  const files = [
    { name: 'PHG Paternity Leave Policy V1.2.pdf' },
    { name: 'PHG&S Policy V1.0.docx' },
    { name: 'PHG Short Term Sickness Policy V1.1.pdf' },
    // ... other file data
  ];


  return (
    <Container fluid className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <Row>
        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Quick Links</Card.Title>
              <Card.Text>
                <a href="/tasks">My Tasks</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Birthday</Card.Title>
              <Card.Text>No birthdays today</Card.Text>
              {/* Insert Birthday Icon */}
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Request For Approval</Card.Title>
              <Card.Text>No record found</Card.Text>
              {/* Insert Approval Icon */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>New Hires</Card.Title>
              <Card.Text>No New Joinees in past 15 days.</Card.Text>
              {/* Insert New Hires Icon */}
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Favorites</Card.Title>
              <Card.Text>No Favorites found.</Card.Text>
              {/* Insert Favorites Icon */}
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Announcements</Card.Title>
              <Card.Text>No Announcement</Card.Text>
              {/* Insert Announcements Icon */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Additional row for the new set of cards */}
        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>My Pending Tasks</Card.Title>
              <Card.Text>There are no tasks available.</Card.Text>
              {/* Insert Pending Tasks Icon */}
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Billable / Non Billable</Card.Title>
              {/* Placeholder for Billable Hours Donut Chart */}
              <div className="donut-chart-placeholder">Donut Chart Here</div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4}  className="dashboard-column">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>My Files</Card.Title>
              {/* Files list */}
              <ul className="file-list">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={6} lg={4} className="dashboard-column">
          <Card className="dashboard-card goals-card">
            <Card.Body>
              <Card.Title>My Goals</Card.Title>
              {goals.map((goal, index) => (
                <div key={index} className="goal">
                  <span className="goal-title">{goal.title}</span>
                  <span className="goal-date">{goal.date}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Space for additional cards if needed */}
      </Row>
    </Container>
  );
}

export default Dashboard;
