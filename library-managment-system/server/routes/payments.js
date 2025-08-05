const express = require('express');
const router = express.Router();
const db = require('../utils/dbpool');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PAYMENTS');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add payment
router.post('/', async (req, res) => {
  const { memberid, amount, type, txtime, duedate, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO PAYMENTS (memberid, amount, type, txtime, duedate, status) VALUES (?, ?, ?, ?, ?, ?)',
      [memberid, amount, type, txtime, duedate, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update specific fields in a payment
// URL: /api/payments/:id
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);

  try {
    const [result] = await db.query(
      `UPDATE PAYMENTS SET ${fields} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    res.json({ message: 'Payment record updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
    

module.exports = router;
