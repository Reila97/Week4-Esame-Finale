console.log('ciao mondo ^-^')

//VARIABILI

const nameInput = document.querySelector('#name')
const descriptionInput = document.querySelector('#description')
const brandInput = document.querySelector('#brand')
const imageUrlInput = document.querySelector('#imageUrl')
const priceInput = document.querySelector('#price')
const applyBtn = document.querySelector('#applyBtn')
const tabBody = document.querySelector('#tabBody')

let arrayProducts = []

// LOCAL STORAGE

function saveProd() {
    localStorage.setItem('products', JSON.stringify(arrayProducts))
}

function loadProd() {
    const save = localStorage.getItem('products')

    if (save) {
        const products = JSON.parse(save)
        arrayProducts = products
        arrayProducts.forEach(addToList)
    }
}

loadProd()

// READ 

async function readProducts() {
    try {
        const response = await fetch(
            'https://striveschool-api.herokuapp.com/api/product',
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A"
                }
            }
        );
        const products = await response.json();

        arrayProducts = products;
        tabBody.innerHTML = "";
        arrayProducts.forEach(addToList);
        saveProd();
    } catch (error) {
        console.error("Errore nella READ:", error);
    }
}
readProducts()


// DELETE









applyBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const body = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    };

    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product', {

            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A".

                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            method: 'POST'

        });
        const prodottoCreato = await response.json();

        arrayProducts.push(prodottoCreato)
        saveProd()
        addToList(prodottoCreato)
        console.log('prodotto inserito con successo')
    } catch (error) {
        console.error("Errore nella POST:", error);
    }
});



// FUNZIONI

function addToList(product) {
    const trList = document.createElement('tr');

    trList.innerHTML = `
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>
            <button type="button" class="deleteBtn btn btn-danger">
                <i class="bi bi-trash"></i>
            </button>
        </td>
        <td>
            <button type="button" class="modifyBtn btn btn-info">
                <i class="bi bi-pencil-square"></i>
            </button>
        </td>
    `;

    // DELETE: rimuove riga e aggiorna arrayProducts e localStorage
    const deleteBtn = trList.querySelector('.deleteBtn');

    deleteBtn.addEventListener('click', async (event) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api//${product._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A".
                        "Content-Type": "application/json"
                    }

                }
            );
            arrayProducts = arrayProducts.filter((p => p._id !== product._id))
            saveProd();
            trList.remove();
        } catch (error) {
            console.error("Errore nel DELETE:", error)
        }
    });

    tabBody.appendChild(trList);


    //tasto modifica

    const modifyBtn = trList.querySelector('.modifyBtn');
    modifyBtn.addEventListener('click', async (event) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api//${product._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A"
                    }

                }
            );
            const prodottoModificato = await response.json();


        } catch (error) {
            console.error("Errore nel PUT:", error)
        }
    });
}

