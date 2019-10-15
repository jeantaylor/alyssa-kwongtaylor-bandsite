var showTimes = [
    {Dates: "Mon Dec 17 2018", Venue: "Ronald Lane", Location: "San Francisco, CA"},
    {Dates: "Tue Jul 18 2019", Venue: "Pier 3 East", Location: "San Francisco, CA"},
    {Dates: "Fri Jul 22 2019", Venue: "View Lounge", Location: "San Francisco, CA"},
    {Dates: "W Aug 11 2019", Venue: "Pres Club", Location: "San Francisco, CA"},
    {Dates: "Sa Aug 12 2019", Venue: "Hyatt Agency", Location: "San Francisco, CA"},
    {Dates: "Fri Sep 05 2019", Venue: "Moscow Center", Location: "San Francisco, CA"} 
]

function makeTable (targetTable, data) {
    for (var show of data) {
        var row = targetTable.insertRow(); 
        for (var key in show) {
            var cell = row.insertCell(); 
            var text = document.createTextNode(show[key]); //Creates #text Node
            cell.appendChild(text); 
        } 
        var cell = row.insertCell(); 
        var btn = document.createElement("button"); 
        btn.textContent = "Buy Tickets"; 
        cell.appendChild(btn); 

    }
}

function makeTableHead (targetTable, dataKeys) {
    var tHead = table.createTHead(); // Creates TH Node 
    var row = tHead.insertRow(); 
    for (var key of dataKeys) {
        var th = document.createElement("th"); 
        var text = document.createTextNode(key); 
        th.appendChild(text); 
        row.appendChild(th); 
    }
}

var table = document.querySelector("table"); 
var showTimeKeys = Object.keys(showTimes[0]); 
makeTable(table, showTimes); 
makeTableHead (table, showTimeKeys); 