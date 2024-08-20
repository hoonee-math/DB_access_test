const express = require('express');
const odbc = require('odbc');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const connectionString = 'DSN=BookManagementDB;'; // ODBC 데이터 소스 이름을 여기에 입력하세요

async function query(sql, params = []) {
  const connection = await odbc.connect(connectionString);
  try {
    const result = await connection.query(sql, params);
    return result;
  } finally {
    await connection.close();
  }
}

app.get('/api/books', async (req, res) => {
  try {
    const books = await connection.query('SELECT * FROM Books');
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const { Title, Author, PublicationYear, ISBN } = req.body;
    console.log('Received book data:', { Title, Author, PublicationYear, ISBN });

    await query('INSERT INTO Books (Title, Author, PublicationYear, ISBN) VALUES (?, ?, ?, ?)', [Title, Author, PublicationYear, ISBN]);
    
    console.log('Book added successfully');
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;  // 5001로 변경
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));