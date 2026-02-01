console.log('ciao mondo ^-^')

//VARIABILI


const page = document.querySelectorAll('.page')
const links = document.querySelectorAll('.offcanvas .nav-link')
const cardContainer = document.querySelector('#cardContainer')
const datailContainer = document.querySelector('#datailContainer')


// fetch per la pagina principale

fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A"
    }
})
    .then(res => res.json())
    .then(data => {
        const card = data.map(product => `

            <div class="col">
                <div class="card">
                    <img src=" ${product.imageUrl} " class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ${product.brand} </h5>
                            <h3 class="card-title"> ${product.name} </h3>
                            <p class="card-text"> ${product.description} </p>
                            <p class="card-text"> ${product.price} </p>
                            <a href="/Detail.html?id=${product._id}" class="btn btn-primary">Details</a>
                        </div>
                </div>
            </div>
        `)
        cardContainer.innerHTML = card.join(' ')
    })




