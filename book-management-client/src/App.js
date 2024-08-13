import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Book Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Book List</Button>
          <Button color="inherit" component={Link} to="/add">Add Book</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;