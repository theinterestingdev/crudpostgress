import express from 'express'
import router from './routes/route.js';
import cors from 'cors'


const app = express();

app.use(cors())
app.use(express.json());
app.use("/api",router);



app.listen(8080,()=>{
    console.log("Server is running at port 8080")
});

