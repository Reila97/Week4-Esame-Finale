const params = new URLSearchParams(window.location.search);
console.log(params)
const prodId = params.get('id')

const detailContainer = document.querySelector('#detailContainer')



fetch("https://striveschool-api.herokuapp.com/api/product/" + prodId, {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiNGEyYjQwMTRhZjAwMTVmMGM1NjAiLCJpYXQiOjE3Njk0NjIwMDQsImV4cCI6MTc3MDY3MTYwNH0.d3NY2TX5RXE3ivlAF9hE304tVCaGi6PVb9dYzv2rH0A"
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const product = data
        detailContainer.innerHTML += `
        <div class="col">
                <div class="card">
                    <img src=" ${data.imageUrl} " class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ${data.brand} </h5>
                            <h3 class="card-title"> ${data.name} </h3>
                            <p class="card-text"> ${data.description} </p>
                            <p class="card-text"> ${data.price} </p>
                            <a href="Detail.html?id=${data._id}" class="btn btn-primary">Details</a>
                        </div>
                </div>
            </div>
            
            
        `
    })



