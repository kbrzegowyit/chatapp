import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json("Chatapp is working").send(200);
    return;
});

app.listen(80, () => console.log('Server is running on port 80'));