const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const Joke = require('awesome-dev-jokes');

app.get("/",(req,res)=>{
    res.json({
        Joke: Joke.getRandomJoke(),
    });
})

app.get("/:number",(req,res)=>{
    const number = req.params.number
    //testa a entrada do usuario
    //console.log(typeof (req.params.number + 1),req.params.number>0)
    //early return com 1 piada
    console.log(number)
    if(!number || !(number>0)) return res.json({
        Joke: Joke.getRandomJoke(),
    });

    let piadas = [];
    let count = 0 
    while (piadas.length< number){
        let newPiada = Joke.getRandomJoke();
        if (piadas.indexOf(newPiada)<0)piadas.push(newPiada);
        count ++;
        if (count == 1000) break;
    }
    //console.log(piadas);
    return res.json({numJokes:piadas.length,Jokes:piadas.map(p=> {return {Joke: p}})})
});

app.listen(PORT);