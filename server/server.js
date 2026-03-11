//stating the  server and loading environment variables

require('dotenv').config();
const { connect } = require('mongoose');
const connectDB = require('./src/db/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;



connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});