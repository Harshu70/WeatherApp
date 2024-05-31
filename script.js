const val = document.querySelector(".val")
const desc = document.querySelector(".nam")
const img1 = document.querySelector("#img1")
const img2 = document.querySelector("#img2")
const img3 = document.querySelector("#img3")
const img4 = document.querySelector("#img4")
const img5 = document.querySelector("#img5")
const logo = document.querySelector(".logo")
const temperature = parseInt(val.textContent)

const feel = document.querySelector("#feel")
const min = document.querySelector("#min")
const max = document.querySelector("#max")
const humii = document.querySelector("#humii")
const press = document.querySelector("#press")
const windi = document.querySelector("#wind")
const rise = document.querySelector("#rise")
const sett = document.querySelector("#sett")
const visa = document.querySelector("#visi")


function convertTime(val){
    let date = new Date(val*1000);
    let hr = date.getHours();
    let min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    return (hr+':'+min);
}

const btn =  document.querySelector("#add")

apik = "719f08e8f4f2f05568e2cabd4514cdb9"
var inputCity = document.querySelector("#cityInput")

function convert(temp){
    return (temp-273).toFixed(0)
}


img1.style.opacity = 1

btn.addEventListener("click", function()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputCity.value+'&appid='+apik)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        var name = data['name']
        var temperature = data['main']['temp']
        var descrip = data['weather'][0]['description']
        var feelsLike = data['main']['feels_like']
        var maxTemp = data['main']['temp_max']
        var minTemp = data['main']['temp_min']
        var humidity = data['main']['humidity']
        var pressure = data['main']['pressure']
        var wind = data['wind']['speed']
        var sunrise = data['sys']['sunrise']
        var sunset = data['sys']['sunset']
        var visi = data['visibility']
        var country = data['sys']['country']
        logo.innerHTML = `${name}, <span>${country}</span>`
        val.innerHTML = `${convert(temperature)}&deg;C`
        desc.innerHTML = descrip

        feel.innerHTML = `Feels-Like - ${convert(feelsLike)}&deg;C`
        min.innerHTML = `Min-Temperature - ${convert(minTemp)}&deg;C`
        max.innerHTML = `Max-Temperature - ${convert(maxTemp)}&deg;C`
        humii.innerHTML = `Humidity - ${humidity}%`
        press.innerHTML = `Pressure - ${pressure} Pa`
        windi.innerHTML = `Wind - ${(wind*3.6).toFixed(0)} Km/hr`
        rise.innerHTML = `Sun-rise - ${convertTime(sunrise)} am`
        sett.innerHTML = `Sun-set - ${convertTime(sunset)} pm`
        visa.innerHTML = `Visibility - ${visi/1000} Km`
        

        if (convert(temperature)>43) {
            img5.style.opacity = 0
            img4.style.opacity = 1
            img1.style.opacity = 0
            img2.style.opacity = 0
            img3.style.opacity = 0
        }else if (descrip == 'mist') {
            img5.style.opacity = 1
            img4.style.opacity = 0
            img1.style.opacity = 0
            img2.style.opacity = 0
            img3.style.opacity = 0
        } else if(descrip == 'scattered clouds'){
            img2.style.opacity = 0
            img5.style.opacity = 0
            img1.style.opacity = 1
            img4.style.opacity = 0
            img3.style.opacity = 0
        } else if(descrip == 'light rain' || descrip == 'rain'){
            img4.style.opacity = 0
            img1.style.opacity = 0
            img5.style.opacity = 0
            img2.style.opacity = 0
            img3.style.opacity = 1
        } else{
            img4.style.opacity = 0
            img1.style.opacity = 0
            img5.style.opacity = 0
            img2.style.opacity = 1
            img3.style.opacity = 0
        }
    })
    .catch((err)=>{
        alert("Enter a valid city!")
    })
})

