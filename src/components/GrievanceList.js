import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function GrievanceList() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    async function fetchGrievances() {
      const res = await axios.get('https://backend-mu-ebon.vercel.app/api/admin/grievances', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setGrievances(res.data);
    }
    fetchGrievances();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Grievance Report', 14, 22);
    doc.setFontSize(12);
    doc.text('Timeline:', 14, 32);

    const grievanceData = grievances.map((grievance, index) => [
      index + 1,
      grievance.description,
      grievance.semester,
      new Date(grievance.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [['#', 'Description', 'Semester', 'Date']],
      body: grievanceData,
      startY: 40,
    });

    doc.save('Grievance_Report.pdf');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          All Grievances
        </Typography>
        <Paper elevation={3}>
          <List>
            {grievances.map((grievance) => (
              <ListItem key={grievance._id} divider>
                <ListItemText
                  primary={grievance.description}
                  secondary={`${grievance.semester} - ${new Date(grievance.createdAt).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* Button to Download PDF */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={generatePDF}>
            Download Grievance Report as PDF
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default GrievanceList;
