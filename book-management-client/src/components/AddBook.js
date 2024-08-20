import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddBook = () => {
  const [book, setBook] = useState({ Title: '', Author: '', PublicationYear: '', ISBN: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookToSubmit = {
        ...book,
        PublicationYear: book.PublicationYear ? parseInt(book.PublicationYear, 10) : null
      };
      console.log('Sending book data:', bookToSubmit);  // 디버깅을 위한 로그
      await axios.post('http://localhost:5001/api/books', book);
      setSnackbarMessage('Book added successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setBook({ Title: '', Author: '', PublicationYear: '', ISBN: '' });
    } catch (error) {
      console.error('Error adding book:', error);
      setSnackbarMessage('Error adding book: ' + (error.response?.data?.error || error.message));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Title" name="Title" value={book.Title} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Author" name="Author" value={book.Author} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Publication Year" name="PublicationYear" value={book.PublicationYear} onChange={handleChange} type="number" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="ISBN" name="ISBN" value={book.ISBN} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Add Book</Button>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default AddBook;