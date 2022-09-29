import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.json("Chatapp is working").send(200);
    return;
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));