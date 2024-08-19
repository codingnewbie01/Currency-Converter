const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropDowns=document.querySelectorAll(".dropdown select");
console.log(dropDowns);
// console.log(typeof dropDowns);


for (const s of dropDowns) {
    console.log(s);
}


const btn=document.querySelector("form button");

let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");



// --------------importing currency-------------

for (let select of dropDowns) {
    // console.log(select);
    for (let currCode in countryList) {
        let newOption =document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e)=>{
        updateFlag(e.target);
    })
}


// --------------Flag Update-------------

const updateFlag =(e)=>{
    // console.log(e.value);
    let currCode = e.value;
    
    let countryCode=countryList[currCode];
    // console.log(currCode, countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= e.parentElement.querySelector("img");
    img.src=newSrc;   
}


// --------------Get Exchange Rate-------------

const getRate= async (e)=>{
    let amount= document.querySelector(".amount input");
    let amtVal=amount.value;
    
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    
    // console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    
    const url=`${baseURL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    // console.log(response);
    let data= await response.json();

    let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    // console.log(rate);

    let finalAmount=amtVal*rate;

    // console.log(finalAmount);
    // console.log(fromCurr, toCurr.value);
    
    msg.innerText=`${amtVal}${fromCurr.value} =${finalAmount}${toCurr.value}`;
    

    // console.log(response.json());
}

btn.addEventListener("click", (e)=>{
    e.preventDefault();   
    getRate(); 
})

window.addEventListener("load", (e)=>{
    getRate(); 
})
