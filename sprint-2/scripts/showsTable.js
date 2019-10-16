let showTimes = [
    {Dates: "Mon Dec 17 2018", Venue: "Ronald Lane", Location: "San Francisco, CA"},
    {Dates: "Tue Jul 18 2019", Venue: "Pier 3 East", Location: "San Francisco, CA"},
    {Dates: "Fri Jul 22 2019", Venue: "View Lounge", Location: "San Francisco, CA"},
    {Dates: "W Aug 11 2019", Venue: "Pres Club", Location: "San Francisco, CA"},
    {Dates: "Sa Aug 12 2019", Venue: "Hyatt Agency", Location: "San Francisco, CA"},
    {Dates: "Fri Sep 05 2019", Venue: "Moscow Center", Location: "San Francisco, CA"} 
]

function makeTable (targetTable, schedule) {
    for (let show of schedule) { // Make 6
        let row = targetTable.insertRow(); // Inserts <tr> into HTML
        for (let key in show) { // Make 3
            let cell = row.insertCell(); // Inserts <td> in <tr> 
            let text = document.createTextNode(show[key]); //Creates #text Node
            cell.appendChild(text); 
        } 
        let cell = row.insertCell(); // Inserts 1 additional <td> per row for btn to sit
        let btn = document.createElement("button"); 
        btn.textContent = "Buy Tickets"; 
        cell.appendChild(btn); 

    }
}

function makeTableHead (targetTable, dataKeys) {
    let tHead = table.createTHead(); // Creates TH Node 
    let row = tHead.insertRow(); 
    for (let key of dataKeys) {
        let th = document.createElement("th"); 
        let text = document.createTextNode(key); 
        th.appendChild(text); 
        row.appendChild(th); 
    }
}

function makeTableMobile (targetTable, schedule) {
    let row = targetTable.insertRow(); // Inserts 1 row
    for (show of schedule) {
        let cell = row.insertCell(); 
        for (i = 0; i < schedule.length / 2; i++) {
            let header = document.createElement('div'); 
            let text = document.createTextNode(Object.keys(schedule[i])[i]); 
            header.appendChild(text);
            cell.appendChild(header);  

            let content = document.createElement('div'); 
            text = document.createTextNode(Object.values(schedule[i])[i]); 
            content.appendChild(text); 
            cell.appendChild(content); 
        }
        let btn = document.createElement("button"); 
        btn.textContent = "Buy Tickets"; 
        cell.appendChild(btn);
    }
}

let tabDeskMediaQuery = window.matchMedia("(min-width: 768px)")
let table = document.querySelector("table"); 
let showTimeKeys = Object.keys(showTimes[0]); 
makeTable(table, showTimes); 
makeTableHead (table, showTimeKeys); 