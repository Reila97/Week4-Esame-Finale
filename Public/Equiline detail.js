console.log('ciao moondo ^-^')

//VARIABILI
const content = document.querySelector('#content')

fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A"
    }
})
.then(data => {
        const card = data.map(product => `
    <div class="card" >
    <img src="${product.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
    <a href="/product.html?id${product._id}" class="btn btn-primary">Details</a>
    </div>
    </div>`)
        cardContainer.innerHTML = card.join(' ')
    })
