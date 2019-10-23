// Variable Declarations
const projectKey = "2bb7dd6d-ca82-47b6-9411-0b448a4f3395"; 
const table = document.querySelector("table"); 
const tableMediaQuery = window.matchMedia("(min-width: 768px)"); 
const showTimes = [];

function reloadTable (tableMediaQuery) {
    removeChildren(table); 
    axios.get("https://project-1-api.herokuapp.com/showdates?api_key=" + projectKey) 
        .then((resp) => {
            showTimes.push(resp.data);
            if (tableMediaQuery.matches) {
                makeTable(table, resp.data); 
                makeTableHead (table, resp.data);
            } else {
                makeTableMobile(table, resp.data); 
            }
        }) 
    };

function removeChildren (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild); 
    }
}

function makeTable (targetTable, schedule) {
    targetTable.classList.add("shows__table"); 
    for (let show of schedule) { 
        let row = targetTable.insertRow();
        for (let key in show) { 
            if (key !== "id") {
                let cell = row.insertCell();
                let text = document.createTextNode(show[key]); 
                cell.appendChild(text); 
                cell.classList.add("shows__table-content");
            } 
        } 
        let cell = row.insertCell(); 
        cell.classList.add("shows__table-content");
        let btn = document.createElement("button"); 
        btn.textContent = "Buy Tickets"; 
        btn.classList.add("shows__cta"); 
        cell.appendChild(btn); 
    }
}

function makeTableHead (targetTable, schedule) {
    let scheduleKeys = Object.keys(schedule[0]); 
    let tHead = table.createTHead(); 
    tHead.classList.add("shows__table-header"); 
    let row = tHead.insertRow(); 
    for (let key of scheduleKeys) {
            let th = document.createElement("th"); 
            let text = document.createTextNode(key); 
            if (key !== "id") {
            th.appendChild(text); 
            row.appendChild(th); 
        }
    }
}

function makeTableMobile (targetTable, schedule) {
    targetTable.classList.add("shows__table"); 
    let scheduleKeys = Object.keys(schedule[0]); 
    let row = targetTable.insertRow(); 
    row.classList.add("shows__table--mobile"); 
    for (show of schedule) {
        let cell = row.insertCell(); 
        cell.classList.add("shows__table-show"); 
        for (i = 1; i < 4; i++) {
            let header = document.createElement('div'); 
            let text = document.createTextNode(scheduleKeys[i]); 
            header.appendChild(text);
            cell.appendChild(header);  
            header.classList.add("shows__table-header"); 

            let content = document.createElement('div'); 
            text = document.createTextNode(Object.values(show)[i]); 
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

reloadTable(tableMediaQuery); 
tableMediaQuery.addListener(reloadTable); 