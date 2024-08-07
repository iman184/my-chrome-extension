let myLeads = []; 
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn");


if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads);
}

tabBtn.addEventListener("click",function () {
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads);
    })
})

function render(leads) {
let listItems = "";
    for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target='_blank' href= ${leads[i]}> ${leads[i]} </a> 
    <button class='edit-btn' onclick=editLead(${i})>EDIT</button> </li>`;  
    }
ulEl.innerHTML =listItems
}

deleteBtn.addEventListener("dblclick",function(){
 if (confirm("Are you sure you want to delete all leads?")) {
    localStorage.clear();
    myLeads = []
    render(myLeads)
 }  
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value=""; 
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
})

function editLead(index) {
    const newLead = prompt("Edit the lead :",myLeads[index]);
    if(newLead !== null){
        myLeads[index] = newLead;
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    }
}