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
   const cargoMass = document.getElementById("cargoStatus");
   const launchStatus = document.getElementById("launchStatus");
//    console.log(fuelLevel)
    if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) ==='Empty'){
        alert("All fields must be filled out!");
    }else if(validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        alert("Please enter valid information!")
    }else{
        list.style.visibility = 'visible';
        pilotName.textContent= `Pilot ${pilot} is ready for launch`;
        coPilotName.textContent=`Co-pilot ${copilot} is ready for launch`;
        if(fuelLevel<10000 && cargoLevel>10000){
            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = 'rgb(199, 37, 78)';
            cargoMass.textContent = 'Cargo mass too heavy for launch';
            fuelStatus.textContent = 'Fuel level too low for launch';
        }else if(fuelLevel<10000 && cargoLevel<=10000){
            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = 'rgb(199, 37, 78)';
            fuelStatus.textContent = 'Fuel level too low for launch';
        }else if(fuelLevel>=10000 && cargoLevel>10000){
            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = 'rgb(199, 37, 78)';
            cargoMass.textContent = 'Cargo mass too heavy for launch';
            fuelStatus.textContent = 'Fuel level high enough for launch';          
        }else{
            launchStatus.textContent = "Shuttle is Ready for Launch";
            launchStatus.style.color = 'rgb(65, 159, 106)';
            fuelStatus.textContent = 'Fuel level high enough for launch';
            cargoMass.textContent = 'Cargo mass low enough for launch';

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
