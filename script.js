// Funcion que realiza la peticion al api
function getData(ciudad) {
    return new Promise((bien, mal) => {
        const apiKey = '05c7f1b8cd4916c3801bfab2c0a887ac'; // Reemplaza con tu clave de API válida
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                return response.json()
            }
            )
            .then(data => {
                bien(data)
            }
            )
            .catch(error => {
                mal(error)
            }
            )

    })

}


// funcion que muestra la informacion al HTML
function domData(data) {
    try {
        const container = document.getElementById("container")
        container.innerHTML = "";

        const title = document.createElement("h1")
        title.textContent = data.name

        const description = document.createElement("p")
        const descrition_data = data.weather.map((item)=>item.description)
        description.textContent = descrition_data

        const img = document.createElement("img")
        const img_data = data.weather.map((item)=>item.icon)
        img.src = `http://openweathermap.org/img/w/${img_data}.png`
        img.width = "100"
        img.height = "100"

        container.appendChild(title)
        container.appendChild(description)
        container.appendChild(img)
        
    } catch (error) {
        console.log(error);
    }
}

// Funcion de inicio
async function ShowData() {
    try {
        const data = await getData("Santiago, Chile")
        domData(data)
    } catch (error) {
        console.log("Error:", error);
    }
    
}

ShowData()