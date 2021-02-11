const timer = ms => new Promise(res => setTimeout(res, ms))
let MARKET_OPEN = false;
var myVar = setInterval(display_s, 5*60000);

function load_data(){
        display_timeanddate();
        display_allstocks();
}

function display_c(){
        var refresh=1000; // Refresh rate in milli seconds
        mytime=setTimeout('display_timeanddate()',refresh);
}

function display_timeanddate() {
        var myDate = new Date(); 
        var myDay = myDate.getDay();
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        
        // Array of days. 
        var weekday = ['Sunday', 'Monday', 'Tuesday', 
            'Wednesday', 'Thursday', 'Friday', 'Saturday' 
        ];
        var currWeekday = weekday[myDay]

        //Check if market is open
        if(myDay > 0 & myDay < 6){
                //time zone bug
                if(hours >= 8 & hours < 10){//hours >= 8 & hours < 10
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
        var myTime = hours + ":" + minutes + " " + ampm;

        document.getElementById('time').innerHTML = myTime;
        document.getElementById('day').innerHTML = currWeekday;
        display_c();
}

function display_s(){
        // var refresh=5*60000;
        // if(MARKET_OPEN){
        //         console.log("Market is open")
        //         mytime=setInterval('display_allstocks()',30000);
        // }
        display_allstocks();
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
                console.log(IEX_DEBUG_API_KEY)
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

        // display_s();
}