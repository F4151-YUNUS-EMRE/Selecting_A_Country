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
    // console.log(data)
    const formSelect = document.querySelector(".form-select")
    data.forEach((item) => {
        formSelect.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`
    })

    formSelect.addEventListener("change", (e) => {
        write(e.target.value, data);
    })
}

const write = (value, data) => {

    //   console.log(data[0].name.common);

    let countryName = data.filter((item) => {
        if (item.name.common == value) {
            return item.name.common
        }

    })

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
        region
    } = countryName[0]

    const countryDiv = document.querySelector(".countries")
    countryDiv.innerHTML = `
    <div class="card mx-auto m-3 shadow-lg" style="width:18rem;">
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
      </ul>
    </div>`;
}




window.addEventListener("load", selectCountry)