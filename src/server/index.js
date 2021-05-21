var api = require('./src/api.js').app;
const fs = require('fs');
const housesFilepath = './src/houses.json';

api.get('/houses', function (request, response) {
  response.json(getHouses());
});

api.get('/houses/:id', function (request, response) {
  let house = getHouseById(request.params.id);
  if (house) response.json(house);
  response.json('not found');
});

api.put('/houses', function (request, response) {
  saveHouse(request.body);
  response.json('User was saved succesfully');
});

api.post('/houses', function (request, response) { // functie update
  // in request o sa-mi vina un obiect de tip rama care o sa aiba un anumit id
  //console.log(request.body);//un obiect de tipul rama actualizat pe client
  // citim rama din fisier pe baza id-ului primit de la client
  let house = request.body;
  let houses = getHouses();
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
 // console.log(houses);

  for (let i=0; i< houses.length; i++){
   if(houses[i].id === house.id){
   houses[i] = house;
   }
  }
// salvam in fisier produsele actualizate
    try {
      fs.writeFileSync(housesFilepath, JSON.stringify(houses));// salvare json array in fisier
    } catch (err) {
      console.error(err)
    }

  response.json('The house has been updated succesfully!');
});

api.delete('/houses/:index', function (request, response) {
 console.log(request.params.index);
     // cars.splice(request.params.index, 1);
       let houses = [];
         try {
           houses = JSON.parse(fs.readFileSync(housesFilepath, 'utf8'));
         } catch (err) {
           console.error(err);
           return false;
         }



        houses.splice(findIdInArray(request.params.index),1);

        //console.log(rame);
      try {
         fs.writeFileSync(housesFilepath, JSON.stringify(houses));// salvare json array in fisier
       } catch (err) {
         console.error(err)
       }

   response.json('User with index ' + request.params.index + ' was deleted');
 });


api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getHouses() {
  let houses = [];
  try {
    houses = JSON.parse(fs.readFileSync(housesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return houses;
}

function saveHouse(house) {
  let houses = getHouses();// citire json din fisier
  let maxId = getMaxId(houses);  // get maximum id form cars array
  house.id = maxId+1;// generare id unic
  houses.push(house);// adaugare masina noua in array
  try {
    fs.writeFileSync(housesFilepath, JSON.stringify(houses));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(houses) {
  let max = 0;
  for (var i=0; i<houses.length;i++) {
    if(max < houses[i].id) {
      max = houses[i].id;
    }
  }
  return max;
}

function getHouseById(id){
  let houses = getHouses();// citire json din fisier
  let selectedHouse = null;
  for(var i=0; i<houses.length; i++) {
    if(id == houses[i].id) selectedHouse = houses[i];
  }
  return selectedHouse;
}

function findIdInArray(id){
    let houses = getHouses();

    for(var i=0; i<houses.length; i++) {
        if(id == houses[i].id)
            return i;
      }

    return -1;
}
