import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import settingsRouter from './routes/settings'
import { seedSettings } from './seed/seedSettings'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', settingsRouter)

seedSettings().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
});
