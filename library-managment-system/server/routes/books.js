// const db = require("../utils/dbpool");
// const { apiSuccess, apiError } = require("../utils/apiresult");
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const path = require("path");

// // books REST apis
// router.get("/categories", (req, resp) => {
// 	db.query("SELECT DISTINCT category FROM books", (err, results) => {
// 		if (err) return resp.send(apiError(err));
// 		const categories = results.map((obj) => obj.category);
// 		//const categories = []
// 		//for(let obj of results)
// 		//    categories.push(obj.category)
// 		resp.send(apiSuccess(categories));
// 	});
// });

// router.get("", (req, resp) => {
// 	db.query("SELECT * FROM books", (err, results) => {
// 		if (err) return resp.send(apiError(err));
// 		resp.send(apiSuccess(results));
// 	});
// });

// router.get("/:id", (req, resp) => {
// 	db.query(
// 		"SELECT * FROM books WHERE id=?",
// 		[req.params.id],
// 		(err, results) => {
// 			if (err) return resp.send(apiError(err));
// 			if (results.length === 0) resp.send(apiError("Book not found"));
// 			else resp.send(apiSuccess(results[0]));
// 		}
// 	);
// });

// router.get("/bycategory/:category", (req, resp) => {
// 	db.query(
// 		"SELECT * FROM books WHERE category=?",
// 		[req.params.category],
// 		(err, results) => {
// 			if (err) return resp.send(apiError(err));
// 			else resp.send(apiSuccess(results));
// 		}
// 	);
// });

// router.get("/image/:imageName", (req, resp) => {
// 	const imagePath = path.join(__dirname, "/../uploads/", req.params.imageName);
// 	resp.contentType("image/webp");
// 	resp.sendFile(imagePath);
// });

// 	router.post("", upload.single("bookimg"), (req, resp) => {
// 		const { title, author, category, price } = req.body;
// 		const bookimgFilename = req.file ? req.file.filename : null;

// 		db.query(
// 			"INSERT INTO books(title, author, category, price, image_name) VALUES(?, ?, ?, ?, ?)",
// 			[title, author, category, price, bookimgFilename],
// 			(err, result) => {
// 				if (err) return resp.send(apiError(err));
// 				// if INSERT is successful, fetch newly inserted record from db and return it
// 				if (result.affectedRows === 1) {
// 					db.query(
// 						"SELECT * FROM books WHERE id=?",
// 						[result.insertId],
// 						(err, result) => {
// 							if (err) return resp.send(apiError(err));
// 							resp.send(apiSuccess(result[0]));
// 						}
// 					);
// 				}
// 			}
// 		);
// 	});

// router.delete("/:id", (req, resp) => {
// 	db.query("DELETE FROM books WHERE id=?", [req.params.id], (err, result) => {
// 		if (err) return resp.send(err);
// 		if (result.affectedRows === 1) resp.send(apiSuccess("Book deleted"));
// 		else resp.send(apiError("Book not found"));
// 	});
// });

// router.put("/:id", (req, resp) => {
// 	const { title, author, category, price, image_name } = req.body;
// 	db.query(
// 		"UPDATE books SET title=?, author=?, category=?, price=?, image_name=? WHERE id=?",
// 		[title, author, category, price, image_name, req.params.id],
// 		(err, result) => {
// 			if (err) return resp.send(apiError(err));
// 			resp.send(apiSuccess({ id: req.params.id, ...req.body }));
// 		}
// 	);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../utils/dbpool');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM BOOKS');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add book
router.post('/', async (req, res) => {
  const { name, author, subject, price, isbn } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO BOOKS (name, author, subject, price, isbn) VALUES (?, ?, ?, ?, ?)',
      [name, author, subject, price, isbn]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE book
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, author, subject, price, isbn } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE BOOKS SET name = ?, author = ?, subject = ?, price = ?, isbn = ? WHERE id = ?',
      [name, author, subject, price, isbn, id]
    );
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM BOOKS WHERE id = ?', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

