const api_url = 'https://pokeapi.co/api/v2/pokemon/';

let index = 2;

const left = document.getElementById("left");
const right = document.getElementById("right");
const moves = document.getElementById("moves");
const pname = document.getElementById("name");
const info = document.getElementById("info");
let image = "need to find the right element for image";

get_prev_pokemon();

left.addEventListener("click", () => get_prev_pokemon());
right.addEventListener("click", () => get_next_pokemon());

function get_next_pokemon() {
    index++;
    console.log(index);
    fetch(api_url + index)
        .then((response) => response.json())
        .then((data) => parse_data(data));
}

function get_prev_pokemon() {
    if (index > 1) {
        index--;
        console.log(index);
        fetch(api_url + index)
            .then((response) => response.json())
            .then((data) => parse_data(data));
    }
}


function parse_data(data) {
    console.log(data);
    image = data["sprites"]['back_default'];
    pname.textContent = data.name;
    info.textContent = create_info(data.height, data.weight, data.stats);
    moves.textContent = create_moves(data.moves);
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

