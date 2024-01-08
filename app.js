// Agregar Pentagonos

const divStats = document.getElementById("stats")
let contenedor = divStats
let sizeW = 70
let sizeH = 75

for (let i = 0; i < 5; i++){
    let pentagono = document.createElement("div")
    pentagono.className = "pentagono"
    pentagono.style.width = sizeW + "%"
    pentagono.style.height = sizeH + "%"
    contenedor.append(pentagono)
    contenedor = pentagono
    sizeW -= 10
    sizeH -=10
}

//Consumo API
let Id = 1
function ObtenerDatos(id = 1){
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(reponse => reponse.json())
        .then(data => {
            MostrarInfo(data)
        })
        .catch(err => console.log(err))
}

function MostrarInfo(pokemon){
    Id = pokemon.id
    const img = document.getElementById("img-pokemon")
    img.src = pokemon.sprites.front_default
    const statDiv = document.getElementById("stat-div")
    let stats = pokemon.stats
    let speed = ( 100 - (stats[5].base_stat/150) * 100)/2
    let specialD = ((stats[4].base_stat/250 * 100))/2 + 50
    let hp = (100 - (stats[0].base_stat/255 * 100))/2
    let specialA = (stats[3].base_stat/150 * 100)/2 + 50 - (stats[3].base_stat/1153 * 100)
    let attack = (stats[3].base_stat/150 * 100)/2 + 50 - (stats[3].base_stat/172 * 100)
    
    statDiv.style.clipPath = `polygon(50% ${speed}%, ${hp}% ${hp/5 +38}%, ${attack}% ${-(50/37)*attack + 117}%, ${specialA}% ${50/37 * specialA - 17.5}%, ${specialD}% ${-(specialD/5)+58.5}%)`
}
ObtenerDatos(Id)

//Cambio de pokemón
let botonD = document.getElementById("right")
let botonI = document.getElementById("left")

botonD.addEventListener('click', function(){ ChangePokemon(true)})
botonI.addEventListener('click', function(){ ChangePokemon(false)})

function ChangePokemon(bool){
    if (bool == true){
        Id += 1
    }else if (bool == false && Id > 1){
        Id -= 1
    }
    ObtenerDatos(Id)
}

// Buscar Pokemon
function BuscarPokemon(){
    event.preventDefault();
    const inputSearch = document.getElementById("input-pokemon")
    ObtenerDatos(inputSearch.value)
}