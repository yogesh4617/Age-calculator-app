let dayInp = document.getElementById("day");
let monthInp = document.getElementById("month");
let yearInp = document.getElementById("year");
const form = document.querySelector("form");

let submited_d = false;
let submited_m = false;
let submited_y = false;

const date = new Date();
let day = date.getDate();
let month = 1+ date.getMonth();
let year = date.getFullYear();

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function checkday(ycallback1) {
    let tday = Number(dayInp.value);

    // Check if the day is valid
    if (tday > 0 && tday <= 31) {
        console.log("valid day");
        normalclr();
        document.querySelector(".error1").innerText = "";

        // Call the callback function if it exists and month input is not empty
        if (typeof ycallback1 === "function" && monthInp.value.trim() !== "") {
            ycallback1();
        }

        submited_d = true;
    } else {
        submited_d = false;

        if (dayInp.value.trim() === "") {
            console.log("day input is empty");
            normalclr();
            document.querySelector(".error1").innerText = "";
        } else {
            errorclr();
            document.querySelector(".error1").innerText = "must be a valid day";
        }
    }
}

function checkmonth(Ycallback){
    let tmonth = Number (monthInp.value);
    let tday = Number(dayInp.value);
    let tyear = Number (yearInp.value);
    if((Ycallback) && monthInp.value.trim() !=="") Ycallback();
    if(tmonth > 0 && tmonth <= 12){
        console.log("validm");
        if([1, 3, 5, 7, 8, 10, 12].includes(tmonth)){
            if(tday > 0 && tday <= 31){
                console.log("mvalid1");
                normalclr();
                submited_m = true;
                document.querySelector(".error1").innerText="";
                document.querySelector(".error2").innerText="";
           }
           else{
            errorclr();
            document.querySelector(".error1").innerText="must be a valid date";
           }
        }
        else if([4, 6, 9, 11].includes(tmonth)){
            if(tday > 0 && tday <= 30){
                console.log("mvalid2");
                normalclr();
                submited_m = true;
                document.querySelector(".error1").innerText="";
                document.querySelector(".error2").innerText="";
           }
           else{
            errorclr();
            if(tday > 0 && tday <= 31){
                document.querySelector(".error1").innerText="must be a valid date";
            }
            else{
                document.querySelector(".error1").innerText="must be a valid day";
            }
           }
        }
        else if(2 === tmonth){
            if ((isLeapYear(tyear) && tday <= 29) || (!isLeapYear(tyear) && tday <= 28)) {
                console.log("mvalid3");
                normalclr();
                submited_m = true;
                document.querySelector(".error2").innerText = "";
                document.querySelector(".error1").innerText = "";
            } else {
                errorclr();
                submited_m = false;
                if(tday > 0 && tday <= 31){
                    console.log("mok1");
                    document.querySelector(".error1").innerText="must be a valid date";
                    submited_m = true;
                }
                else{
                    console.log("mok2");
                    document.querySelector(".error1").innerText="must be a valid day";
                }
            }
        }
   }
   else{
    submited_m = false;
    if(monthInp.value.trim() ==""){
        normalclr();
        document.querySelector(".error2").innerText="";
        document.querySelector(".error1").innerText="";
    }else{
        errorclr();
        document.querySelector(".error2").innerText="must be a valid month";}
   }
}
function checkyear(callback1,callback2){
    if((callback2,callback1) && monthInp.value.trim() !=="") callback2(),callback1();
    let tyear = Number (yearInp.value);
    let tmonth = Number (monthInp.value);
    let tday = Number (dayInp.value);
    if(tyear > 1920 && tyear <= year){
        if( tyear === year){
            console.log("yvalidy3");
            if (tmonth <= month) {
                if(tday <= date.getDate()){
                console.log("yvalidy1");
                normalclr();
                document.querySelector(".error3").innerText = "";
                submited_y = true;
                return;
                }
                else{
                    submited_y = false;
                    return;
                }
            }
            else {
                console.log("yinvalid");
                submited_y = false;
                return;
            }
        }
        else{
            console.log("yvalidy2");
            normalclr();
            document.querySelector(".error3").innerText="";
            submited_y = true;
            return;
        }
   }
   else{
    if(yearInp.value.trim() =="" ){
        console.log("ok1");
        normalclr();
        document.querySelector(".error3").innerText="";
    }
    else{errorclr();
    document.querySelector(".error3").innerText="must be a valid ye1r";}
    submited_y = false;
    return;
   }
}
function agecalc(d,m,y){
    let retnd = day - d;
    let retnm = month - m;
    let retny = year - y;
    const adjustments = [
        {   // Adjust months if negative
            condition: () => retnm < 0,
            adjust: () => {
                retny--;
                retnm += 12;
            },
        },
        {   // Get last day of the previous month
            condition: () => retnd < 0,
            adjust: () => {
                retnm--;
                const lastMonth = new Date(year, month - 1, 0);
                retnd += lastMonth.getDate();
            },
        },
        {   // Handle edge cases for months again after borrowing
            condition: () => retnm < 0,
            adjust: () => {
                retny--;
                retnm += 12;
            },
        },
    ];
    // Use forEach to apply the adjustments
    adjustments.forEach(({ condition, adjust }) => {
        if (condition()) {
            adjust();
        }
    });
    // Update the DOM with the calculated values
    document.querySelector("#DD").innerText = retnd;
    document.querySelector("#MM").innerText = retnm;
    document.querySelector("#YY").innerText = retny;
}
function submitbtn(event){
    event.preventDefault();
    let tday = Number(dayInp.value);
    let tmonth = Number(monthInp.value);
    let tyear = Number (yearInp.value);
    console.log("click");
    if(submited_d && submited_m && submited_y){
        if(tmonth === 2){
            const leapYear = isLeapYear(tyear);
            if(!leapYear && tday > 28){
                errorclr();
                document.querySelector(".error1").innerText="must be a valid date";
                document.querySelector(".error2").innerText="must be a valid date";
                document.querySelector(".error3").innerText="must be a valid date";
            }    
            else{
                normalclr();
                agecalc(tday,tmonth,tyear);    
                document.querySelector(".error1").innerText="";
                document.querySelector(".error2").innerText="";
                document.querySelector(".error3").innerText="";
            }  
        }else{
            normalclr();
            agecalc(tday,tmonth,tyear);    
            document.querySelector(".error1").innerText="";
            document.querySelector(".error2").innerText="";
            document.querySelector(".error3").innerText="";
        }  
       
    }
    else{
        if(!submited_y && monthInp.value.trim !==""){
            errorclr();
            document.querySelector(".error3").innerText="must be a valide past";
        }
        console.log("ok3");
        errorclr();
        const inputs = [
            { submited_d, value: dayInp.value.trim(), errorSelector: ".error1" },
            { submitted: submited_m, value: monthInp.value.trim(), errorSelector: ".error2" },
            { submitted: submited_y, value: yearInp.value.trim(), errorSelector: ".error3" },
        ];
        
        inputs.forEach(({ submitted, value, errorSelector }) => {
            if (!submitted && value === "") {
                document.querySelector(errorSelector).innerText = "This field is required";
            }
        }); 
    }
}
function errorclr(){
    let error = document.querySelectorAll(".block");
    let box = document.querySelectorAll("input");
    error.forEach((element)=>{
        element.style.color='hsl(0, 100%, 67%)';
    });
    box.forEach((element)=>{
        element.style.borderColor='hsl(0, 100%, 67%)';
    });
}
function normalclr(){
    let error = document.querySelectorAll(".block");
    let box = document.querySelectorAll("input");
    error.forEach((element)=>{
        element.style.color=' hsl(0, 1%, 44%)';
    });
    box.forEach((element)=>{
        element.style.borderColor='hsl(0, 1%, 44%)';
    });
}

dayInp.addEventListener("input",()=>checkday(checkyear));
monthInp.addEventListener("input",()=>checkmonth(checkyear));
yearInp.addEventListener("input",()=>checkyear(checkday,checkmonth));
form.addEventListener("submit",submitbtn);