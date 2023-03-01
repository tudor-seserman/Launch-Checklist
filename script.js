// Write your JavaScript code here!

// const { myFetch } = require("./scriptHelper");



window.addEventListener("load", function() {

    let list = document.getElementById("faultyItems")
    list.style.visibility = "hidden";
    let form = document.querySelector("form");

    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // console.log(listedPlanets);
    }).then(function () {
        // console.log(pickPlanet(listedPlanets));
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let chosenPlanet=pickPlanet(listedPlanets)
        addDestinationInfo(document, chosenPlanet.name, chosenPlanet.diameter, chosenPlanet.star, chosenPlanet.distance, chosenPlanet.moons, chosenPlanet.image)
    })
    
    form.addEventListener("submit", function(event) {
        let pilot = document.querySelector('input[name=pilotName]').value;
        let copilot = document.querySelector('input[name=copilotName]').value;
        let fuelLevel = document.querySelector('input[name=fuelLevel]').value;
        let cargoLevel = document.querySelector('input[name=cargoMass]').value;
    
        event.preventDefault()
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel)
    })

});