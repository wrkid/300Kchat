import express from 'express';

const PORT = 5005;

const app = express();

app.get('/', (req, res) => {
  console.log(req.query)
  res.status(200).json('Server is workingg');
})

app.listen(PORT, () => console.log('WORKING ON PORT' + PORT))