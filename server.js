const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' }); // will read our variables from the file and save them in node.js env variables
// console.log(process.env);

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
