const dropdowns=document.querySelectorAll(".dropDown select");
const btn = document.querySelector('form button')
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector('.to select')
const msg = document.querySelector(".msg")
const mode=document.querySelector("#btn")
    

let currMode="lightMode";

mode.addEventListener("click",()=>{
    let bg= document.querySelector(".container");
    bg.classList.toggle("darkMode");
    bg.classList.toggle("lightMode");
    currMode= currMode==="lightMode"?"darkMode":"lightMode";
})


for(let select of dropdowns){
    for(let currCode in countryList){
         let newOption =document.createElement("option");
         newOption.innerText=currCode;
         newOption.value=currCode;
         if(select.name === "from" && currCode==="USD"){
            newOption.selected="selected";
         } else if(select.name === "to" && currCode==="INR"){
            newOption.selected="selected";
         }
         select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    })
};


async function fetchAndConvertCurrency(amount, fromCurrency, toCurrency) {
    try {
        // console.log("umesh",amount, fromCurrency, toCurrency)
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_uHWVHAalMR2cAXDGUsIPHF0MPkHGddcMkGX7e9WE`);
        let data = await response.json();
        data = data.data
        console.log(data)
        if ( !data || !data[fromCurrency] || !data[toCurrency]) {
            console.error('Invalid currency conversion');
            return null;
        }
        const rate = data[toCurrency] / data[fromCurrency];
        const convertedAmount = amount * rate;
        msg.innerText=`RESULT = ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        return convertedAmount;
        
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        return null;
    }

    
    
}


const updateExchange =() =>{
    let amount =document.querySelector("form input");
    let amtVal =amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amount.value="1";
    }

    fetchAndConvertCurrency(amtVal, fromCurr.value,toCurr.value)
    

};


const updateFlag = (element) =>{
    // console.log(element)
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchange();

});





