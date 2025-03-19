import express from 'express'

const app = express();

app.get('/', (req,res) => {
    res.send("Hello This is backend which is pending to implement");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


