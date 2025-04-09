import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.post('/api/products', async (req, res) => {
  const { name, description, category, price, rating, user_id } = req.body;

  if (!name || !category || !price || !rating || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, category, price, rating, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, category, price, rating, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, rating } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, category = $3, price = $4, rating = $5, updated_at = now() WHERE id = $6 RETURNING *',
      [name, description, category, price, rating, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
