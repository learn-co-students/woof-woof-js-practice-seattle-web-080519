const puppyUrl = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", function() {
    fetchPups(puppyUrl)
})

function fetchPups(puppyUrl) {
    fetch(puppyUrl).then(resp => resp.json()).then(data => {
        showPups(data),
        startFilter(data)
    })
}

function showPups(dogs) {
    const dogBar = document.getElementById("dog-bar");
    if (dogBar.hasChildNodes() == true) {
        dogBar.innerHTML = '';   
    }

    dogs.map(dog => {
        addDog(dog);
    });
}

function addDog(dog) {
    const dogBar = document.getElementById("dog-bar");
    const span = makeDogBar(dog);
    dogBar.appendChild(span);
}

function makeDogBar(dog) {
    const span = document.createElement("span");
    span.textContent = dog.name;
    span.id = dog.id
    span.addEventListener("click", () => populateDogInfo(dog));
    // the parentheses should be empty; if I put something in it, it thinks it's the name of the event
    return span
}

function populateDogInfo(dog) {
    const dogInfo = document.getElementById("dog-info");
    if (dogInfo.hasChildNodes() == true) {
        dogInfo.innerHTML = "";
    }
    
    const image = document.createElement("img");
    image.src = dog.image;
    dogInfo.appendChild(image);

    const name = document.createElement("h2");
    name.textContent = dog.name;
    dogInfo.appendChild(name);
    
    const moralityBtn = document.createElement("button");
    if (dog.isGoodDog === true) {
        moralityBtn.textContent = "Bad Dog!";
    } else {
        moralityBtn.textContent = "Good Dog!";
    };
    moralityBtn.addEventListener("click", () => toggleMorality(dog, moralityBtn));
    dogInfo.appendChild(moralityBtn);
}

function toggleMorality(dog, moralityBtn) {
    const filterBtn = document.getElementById("good-dog-filter");

    if (dog.isGoodDog === true) {
        dog.isGoodDog = false;
        moralityBtn.textContent = "Good Dog!";
        updateMorality(dog);
        if (filterBtn.textContent = "Filter good dogs: ON") {
            dogSpan = document.getElementById(dog.id)
            dogSpan.remove();
        }
    } else {
        dog.isGoodDog = true;
        moralityBtn.textContent = "Bad Dog!";
        updateMorality(dog);
        if (filterBtn.textContent = "Filter good dogs: ON") {
            addDog(dog);
        }
    };

}

function updateMorality(dog) {
    let id = dog.id
    const moralityUrl = `http://localhost:3000/pups/${id}`

    fetch(moralityUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
}

function startFilter(data) {
    const filterBtn = document.getElementById("good-dog-filter");
    filterBtn.textContent == "Filter good dogs: OFF";
    filterBtn.addEventListener("click", (e) => filterDogs(filterBtn, data))
}

function filterDogs(filterBtn, data) {
    if (filterBtn.textContent == "Filter good dogs: OFF") {
        filterBtn.textContent = "Filter good dogs: ON";
        showGoodPups(data)
    } else {
        filterBtn.textContent = "Filter good dogs: OFF";
        showPups(data)
    }
}

function showGoodPups(dogs) {
    const dogBar = document.getElementById("dog-bar");
    dogBar.innerHTML = '';
    
    dogs.map(dog => {
        if (dog.isGoodDog == true) {
            addDog(dog);
        }
    });
}