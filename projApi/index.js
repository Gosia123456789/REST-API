const express = require("express");
const Joi = require("joi");
const joi = require("joi");
const app = express();
app.use(express.json);

const cats = [
    {name:'Black Cat', id: 1},
    {name:'White Cat', id: 2},
    {name:'Ginger Cat', id: 3}
]


app.get("/", (req, res) => {
    res.send("This is example of unfinished app with FETCH API");
});

app.get('/api/cats', (req, res) => {
res.send(cats);
});

app.get('/api/cats:id', (req, res) => {
    const cat = cats.find(c => c.id ===parseInt(req.param.id))

if(!cat) res.status(404).send("Ups, we cannot find it");
res.send(cat)
});

app.post('/api/cats', (req, res)=> {
    const { error } = validateCat(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const cat = {
        id: cats.length + 1,
        name: require.body.name
    };
    cats.push(cat);
    res.send(cat);
});

app.put('/api/cats/:id', (req, res) =>{
    const cats = cats.find(c => c.id ===parseInt(req.param.id));
    if(!cats)res.status(404).send("This page does not exist");
    const { error } = validateCat(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    cat.name = require.body.name;
    res.send(cat);
});

app.delete('/api/cats/:id', (req, res) => {
    const cats = cats.find(c => c.id === parseInt(req.param.id));
    if(!cats)res.status(404).send("Not found!");
    
    const index = cats.indexOf(cat);
    cats.splice(index, 1);
    res.send(cat);
});

function validateCat(cat) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(cat, schema);
}

const port = process.env.PORT || 4200;
app.listen(4200, () => console.log("Active on port 4200"));