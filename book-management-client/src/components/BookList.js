import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);  // 여기에 error 상태 추가

  useEffect(() => {
    const fetchBooks = async () => {
      try {const res = await axios.get('http://localhost:5001/api/books');
      setBooks(res.data);} catch (error) {
        console.error('Error fetching books:', error);
        if (error.response) {
          // 서버 응답이 2xx 범위를 벗어난 상태 코드를 반환
          console.error('Server responded with:', error.response.data);
          console.error('Status code:', error.response.status);
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못함
          console.error('No response received:', error.request);
        } else {
          // 요청을 설정하는 중에 문제가 발생
          console.error('Error setting up request:', error.message);
        }
        setError("네트워크 오류가 발생했습니다. 서버가 실행 중인지 확인해 주세요.");
      }
    };
    fetchBooks();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Publication Year</TableCell>
            <TableCell>ISBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.ID}>
              <TableCell>{book.Title}</TableCell>
              <TableCell>{book.Author}</TableCell>
              <TableCell>{book.PublicationYear}</TableCell>
              <TableCell>{book.ISBN}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;