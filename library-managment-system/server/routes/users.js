const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require('bcryptjs'); 

const router = express.Router()

// common prefix -- /users

// GET /users/:id   
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM users WHERE id=?", [req.params.id],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.length !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess(results[0]))
        }
    )
})

// GET /users/byemail/:email
router.get("/byemail/:email", (req, resp) => {
    db.query("SELECT * FROM users WHERE email=?", [req.params.email],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.length !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess(results[0]))
        }
    )
})

// POST /users/signin
router.post("/signin", (req, resp) => {
    const {email, passwd} = req.body
    //console.log(req.url + " - " + req.method + " : " + email + " & " + passwd)
    db.query("SELECT * FROM user WHERE email=?", [email],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            //console.log("results: ", results)
            if(results.length !== 1) // user with email not found
                return resp.send(apiError("Invalid email"))
            const dbUser = results[0]
            const isMatching = bcrypt.compareSync(passwd, dbUser.passwd)
            //console.log("is passwd matching: " , isMatching)
            if(!isMatching) // password not matching
                return resp.send(apiError("Invalid password"))
            // create jwt token and add it in response
            const token = createToken(dbUser)
            resp.send(apiSuccess({...dbUser, token})) // password matched for this user
        }
    )
})

// POST /users
router.post("/signup", (req, resp) => {
    const {name, email, phone, passwd} = req.body
    const encPasswd = bcrypt.hashSync(passwd, 10)
    const role = "Member"
db.query("INSERT INTO user (name, email, phone, passwd, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, encPasswd, role],
    (err, result) => {
        if(err)
            return resp.send(apiError(err))
        if(result.affectedRows === 1) {
            db.query("SELECT * FROM user WHERE id=?", [result.insertId],
                (err, results) => {
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess(results[0]))
                }
            )
        }
    }
)

})
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, passwd, role } = req.body;

    const sql = `
        UPDATE user SET name = ?, email = ?, phone = ?, passwd = ?, role = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, phone, passwd, role, id], (err, result) => {
        if (err) {
            console.error("Update error", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    });
});

// DELETE /users/:id
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM users WHERE id=?", [req.params.id],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.affectedRows !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess("User deleted"))
        }
    )
})

// PATCH /users/changepasswd
router.patch("/changepasswd", (req,resp) => {
    const {id, passwd} = req.body
    const encPasswd = bcrypt.hashSync(passwd, 10)
    db.query("UPDATE users SET passwd=? WHERE id=?", [encPasswd, id],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows !== 1)
                return resp.send(apiError("User not found"))
            resp.send(apiSuccess("User password updated"))
        }
    )
})

module.exports = router
