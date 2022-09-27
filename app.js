const selectCountry = (name) => {
    const url = `https://restcountries.com/v3.1/all`
    fetch(url).then((res) => {
        if (!res.ok) {
            renderError(`Something went wrong: ${res.status}`)
            throw new Error()
        }
        return res.json()

    }).then((data) => renderCountries(data)).catch((err) => console.log(err))


}

const renderError = () => {
    const countryDiv = document.querySelector(".countries")
    countryDiv.innerHTML += `<h2>Countries can not fetched</h2>`
}


const renderCountries = (data) => {
    console.log(data)
    const formSelect = document.querySelector(".form-select")
    data.sort().forEach((item) => {
        formSelect.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`
    })

    formSelect.addEventListener("change", (e) => {
        data.filter((data) => {

            const {
                capital,
                currencies,
                flags: {
                    svg
                },
                languages,
                name: {
                    common
                },
                region,
                maps: {
                    googleMaps
                },
                population
            } = data
            if (e.target.value === common) {
                const countryDiv = document.querySelector(".countries")
                countryDiv.innerHTML = `
<div class="card mx-auto m-4 shadow-lg" style="width:18rem;">
  <img src="${svg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <i class="fas fa-lg fa-landmark"></i> ${capital}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-money-bill-wave"></i>
      ${Object.values(currencies).map((item) => Object.values(item) + " ")}
    </li>
    <li class = "list-group-item" >
     <i class = "fa-solid fa-person"></i><i class = "fa-solid fa-person-dress"></i>  ${population}
    </li>
    <a href = "${googleMaps}" class="text-center justify-content-center" >
    <button class = "btn btn-primary rounded my-2"><i class = "fa-solid fa-map"></i> Maps </button>
    </a>
    </ul>
</div>`;

            }
        })
    })

}
window.addEventListener("load", selectCountry)
