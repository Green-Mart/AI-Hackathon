    const express = require('express');
    const router = express.Router();
    const db = require('../utils/dbpool');
    const { apiSuccess, apiError } = require('../utils/apiresult');


    // Get all copies
    router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM COPIES');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // Add copy
    router.post('/', async (req, res) => {
    const { bookid, rack, status } = req.body;
    try {
        const [result] = await db.query(
        'INSERT INTO COPIES (bookid, rack, status) VALUES (?, ?, ?)',
        [bookid, rack, status]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });
    // PUT: Update a copy
router.put("/:id", async (req, res) => {
    const copyId = req.params.id;
    const { bookid, rack, status } = req.body; // <- status instead of isissued

    try {
        const [result] = await db.query(
            'UPDATE COPIES SET bookid=?, rack=?, status=? WHERE id=?',
            [bookid, rack, status, copyId] // <- match column names correctly
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Copy not found" });
        }

        res.json({ message: "Copy updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
});


// DELETE: Delete a copy
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM copies WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send(apiError("Copy not found"));
    }

    res.send(apiSuccess("Copy deleted successfully"));
  } catch (err) {
    res.status(500).send(apiError("Database error", err));
  }
});



    module.exports = router;
