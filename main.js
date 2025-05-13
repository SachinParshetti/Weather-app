document.addEventListener("DOMContentLoaded",function(){
   var cityName = '';
        var sky;
        bodyload();
        function LoadWeatherData() {
            var api_key = "f665cf1a2aebe7c5c7c635e95e775760";
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    document.getElementById('Temp').innerHTML = `<div> <i class=" bi bi-brightness-high text-center ms-3  text-white" style="font-size:50px; " id="icons"></i> <span class="fs-2 text-white text-end float-end  mt-0 mb-0 d-inline-block " style="height:90%;"> ${Math.round(data.main.temp)} &deg;C <br>${data.name}</span> </div>`;
                    document.getElementById('tempMax').innerHTML = `<span class='fs-5  text-white'> ${data.main.temp_max} &deg;C <br>Max Temp</span>`;
                    document.getElementById('tempMin').innerHTML = `<span class='fs-5  text-white'> ${data.main.temp_min} &deg;C <br>Min Temp</span>`;
                    document.getElementById('feelslike').innerHTML = `<span class='fs-4 text-white '> ${data.main.feels_like} &deg;C <br> <span class='fs-'>Feels like </span></span>`;
                    document.getElementById('description').innerHTML = `<span class='fs-4 text-white '> ${data.weather[0].description.toUpperCase()} <br> <span class='fs- ms-4'>Sky </span></span>`;
                    document.getElementById('humidity').innerHTML = `<span class='fs-4 text-white'>${data.main.humidity}% <br> <span style="font-size:18px;"> Humidity </span></span>`;
                    document.getElementById('visibility').innerHTML = `<span class='fs-4 text-white'>${data.visibility}<sub>m</sub> <br> <span style="font-size:18px;"> Visibility </span></span>`;
                    document.getElementById('wind').innerHTML = `<span class='fs-4 text-white'>${data.wind.speed}<sub>Kmph</sub> <br> <span style="font-size:18px;"> Wind Speed </span></span>`;
                    document.getElementById('pressure').innerHTML = `<span class='fs-4 text-white'>${data.main.pressure}<sub>hPa</sub> <br> <span style="font-size:18px;"> Pressure </span></span>`;
                    document.getElementById('groundlevel').innerHTML = `<span class='fs- text-white'> ${data.main.grnd_level}<sub>m</sub><br> Ground Level</span>`;
                    document.getElementById('sealevel').innerHTML = `<span class=' text-white'>  ${data.main.sea_level}<sub>m</sub> <br> Sea Level</span>`;
                    sky = data.weather[0].main.toLowerCase();
                    UpdateBackground()
                 
                }) 
        }
      
        function UpdateBackground()
        {       
           var bg = document.getElementById('container')
            if (sky === 'clouds')
           {  
            bg.style.backgroundImage ="url('Public/Images/cloudy2.jpg')";

           }
           else if ( sky === 'clear')
           {
            bg.style.backgroundImage ="url('Public/Images/clear-sky.jpg')"; 
            
           }
           else if (sky === 'rain')
          {
            bg.style.backgroundImage ="url('Public/Images/rainey-sky.jpg')"; 
          }

          else if (sky === 'haze')
          {
            bg.style.backgroundImage ="url('Public/Images/haze.jpg')";
          }
          else if (sky === 'smoke')
          {
             bg.style.backgroundImage = "url('Public/Images/smokey-sky.jpg')";
          }
          else{
            bg.style.backgroundImage = "url('Public/Images/clear-sky2.jpg')"
          }
        }

        function SearchClick() {
            cityName = document.getElementById('search').value.toLowerCase();
            LoadWeatherData();
           
        }

        document.getElementById("btn-Search").addEventListener("click",function(){
        console.log("Search btn clicked");
        SearchClick();
        })
        function SelectClick() {
            cityName = document.getElementById('frequentcities').value;
            LoadWeatherData();
            document.getElementById('search').value = '';
        }

        document.getElementById('frequentcities').addEventListener("change",function(){
            SelectClick()
        })
     
       
        function bodyload() {
            var time = new Date();
            document.getElementById("date").innerHTML = `<span class=" fs-5 text-white m-2">${time.toDateString()}</span>`
            var msg = document.getElementById('msg');
            var hours = time.getHours();
            var minutes = time.getMinutes();      
            var ampm = hours >= 12 ? 'PM' : "AM";
            document.getElementById("time").innerHTML = `<span class=" fs-5 text-white mx-2">${hours}:${minutes} ${ampm}</span>`
            if (hours >= 0 && hours < 12) {
                msg.innerHTML = "<span class='fs-5 text-white'> <i class='bi bi-cloud-sun-fill fs-5  text-warning'></i> Good Morning !</span>";
                document.getElementById("icons").className = 'bi bi-cloud-sun-fill text-warning';
            }
            
            else if (hours >= 12 && hours <= 17) {
       
                msg.innerHTML = "<span class='fs-3 text-white'> <i class='bi bi-brightness-high fs-2  text-warning'></i> Good Afternoon !</span>";
                
                //  document.getElementById("icons").className = 'bi bi-brightness-high text-warning';
               
            }
            else {
                msg.innerHTML = "<span class='fs-3 text-white'> <i class='bi bi-brightness-low-fill fs-2 '></i> Good Evening !</span>";
              //  document.getElementById('icons').className = 'bi bi-brightness-low text-dark';

            }
        }

        function Enter(e)
        {
           if(e.key === "Enter")
           {
            cityName = document.getElementById('search').value.toLowerCase();
            LoadWeatherData();
           }
        }
      document.getElementById("search").addEventListener("keydown",function(e){
        if(e.key === "Enter")
        {console.log("Enter pressed")}
        Enter(e)
      })
       
});
