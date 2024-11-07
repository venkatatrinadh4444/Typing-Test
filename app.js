let quoteDisplayEl=document.getElementById('quoteDisplay')
let timerEl=document.getElementById('timer')
let resultEl=document.getElementById('result')
let quoteInputEl=document.getElementById('quoteInput')
let submitBtn=document.getElementById('submitBtn')
let resetBtn=document.getElementById('resetBtn')
let spinnerEl=document.getElementById('spinner')

let targetData={
    text:''
}

function fetchingData(){
spinnerEl.classList.toggle('d-none')
fetch('https://apis.ccbp.in/random-quote')
.then(response=>response.json())
.then(jsonData=>{
    spinnerEl.classList.toggle('d-none')
    targetData.text=jsonData.content;
    quoteDisplayEl.textContent=targetData.text;
})
}
fetchingData()

let countDown=0;
let timeInterval=setInterval(()=>{
    countDown+=1;
    timerEl.textContent=countDown
},1000)

submitBtn.onclick=function(){
    let {text}=targetData;
    let userValue=quoteInputEl.value
    if(text===userValue){
        clearInterval(timeInterval)
        resultEl.textContent="You typed in "+countDown+" seconds";
    }
    else {
        resultEl.textContent="You typed incorrect sentence"
        quoteInputEl.addEventListener('focus',(e)=>{
            resultEl.textContent=""
        })
    }
}

resetBtn.onclick=function(){
    fetchingData()
    countDown=0;
    timerEl.textContent=countDown;
    quoteInputEl.value=''
    resultEl.textContent=''
}