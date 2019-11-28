const express = require('express');
const app = express();
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile')
const applicationRoutes = require('./routes/applications')
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/', searchRoutes);
app.use('/', profileRoutes);
app.use('/', applicationRoutes);


app.listen(8080, () => {console.log("Server is now running on port 8080")})
