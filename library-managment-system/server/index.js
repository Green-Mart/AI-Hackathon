const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./routes/users");
const bookRoutes = require('./routes/books');
const copiesRouter = require('./routes/copies');
const issueRoutes = require('./routes/issueRecords');
const paymentRoutes = require('./routes/payments');
const { jwtAuth } = require("./utils/jwtauth");

// cmd> npm install cors
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

	app.use(express.json());
	app.use(jwtAuth);
app.use("/users", userRouter);
app.use('/books', bookRoutes);
app.use("/copies", copiesRouter)
app.use('/issues', issueRoutes);
app.use('/payments', paymentRoutes);


const port = 4000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});
