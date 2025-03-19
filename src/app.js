import express from 'express';
import cors from 'cors'; 

const app = express();
app.use(cors()); 
app.use(express.json());

const serverPort = process.env.PORT || 5000;
app.listen(serverPort, () => console.log(`Server up and running on port ${serverPort}`))
