import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem, Modal } from '@mui/material';
import axios from 'axios';

function GrievanceForm() {
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://grie.onrender.com/api/grievances', {
        description,
        semester,
        file,
      });
      setSubmitted(true);
      setOpen(true);
    } catch (err) {
      alert('Error submitting grievance');
    }
  };

  const handleMore = () => {
    setDescription('');
    setSemester('');
    setFile('');
    setSubmitted(false);
    setOpen(false);
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
      setShowThankYou(true); // Show thank you modal after closing the first one
    } else {
      setShowThankYou(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit a Grievance
        </Typography>
        {!submitted ? (
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
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Select Semester"
              variant="outlined"
              fullWidth
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="Not Semester">Not Semester</MenuItem>
              <MenuItem value="Semester 8">Semester 8</MenuItem>
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
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        ) : null}

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Grievance Submitted Successfully!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Would you like to add anything more?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMore}
              sx={{ marginRight: 2 }}
            >
              Yes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Modal>

        <Modal open={showThankYou} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Thank You for Reaching Out!
            </Typography>
            <Typography variant="body1">
              The issues will be sent to CRs Monish & Shaistha, and they will take care of them. Don’t worry, and have a nice day!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
      {/* Footer with Copyright */}
      <Box sx={{ mt: 8, textAlign: 'center', py: 2, borderTop: '1px solid #ddd' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Monish KMIT. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default GrievanceForm;
