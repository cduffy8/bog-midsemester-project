import fetch from "node-fetch";

fetch('https://pokeapi.co/api/v2/pokemon/5')
    .then((response) => response.json())
    .then((data) => parse_data(data));

function parse_data(data) {
    console.log(data.name);
    console.log('INFO');
    const info = create_info(data.height, data.weight, data.stats);
    const moves = create_moves(data.moves);
    console.log(info);
    console.log("move");
    console.log(moves);
}

function create_info(height, weight, stats) {
    height *= .1;
    weight *= 1.0;
    let info = "height: " + height.toFixed(1) + "m";
    info += "\nweight: " + weight.toFixed(1) + "kg";
    for (let i = 0; i < stats.length; i++) {
        info += "\n" + stats[i].stat.name + ": " + stats[i].base_stat;
    }
    return info;
}

function create_moves(moves) {
    let moveList = moves[0].move.name;
    for (let i = 1; i < moves.length; i++) {
        moveList += "\n"+ moves[i].move.name;
    }
    return moveList;
}

