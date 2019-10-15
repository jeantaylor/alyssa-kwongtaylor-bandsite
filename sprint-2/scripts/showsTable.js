var showTimes = [
    {Dates: "Mon Dec 17 2018", Venue: "Ronald Lane", Location: "San Francisco, CA"},
    {Dates: "Tue Jul 18 2019", Venue: "Pier 3 East", Location: "San Francisco, CA"},
    {Dates: "Fri Jul 22 2019", Venue: "View Lounge", Location: "San Francisco, CA"},
    {Dates: "W Aug 11 2019", Venue: "Pres Club", Location: "San Francisco, CA"},
    {Dates: "Sa Aug 12 2019", Venue: "Hyatt Agency", Location: "San Francisco, CA"},
    {Dates: "Fri Sep 05 2019", Venue: "Moscow Center", Location: "San Francisco, CA"} 
]

function tableMaker (targetTable, roster) {
    for (var student of roster) {
        var row = targetTable.insertRow(); 
        for (var key in student) {
            var cell = row.insertCell(); 
            var text = document.createTextNode(student[key]); // Creates #text Node
            cell.appendChild(text); 
        }
    }
}

function tableHeadMaker (targetTable, rosterKeys) {
    var tHead = table.createTHead(); // Creates TH Node 
    var row = tHead.insertRow(); 
    for (var key of rosterKeys) {
        var th = document.createElement("th"); 
        var text = document.createTextNode(key); 
        th.appendChild(text); 
        row.appendChild(th); 
    }
}

var table = document.querySelector("table"); 
console.log(table); 
var rosterKeys = Object.keys(roster[0]); 
tableMaker(table, roster); 
tableHeadMaker (table, rosterKeys); 