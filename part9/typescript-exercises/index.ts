import express from 'express'
import bmiCalculator from "./bmiCalculator";

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/bmi', (req, res) => {
    res.send(bmiCalculator(Number(req.query.height), Number(req.query.weight)))
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})