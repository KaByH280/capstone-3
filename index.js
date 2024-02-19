import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1"

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));


// Get page in default state
app.get("/", (req, res) => {
    res.render("index.ejs")
})

// Pass artist, title and lyrics to main page or error in fault scenario
app.post("/get-lyrics", async (req,res) => {
    try{
        const result = await axios.get(API_URL + `/${req.body.artist}` + `/${req.body.title}`)
        let lines = result.data.lyrics.split('\n')
        lines.splice(0,1)
        res.render("index.ejs", {artist: req.body.artist, title: req.body.title, lyrics: lines})
    } catch (error) {
        res.render("index.ejs", { error: 'Wrong request!' });
    }
})


// Pass error in case user trying to access this page in a wrong way
app.get("/get-lyrics", async (req,res) => {
    res.render("index.ejs", { error: 'Wrong request!' });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})