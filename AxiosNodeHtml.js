const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

const base_url =  "http://localhost:3000";

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(_dirname + '/public'));

app.get("/",async (req,res)=> {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books",{books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book/:id",async (req,res)=> {
    try {
        const response = await axios.get(base_url + '/books/'+req.params.id);
        res.render("books",{books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/create",(req,res)=>{
    res.render("create");
});

app.post("/create",async (req,res)=>{
    try {
        const data = { title: req.body.title,author: req.body.author};
        await axios.post(bast_url + '/books',data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/update/:id",async (req,res)=> {
    try {
        const response = await axios.get(
            base_url + '/books'+req.params.id);
        res.render("update",{books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
    });

    app.post("/update/:id",async (req,res)=> {
        try {
            const data = { title: req.body.title,author: req.body.author};
            await axios.put(bast_url + '/books/'+req.params.id,data);
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
        });

        app.get("/delete/:id",async (req,res)=> {
            try {
                await axios.delete(bast_url + '/books/'+req.params.id);
                res.redirect("/");
            } catch (err) {
                console.error(err);
                res.status(500).send('Error');
            }
            });

            app.listen(5500,()=>{
                console.log('Server started on port 5500');
            });
