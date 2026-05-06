import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import dns from 'dns'

/* Set custom DNS servers to avoid potential DNS resolution issues (),Using public DNS servers like Google's 
can help resolve MongoDB Atlas connection issues on Windows after switching Node.js versions.
Issue After switching Node.js versions on Windows
Reference: https://stackoverflow.com/questions/79873598/mongodb-atlas-srv-connection-fails-with-querysrv-econnrefused-after-switching-no,
https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/2

**** IMP Note: Using custom dns is for local dev environment, in production environment, it's recommended to use the default DNS settings 
or configure them according to your hosting provider's recommendations.
*/
dns.setServers(['8.8.8.8', '8.8.4.4'])


dotenv.config()
await connectDB()
const app = express()

app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000

//server status check
app.get('/status', (req, res) => {
    res.status(200).json({ status: 'Server is running' })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

