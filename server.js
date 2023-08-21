import app from './app.js'
import connectDb from './db/connect.js';

const { PORT } = process.env;

const startServer = async () => {
  try {
   await connectDb();
   app.listen(PORT, () => {
     console.log(`Server running. Use our API on port: ${PORT}`)
   })
  } catch (error) {
    console.log(error.message)
  }
}

startServer();