import React, { useState } from 'react';
import { 
  Button, TextField, Container, Typography, Box, MenuItem, 
  Modal, Paper, Grid, CircularProgress, useMediaQuery, useTheme 
} from '@mui/material';
import axios from 'axios';

function GrievanceForm() {
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [file, setFile] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust UI based on screen size

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await axios.post('https://grie-backend.vercel.app/api/grievances', {
        description,
        semester,
        branch,
        file,
      });
      setSubmitted(true);
      setOpen(true);
      resetForm(); // Automatically reset form after submission
    } catch (err) {
      alert('Error submitting grievance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDescription('');
    setSemester('');
    setBranch('');
    setFile('');
  };

  const handleClose = () => {
    setOpen(false);
    setShowThankYou(true);
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setSubmitted(false);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        bgcolor: '#f2f8ff', 
        p: 3, 
        borderRadius: 2, 
        boxShadow: 3, 
        mt: isMobile ? 4 : 8,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          gutterBottom 
          sx={{ color: '#1976d2', fontWeight: 'bold' }}
        >
          Submit a Grievance
        </Typography>
      </Box>

      {!submitted && (
        <Paper 
          elevation={6} 
          sx={{
            p: 3, 
            borderRadius: 2, 
            bgcolor: '#e3f2fd', 
            border: '1px solid #bbdefb'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Semester"
                  variant="outlined"
                  fullWidth
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  {[
                    'Not Semester', 'Semester 8', 'Semester 7', 
                    'Semester 6', 'Semester 5', 'Semester 4', 
                    'Semester 3', 'Semester 2', 'Semester 1'
                  ].map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      {sem}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Branch"
                  variant="outlined"
                  fullWidth
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  {['CSM', 'CSD', 'IT', 'CSE'].map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="File URL (optional)"
                  variant="outlined"
                  fullWidth
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#1976d2', 
                    ':hover': { backgroundColor: '#1565c0' }
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? 300 : 400,
            bgcolor: '#ffebee',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#c62828' }}>
            Grievance Submitted Successfully!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Would you like to submit more?
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => setSubmitted(false)} 
            sx={{ mr: 2 }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Modal>

      <Modal open={showThankYou} onClose={handleThankYouClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? 300 : 400,
            bgcolor: '#e8f5e9',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#388e3c' }}>
            Thank You for Reaching Out!
          </Typography>
          <Typography variant="body1">
            The issues will be sent to YR's, and they will take care of them. 
            Don’t worry, and have a nice day!
          </Typography>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleThankYouClose} 
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Box 
        sx={{ mt: 8, textAlign: 'center', py: 2, borderTop: '1px solid #ddd' }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2024 Monish KMIT. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default GrievanceForm;
