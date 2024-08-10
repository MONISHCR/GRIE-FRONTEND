import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function GrievanceList() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    async function fetchGrievances() {
      const res = await axios.get('https://grie.onrender.com/api/admin/grievances', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setGrievances(res.data);
    }
    fetchGrievances();
  }, []);

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
      </Box>
    </Container>
  );
}

export default GrievanceList;
