const api_url = 'https://pokeapi.co/api/v2/pokemon/';

let index = 2;

const left = document.getElementById("left");
const right = document.getElementById("right");
const pname = document.getElementById("name");
const disp_box = document.getElementById("disp_box");
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const info_b = document.getElementById("info_b");
const moves_b = document.getElementById("moves_b");
const image = document.getElementById("im_id");
const inflabel = document.getElementById("inf-label");
const textlist = document.getElementById("textrows");

info_b.style.backgroundColor = "#7CFF79";
moves_b.style.backgroundColor = "#E8E8E8";

let infoNmoves = {
    'info':'',
    'moves':'' 
};

const type2color = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water" : "#6390F0",
    "electric" : "#F7D02C",
    "grass" : "#7AC74C",
    "ice" : "#96D9D6",
    "fighting" : "#C22E28",
    "poison" : "#A33EA1",
    "ground" : '#E2BF65',
    'flying' : '#A98FF3',
    "psychic" : "#F95587",
    'bug' : "#A6B91A",
    'rock' : "#B6A136",
    'ghost' : "#735797",
    'dragon' : "#6F35FC",
    'dark' : "#705746",
    'steel' : "#B7B7CE",
    'fairy' : '#D685AD'
};

get_prev_pokemon();

left.addEventListener("click", () => get_prev_pokemon());
right.addEventListener("click", () => get_next_pokemon());
info_b.addEventListener("click", () => get_info());
moves_b.addEventListener("click", () => get_moves());

function get_next_pokemon() {
    index++;
    fetch(api_url + index)
        .then((response) => response.json())
        .then((data) => parse_data(data));
}

function get_prev_pokemon() {
    if (index > 1) {
        index--;
        fetch(api_url + index)
            .then((response) => response.json())
            .then((data) => parse_data(data));
    }
}

function get_info() {
    info_b.style.backgroundColor = '#7CFF79';
    moves_b.style.backgroundColor = "#E8E8E8";
    inflabel.textContent = "Info";
    set_disp_box();
}

function get_moves() {
    info_b.style.backgroundColor = "#E8E8E8";
    moves_b.style.backgroundColor = "#7CFF79";
    inflabel.textContent = "Moves";
    set_disp_box();
}

function set_disp_box() {
    if (inflabel.textContent === "Moves") {
        for (let i = 0; i < 10; i++) {
            textlist.children[i].textContent = infoNmoves['moves'][i];
        }
    } else {
        for (let i = 0; i < 10; i++) {
            textlist.children[i].textContent = infoNmoves['info'][i];
        }
    }
}

function parse_data(data) {
    image.src = data["sprites"]['other']['official-artwork']['front_default'];
    pname.textContent = data.name;
    infoNmoves['info'] = create_info(data.height, data.weight, data.stats);
    infoNmoves['moves'] = create_moves(data.moves);
    set_disp_box();
    create_types(data['types']);
}

function create_info(height, weight, stats) {
    let info = []
    height *= .1;
    weight *= 1.0;
    info.push("height: " + height.toFixed(1) + "m");
    info.push("weight: " + weight.toFixed(1) + "kg");
    for (let i = 0; i < stats.length; i++) {
        info.push(stats[i].stat.name + ": " + stats[i].base_stat);
    }
    for (let i = stats.length; i < 8; i++) {
        info.push("");
    }
    return info;
}

function create_moves(moves) {
    let moveList = [];
    let limit = 8;
    if (moves.length < limit) {
        limit = moves.length;
    }
    for (let i = 0; i < limit; i++) {
        moveList.push(moves[i].move.name);
    }
    for (let i = limit; i < 8; i++) {
        moveList.push("");
    }
    return moveList;
}

function create_types(types) {
    type1.textContent = types[0]['type']['name'];
    type1.style.backgroundColor = type2color[types[0]['type']['name']];
    if (types.length > 1) {
        type2.textContent = types[1]['type']['name'];
        type2.style.backgroundColor = type2color[types[1]['type']['name']];
    } else {
        type2.textContent = "";
        type2.style.backgroundColor = "white";
    }
}