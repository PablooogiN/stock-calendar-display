function load_data(){
        display_timeanddate();
        display_allstocks();
}

function display_c(){
        var refresh=1000; // Refresh rate in milli seconds
        mytime=setTimeout('display_timeanddate()',refresh);
}

function display_timeanddate() {
        var x = new Date()
        
        var myDate = new Date(); 
        var myDay = myDate.getDay(); 
        
        // Array of days. 
        var weekday = ['Sunday', 'Monday', 'Tuesday', 
            'Wednesday', 'Thursday', 'Friday', 'Saturday' 
        ];
        var currWeekday = weekday[myDay]
        
        // get hour value. 
        var hours = myDate.getHours(); 
        var ampm = hours >= 12 ? 'PM' : 'AM'; 
        hours = hours % 12; 
        hours = hours ? hours : 12; 
        var minutes = myDate.getMinutes(); 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        var myTime = hours + ":" + minutes + " " + ampm;

        document.getElementById('time').innerHTML = myTime;
        document.getElementById('day').innerHTML = currWeekday; 
        display_c();
}

function display_s(){
        var refresh=5*60000;
        mytime=setTimeout('display_allstocks()',refresh);
}

const timer = ms => new Promise(res => setTimeout(res, ms))

var forEach = async function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
          await timer(1000);
        }
};

function display_allstocks(){
        console.log("##Calling Stock API##")
        var myNodeList = document.getElementById("stocks").querySelectorAll(".stock");

        forEach(myNodeList, function (index, value){
                url = "https://sandbox.iexapis.com/stable/stock/"+value.childNodes[1].innerHTML+"/quote?displayPercent=true&token=Tpk_29f6842dac974217b52fc6e42ddfb6f0"
                fetch(url)
                        .then(response => response.json())
                        .then(function(data){
                                console.log(data)
                                // console.log(value.childNodes[1].innerHTML)
                                latestPrice = data["latestPrice"];
                                changePercent = data["changePercent"];
                                value.childNodes[3].innerHTML = latestPrice;
                                value.childNodes[5].innerHTML = changePercent + "%";
                                if (changePercent > 0){
                                        value.className = "stock positivePercent";
                                }
                                else{
                                        value.className = "stock negativePercent";
                                }
                        }
                );
                // console.log(index, value); // passes index + value back!
        });

        display_s();
}