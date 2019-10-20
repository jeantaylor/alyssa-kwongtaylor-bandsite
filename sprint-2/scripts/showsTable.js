function makeTable (targetTable, schedule) {
    targetTable.classList.add("shows__table"); 
    for (let show of schedule) { // Make 6
        let row = targetTable.insertRow(); // Inserts <tr> into HTML
        for (let key in show) { // Make 3
            let cell = row.insertCell(); // Inserts <td> in <tr> 
            let text = document.createTextNode(show[key]); //Creates #text Node
            cell.appendChild(text); 
            cell.classList.add("shows__table-content"); 
        } 
        let cell = row.insertCell(); // Inserts 1 additional <td> per row for btn to sit
        cell.classList.add("shows__table-content");
        let btn = document.createElement("button"); 
        btn.textContent = "Buy Tickets"; 
        btn.classList.add("shows__cta"); 
        cell.appendChild(btn); 

    }
}

function makeTableHead (targetTable, schedule) {
    let scheduleKeys = Object.keys(schedule[0]); 
    let tHead = table.createTHead(); // Creates TH Node 
    tHead.classList.add("shows__table-header"); 
    let row = tHead.insertRow(); 
    for (let key of scheduleKeys) {
        let th = document.createElement("th"); 
        let text = document.createTextNode(key); 
        th.appendChild(text); 
        row.appendChild(th); 
    }
}

function makeTableMobile (targetTable, schedule) {
    targetTable.classList.add("shows__table"); 
    let scheduleKeys = Object.keys(schedule[0]); 
    let row = targetTable.insertRow(); // Inserts 1 row
    row.classList.add("shows__table--mobile"); 
    for (show of schedule) {
        let cell = row.insertCell(); 
        cell.classList.add("shows__table-show"); 
        for (i = 0; i < 3; i++) {
            //console.log(show, i)
            let header = document.createElement('div'); 
            let text = document.createTextNode(scheduleKeys[i]); 
            //console.log(header); 
            //console.log(text); 
            header.appendChild(text);
            cell.appendChild(header);  
            header.classList.add("shows__table-header"); 

            let content = document.createElement('div'); 
            text = document.createTextNode(Object.values(show)[i]); 
            //console.log(content); 
            //console.log(text); 
            content.appendChild(text); 
            cell.appendChild(content); 
            content.classList.add("shows__table-content"); 
        }
        let btn = document.createElement("button");
        btn.textContent = "Buy Tickets"; 
        btn.classList.add("shows__cta");
        cell.appendChild(btn);
    }
}

const showTimes = [
    {Dates: "Mon Dec 17 2018", Venue: "Ronald Lane", Location: "San Francisco, CA"},
    {Dates: "Tue Jul 18 2019", Venue: "Pier 3 East", Location: "San Francisco, CA"},
    {Dates: "Fri Jul 22 2019", Venue: "View Lounge", Location: "San Francisco, CA"},
    {Dates: "Wed Aug 11 2019", Venue: "Pres Club", Location: "San Francisco, CA"},
    {Dates: "Sa Aug 12 2019", Venue: "Hyatt Agency", Location: "San Francisco, CA"},
    {Dates: "Fri Sep 05 2019", Venue: "Moscow Center", Location: "San Francisco, CA"} 
]

const table = document.querySelector("table"); 
const tableMediaQuery = window.matchMedia("(min-width: 768px)"); 

if (tableMediaQuery.matches) {
    makeTable(table, showTimes); 
    makeTableHead (table, showTimes);
} else {
    makeTableMobile(table, showTimes); 
}

