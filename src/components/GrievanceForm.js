import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';

function GrievanceForm() {
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://grie.onrender.com/api/grievances', {
        description,
        semester,
        file,
      });
      alert('Grievance submitted successfully');
      setDescription('');
      setSemester('');
      setFile('');
    } catch (err) {
      alert('Error submitting grievance');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CSM-A Grievance Submission
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Describe your problem"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            select
            label="Select Semester"
            variant="outlined"
            fullWidth
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <MenuItem value="Semester 7">Semester 7</MenuItem>
            <MenuItem value="Semester 6">Semester 6</MenuItem>
            <MenuItem value="Semester 5">Semester 5</MenuItem>
            <MenuItem value="Semester 4">Semester 4</MenuItem>
            <MenuItem value="Semester 3">Semester 3</MenuItem>
            <MenuItem value="Semester 2">Semester 2</MenuItem>
            <MenuItem value="Semester 1">Semester 1</MenuItem>
          </TextField>
          <TextField
            label="File URL (optional)"
            variant="outlined"
            fullWidth
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default GrievanceForm;
