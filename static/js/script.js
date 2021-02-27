const timer = ms => new Promise(res => setTimeout(res, ms))
let MARKET_OPEN = false;
var myVar = setInterval(display_allstocks, 5*60000);

function load_data(){
        display_timeanddate();
        display_allstocks();
        display_weather();
}

function display_c(){
        var refresh=1000; // Refresh rate in milli seconds
        mytime=setTimeout('display_timeanddate()',refresh);
}

function display_timeanddate() {
        var myDate = new Date();
        var myMonth = myDate.getMonth();
        var myDay = myDate.getDay();
        var myDayDate = myDate.getDate();
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        
        // Array of days. 
        var weekday = ['Sunday', 'Monday', 'Tuesday', 
            'Wednesday', 'Thursday', 'Friday', 'Saturday' 
        ];
        var month = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        var currWeekday = weekday[myDay]
        var currMonth = month[myMonth]

        //Check if market is open
        if(myDay > 0 & myDay < 6){
                //time zone bug
                if(hours > 8 & hours < 15){//hours >= 8 & hours < 10
                        MARKET_OPEN=true;
                        // console.log("Market is OPEN")
                }
                else{
                        
                        clearInterval(myVar);
                        // console.log("Market is closed")
                }
        }
        else{
                clearInterval(myVar);
                // console.log("Market is closed")
        }
        
        // get hour value.
        var ampm = hours >= 12 ? 'PM' : 'AM'; 
        hours = hours % 12; 
        hours = hours ? hours : 12; 
         
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        var myTime = hours + ":" + minutes;

        document.getElementById('time').innerHTML = myTime;
        document.getElementById('ampm').innerHTML = ampm;
        // console.log(myDate)
        document.getElementById('day').innerHTML = currWeekday + " " + currMonth + " " + myDayDate;
        // display_c();
}

var forEach = async function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
          await timer(1000);
        }
};

function display_allstocks(){
        console.log("##Getting Stock Prices##")
        var myNodeList = document.getElementById("stocks").querySelectorAll(".stock");

        forEach(myNodeList, function (index, value){
                // console.log(IEX_DEBUG_API_KEY)
                url = "https://cloud.iexapis.com/stable/stock/"+value.childNodes[1].innerHTML+"/quote?displayPercent=true&token=" + IEX_DEBUG_API_KEY
                fetch(url)
                        .then(response => response.json())
                        .then(function(data){
                                // console.log(data)
                                // console.log(value.childNodes[1].innerHTML)
                                latestPrice = data["latestPrice"];
                                changePercent = Math.round((data["changePercent"] + Number.EPSILON) * 100) / 100;
                                value.childNodes[3].innerHTML = "$"+latestPrice;
                                value.childNodes[5].lastElementChild.innerHTML = changePercent + "%";
                                console.log(value);
                                if (changePercent > 0){
                                        value.className = "stock positivePercent";
                                        value.childNodes[5].firstElementChild.className = "arrow rotate90";
                                }
                                else{
                                        value.className = "stock negativePercent";
                                        value.childNodes[5].firstElementChild.className = "arrow";
                                }
                        }
                );
                // console.log(IEX_DEBUG_API_KEY);
                // console.log(index, value); // passes index + value back!
        });
}

function display_w(){
        var refresh=5*6000; // Refresh rate in milli seconds
        mytime=setTimeout('display_weather()',refresh);
}

function display_weather() {
        latitude = 30.622370
        longitude = -96.325851
        url = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+WEATHER_API_KEY
        fetch(url)
                        .then(response => response.json())
                        .then(function(data){
                                console.log(data);
                                document.getElementById('currentweather').innerHTML = data["current"]["temp"]+"°";
                                // day0 = data["daily"][0]["temp"]["day"]+"°";
                                // day1 = data["daily"][1]["temp"]["day"]+"°";
                                // document.getElementById('weekweather').innerHTML = day0 + " " + day1;
                                document.getElementById('weathericon').className = "owf owf-"+data["current"]["weather"][0]["id"]+" owf-5x"
                        }
                );
        display_w();
}