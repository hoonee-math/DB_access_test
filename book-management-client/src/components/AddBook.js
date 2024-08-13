import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';

const AddBook = () => {
  const [book, setBook] = useState({ Title: '', Author: '', PublicationYear: '', ISBN: '' });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/books', book);
      alert('Book added successfully');
      setBook({ Title: '', Author: '', PublicationYear: '', ISBN: '' });
    } catch (error) {
      alert('Error adding book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Title" name="Title" value={book.Title} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Author" name="Author" value={book.Author} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Publication Year" name="PublicationYear" value={book.PublicationYear} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="ISBN" name="ISBN" value={book.ISBN} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Add Book</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddBook;