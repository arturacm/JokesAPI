const express = require("express");
const app = express();

const Joke = require('awesome-dev-jokes');

app.get("/",(req,res)=>{

    //testa a entrada do usuario
    console.log(typeof (req.query.number + 1),req.query.number>0)
    //early return com 1 piada
    if(!req.query.number || !(req.query.number>0)) return res.json({
        Joke: Joke.getRandomJoke(),
    });

    let piadas = [];
    let count = 0 
    while (piadas.length< req.query.number){
        let newPiada = Joke.getRandomJoke();
        if (piadas.indexOf(newPiada)<0)piadas.push(newPiada);
        count ++;
        if (count == 1000) break;
    }
    //console.log(piadas);
    return res.json({numJokes:piadas.length,Jokes:piadas.map(p=> {return {Joke: p}})})
});

app.listen(3000);