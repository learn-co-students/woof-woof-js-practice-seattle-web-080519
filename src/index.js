const pupsUrl = 'http://localhost:3000/pups'

document.addEventListener("DOMContentLoaded", function() {
    load()
    filterGoodDog();
});

function load() {
    fetch(pupsUrl)
        .then(resp => resp.json())
        .then(pups => renderPups(pups));
};

function renderPups(pups) {
    const dogBar = document.querySelector('#dog-bar');
    pups.map( pup => {
        const span = document.createElement("span");
        span.textContent = pup.name;
        span.id = `span${pup.id}`;
        span.addEventListener("click", () => show(pup));

        dogBar.appendChild(span);
    } );
};

function show(pup) {
    console.log("here")
    const dogInfo = document.querySelector('#dog-info');
    dogInfo.innerHTML = "";
    const div = document.createElement("div");
    div.id = `div${pup.id}`
    dogInfo.appendChild(div);

    const img = document.createElement("img");
    img.src = pup.image;

    const h2 = document.createElement("h2");
    h2.textContent = pup.name;

    const button = document.createElement("button");
    button.id = `btn${pup.id}`;
    button.addEventListener("click", () => toggleGood(pup));

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(button);
    goodDog(pup);
};

function goodDog(pup) {
    const button = document.getElementById(`btn${pup.id}`);
    if (pup.isGoodDog === true) {
        button.textContent = "Good Dog!"
    } else {
        button.textContent = "Bad Dog!"    
    };
};

function toggleGood(pup) {
    fetch(pupsUrl + '/' + pup.id)
        .then(resp => resp.json())
        .then(pup => toggle(pup))
};

function toggle(pup) {
    const filterButton = document.getElementById
    fetch(pupsUrl + '/' + pup.id, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({ "isGoodDog": !pup.isGoodDog })
    })
    .then(resp => resp.json())
    .then(pup => goodDog(pup))
    .then(() => filter(filterButton));
};

function filterGoodDog() {
    const filterButton = document.getElementById('good-dog-filter');
    filterButton.addEventListener('click', () => toggleFilterBtn(filterButton)); 
};

function toggleFilterBtn(filterButton) {
    if ( filterButton.textContent === "Filter good dogs: OFF") {
        filterButton.textContent = "Filter good dogs: ON"
    } else {
        filterButton.textContent = "Filter good dogs: OFF"
    }
    filter(filterButton);
};

function filter(filterButton) {
    fetch(pupsUrl)
        .then(resp => resp.json())
        .then(pups => {
            pups.forEach( pup => {
                if (filterButton.textContent === "Filter good dogs: OFF") {
                    const span = document.getElementById(`span${pup.id}`)
                    span.style.display = ""
                } else {
                    if (pup.isGoodDog === false) {
                        const span = document.getElementById(`span${pup.id}`)
                        span.style.display = "none"
                    } else {
                        const span = document.getElementById(`span${pup.id}`)
                        span.style.display = ""
                    }
                }
            });
        });
};