const express = require('express');
const ADODB = require('node-adodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\DB_access\\book_management.accdb;');

app.get('/api/books', async (req, res) => {
  try {
    const books = await connection.query('SELECT * FROM Books');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const { Title, Author, PublicationYear, ISBN } = req.body;
    await connection.execute('INSERT INTO Books (Title, Author, PublicationYear, ISBN) VALUES (?, ?, ?, ?)', [Title, Author, PublicationYear, ISBN]);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;  // 5000에서 5001로 변경
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));