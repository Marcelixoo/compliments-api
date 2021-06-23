import express from "express";

const app = express();

app.get("/test", (request, response) => {
    return response.send("Testing GET");
});

app.post("/test", (request, response) => {
    return response.send("Testing POST");
});

app.listen(3000, () => console.log("Server running on port 3000..."));