
const result = document.getElementById("result");

const submitButton = document.getElementById("submit");

const createForm = document.getElementById("create-section");

let editedCarId = null;


function GetAll() {

    sendRequest("GET", url)
        .then(response => response.json())
        .then(data => {
            SetResult(data);
            console.log(data);
        })
        .catch(err => console.error(err));

}
function SetResult(cars) {

    let content = '';

    cars.forEach(element => {

        content += `
            <div class="item">

                <h1 class="line">ID: ${element.id}</h1>

                <h1>Model: ${element.model}</h1>

                <h1>Vendor: ${element.vendor}</h1>

                <h1>Year: ${element.year}</h1>

                <h1>Engine: ${element.engine}</h1>

                <h1>Horse Power: ${element.horsePower}</h1>

                <button onclick='EditCar("${element.id}")'>
                    Edit
                </button>

                <button onclick='DeleteCar("${element.id}")'>
                    Delete
                </button>

            </div>
        `;

    });

    result.innerHTML = content;

}

function CreateNew() {

    editedCarId = null;

    createForm.style.display = "block";

    const form = document.forms["CarForm"];

    form.reset();

    submitButton.innerHTML = "Submit Add New";

}

function EditCar(id) {

    editedCarId = id;

    submitButton.innerHTML = "Submit Update Car";

    sendRequest("GET", url + "/" + id)

        .then(response => response.json())

        .then(data => {

            createForm.style.display = "block";

            const form = document.forms["CarForm"];

            form["model"].value = data.model;
            form["vendor"].value = data.vendor;
            form["year"].value = data.year;
            form["engine"].value = data.engine;
            form["horsePower"].value = data.horsePower;

            console.log(data);

        })

        .catch(err => console.error(err));

}
function OnSubmit(event) {

    event.preventDefault();

    const form = document.forms["CarForm"];

    const car = {

        model: form["model"].value,
        vendor: form["vendor"].value,
        year: form["year"].value,
        engine: form["engine"].value,
        horsePower: form["horsePower"].value

    };

    if (editedCarId === null) {

        sendRequest("POST", url, car)

            .then(response => response.json())

            .then(data => {

                GetAll();

                form.reset();

                createForm.style.display = "none";

                console.log(data);

            })

            .catch(err => console.error(err));

    }
    else {

        sendRequest("PUT", url + "/" + editedCarId, car)

            .then(response => response.json())

            .then(data => {

                GetAll();

                form.reset();

                editedCarId = null;

                createForm.style.display = "none";

                console.log(data);

            })

            .catch(err => console.error(err));

    }

}

function DeleteCar(id) {

    const answer = confirm("Are you sure you want to delete this car?");

    if (answer) {

        sendRequest("DELETE", url + "/" + id)

            .then(response => {

                if (!response.ok) {
                    throw new Error("Car could not be deleted");
                }

                GetAll();

                console.log("Car deleted successfully");

            })

            .catch(err => console.error(err));

    }

}
