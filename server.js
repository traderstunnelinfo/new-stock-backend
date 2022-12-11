const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: `${__dirname}/config.env`});

const app = require('./app');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
    .then(() => console.log('Database connection succeed!!!'))
    .catch(error => console.log('Database connection Failed!!!:', error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
});
