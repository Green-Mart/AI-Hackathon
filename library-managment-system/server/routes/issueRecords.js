const express = require('express');
const router = express.Router();
const db = require('../utils/dbpool');
const dayjs = require('dayjs'); 

// Get all issue records
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ISSUERECORDS');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add issue record
// POST /issuerecords - insert new issue record with fine logic (7-day grace)
router.post('/', async (req, res) => {
  const { copyid, memberid, returndue, returned } = req.body;

  try {
    let fine = 0;

    if (returned) {
      const due = dayjs(returndue);
      const ret = dayjs(returned);

      const daysLate = ret.diff(due, 'day');

      if (daysLate > 7) {
        const chargeableDays = daysLate - 7;
        fine = chargeableDays * 5; // ₹5 per day after grace
      }
    }

    const [result] = await db.query(
      'INSERT INTO ISSUERECORDS (copyid, memberid, returndue, returned, fine) VALUES (?, ?, ?, ?, ?)',
      [copyid, memberid, returndue, returned, fine]
    );

    res.json({ success: true, id: result.insertId, fine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /issuerecords/:id — partial update with fine auto-calculation
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { copyid, memberid, issued, returndue, returned } = req.body;

  try {
    // Step 1: Fetch current record from DB
    const [rows] = await db.query('SELECT * FROM ISSUERECORDS WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Issue record not found' });
    }

    const existing = rows[0];

    // Step 2: Use provided values or fallback to existing
    const newCopyId = copyid ?? existing.copyid;
    const newMemberId = memberid ?? existing.memberid;
    const newIssued = issued ?? existing.issued;
    const newReturndue = returndue ?? existing.returndue;
    const newReturned = returned ?? existing.returned;

    // Step 3: Auto-calculate fine (7-day grace, ₹5 per day after that)
    let fine = 0;
    if (newReturned) {
      const due = dayjs(newReturndue);
      const ret = dayjs(newReturned);
      const daysLate = ret.diff(due, 'day');
      if (daysLate > 7) {
        fine = (daysLate - 7) * 5;
      }
    }

    // Step 4: Update record
    const [result] = await db.query(
      `UPDATE ISSUERECORDS 
       SET copyid = ?, memberid = ?, issued = ?, returndue = ?, returned = ?, fine = ?
       WHERE id = ?`,
      [newCopyId, newMemberId, newIssued, newReturndue, newReturned, fine, id]
    );

    res.json({ success: true, message: 'Issue record updated', fine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// ✅ DELETE: Delete an issue record
// URL: /api/issuerecords/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      'DELETE FROM ISSUERECORDS WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Issue record not found' });
    }
    res.json({ message: 'Issue record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
