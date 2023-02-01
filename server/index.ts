import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req, res) => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
