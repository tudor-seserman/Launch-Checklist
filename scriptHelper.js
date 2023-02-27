// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById('missionTarget').innerHTML=
   `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src=${imageUrl}>
   `
}

function validateInput(testInput) {
    // console.log(testInput)
   if(testInput === ''){
    return "Empty"
   }else if(isNaN(Number(testInput))){
    return "Not a Number"
   }else if(!isNaN(Number(testInput))){
    return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   const pilotName = document.getElementById("pilotStatus");
   const coPilotName = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoMass = document.getElementById("cargoMass");
   const launchStatus = document.getElementById("launchStatus");

   console.log(fuelLevel)

    if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) ==='Empty'){
        alert("All fields must be filled out!");
    }else if(validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        alert("Please enter valid information!")
    }else{
        list.style.visibility = 'visible';
        pilotName.textContent= `Pilot ${pilot} is ready for launch`;
        coPilotName.textContent=`Copilot ${copilot} is ready for launch`;
        if(fuelLevel<10000){
            fuelStatus.textContent = 'There is not enough fuel for takeoff';
            launchStatus.textContent = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        }else if(cargoLevel>10000){
            cargoMass.textContent = 'There is too much mass for takeoff';
            launchStatus.textContent = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        }else{
            launchStatus.textContent = "Shuttle ready for launch";
            launchStatus.style.color = 'green';
        }

    }



}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if(!response.ok){
            throw new Error("Something went wrong with the API call.")
        }else{
            return response.json()
        }})
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
