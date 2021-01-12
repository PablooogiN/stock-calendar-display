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