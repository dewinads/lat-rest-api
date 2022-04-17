const express = require("express");
const articles = require("./data");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/articles", (req, res) => {
    res.status(200).json(articles);
});

app.get("/api/articles/:id", (req, res) => {
    const article = articles.find((e) => e.id === Number(req.params.id));
    res.status(200).json(article);
});

app.post("/api/articles", (req, res) => {
    const { brand, founder, product } = req.body;

    // Tambah ID dari item terakhir
    const lastID = articles[articles.length - 1].id;
    const newID = lastID + 1;

    const article = {
        id: newID,
        brand,
        founder,
        product,
    };

    articles.push(article);

    res.status(201).json(article);
});

app.put("/api/articles/:id", (req, res) => {
    const { brand, founder, product } = req.body;

    const indexArticle = articles.findIndex((e) => e.id === Number(req.params.id));

    articles[indexArticle] = {
        id: Number(req.params.id),
        brand,
        founder,
        product,
    };

    res.status(201).json(articles[indexArticle]);
});

app.delete("/api/articles/:id", (req, res) => {
    const indexArticle = articles.findIndex((e) => e.id === Number(req.params.id));

    articles.splice(indexArticle, 1);

    res.status(200).json({
        message: `ID ${req.params.id} is deleted`
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});