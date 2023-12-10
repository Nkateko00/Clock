const currentTime = document.querySelector("h1");
const setAlarmbtn = document.querySelector("button");
content = document.querySelector(".content")
selectMenu = document.querySelectorAll("select");
dateTime = document.querySelector(".dateTime");

let alarmTime,isAlarmSet = false;
ringtone = new Audio("morning.wav");

setInterval(() => {

    var now = new Date();
    var dname = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear();

    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    dateTime.innerText = `${[week[dname]]}:${[month[mo]]}:${dnum}:${yr}`;

}, 1);
 
//hours loop
for(let i =12;i > 0; i--){ 
    i = i < 10 ? "0"+ i :i
    let option = `<option value="${i}">${i}</option `; //insert for loop hours in options
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i =59 ;i >= 0; i--){ 
    i = i < 10 ? "0"+ i :i
    let option = `<option value="${i}">${i}</option `; //insert for loop minutes in options
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i =2;i > 0; i--){ 
   let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option `; //insert for loop seconds in options
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";

    if(h >= 12){
        h = h - 12;
        ampm = "PM";
    }
    // when hours is 0 == 12
    h = h == 0 ? h = 12 : h;

    //add zeros to hr,mins,secs if value < 10 

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}: ${m}: ${ampm}`){
        console.log("Alarm Ringing");
        ringtone.play();
        ringtone.loop = true;

    }

   
}, 1000);

function setAlarm(){
    
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable")
        setAlarmbtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }


    let time = `${selectMenu[0].value}: ${selectMenu[1].value}: ${selectMenu[2].value}`

    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        
        return alert("Select valid time to set alarm");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable")
    setAlarmbtn.innerText = "Clear Alarm";
    // console.log(time);

}

setAlarmbtn.addEventListener("click", setAlarm);