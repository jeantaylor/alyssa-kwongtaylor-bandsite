// Variable Declarations
const projectKey = "?api_key=2bb7dd6d-ca82-47b6-9411-0b448a4f3395"; 
const form = document.querySelector("#conversation__input"); 
const thread = document.querySelector(".conversation__thread"); 

// Fetch Data from API
let commentData = []; 
function loadData() {
    axios.get("https://project-1-api.herokuapp.com/comments" + projectKey) 
        .then((resp) => {
            commentData = resp.data;
            displayComments(commentData); 
            deleteSetup(); 
            likeSetup(); 
        }) 
}

// Method for removing all children of node from MDN
function removeChildren (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild); 
    }
}

function displayComments (commentData) {
    // Clear existing comments to prep for reload, if any
    if (thread.firstChild) {
        removeChildren(thread); 
    }

    let content; 

    for (entry of commentData) {
        // Create all HTML that comprises a comment
        let comment = document.createElement('div'); 
        comment.classList.add("conversation__comment"); 

        let avatarWrapper = document.createElement('div'); 
        avatarWrapper.classList.add('conversation__avatar-wrapper'); 

        let avatar = document.createElement('img'); 
        avatar.classList.add("conversation__avatar"); 

        let commentText = document.createElement('div'); 
        commentText.classList.add("conversation__comment-text"); 

        let id = document.createElement('div'); 
        id.classList.add("conversation__comment-id"); 

        let name = document.createElement('div'); 
        name.classList.add("conversation__comment-name"); 

        let date = document.createElement('div'); 
        date.classList.add("conversation__comment-date"); 

        let msg = document.createElement('div'); 
        msg.classList.add("conversation__comment-msg"); 

        // New assets for delete and like
        let tools = document.createElement('div'); 
        tools.classList.add("conversation__comment-tools"); 

        let likes = document.createElement('div'); 
        likes.classList.add("conversation__likes"); 

        //Fetch and append data to elements 
        content = document.createTextNode(entry.name); 
        name.appendChild(content); 

        content = document.createTextNode(liveTimestamp(entry.timestamp)); 
        date.appendChild(content); 

        content = document.createTextNode(entry.comment); 
        msg.appendChild(content); 

        // Building the Comment, inside elements out 
        id.appendChild(name); 
        id.appendChild(date); 

        // 'likes' contains the like button + is target destination for # likes 
        likes.innerHTML= `<button class="conversation__tool-icon like" id="${entry.id}"><img src="assets/Icons/PNG/icons8-facebook-like-24.png" alt="Like icon"/></button><span>${entry.likes}</span>`
        

        // Adds the delete button to the comment toolbar
        tools.innerHTML = `<button class="conversation__tool-icon delete" id=${entry.id}><img src="./assets/Icons/SVG/icons8-trash.svg" alt="Delete icon"/></button>`;
        tools.appendChild(likes);
        

        commentText.appendChild(id);
        commentText.appendChild(msg); 
        commentText.appendChild(tools); 
        
        avatarWrapper.appendChild(avatar); 

        comment.appendChild(avatarWrapper); 
        comment.appendChild(commentText); 

        // Append completed comment to thread 
        thread.appendChild(comment); 
    }
}

function liveTimestamp(epochTime) {
    let msToday = Date.now(); 
    let msDiff = msToday - epochTime; 
    let daysAgo = Math.floor(msDiff / 8.64e+7); 
    let timesText = daysAgo === 1 ? 'day' : 'days'; 
    let dynamicTimestamp = daysAgo === 0 ? 'today' : `${daysAgo} ${timesText} ago`; 
    return dynamicTimestamp; 
}


// Submit Comment
form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    entry.name = event.target.name.value; 
    entry.comment = event.target.comment.value; 

    form.reset(); 

    axios({
        method: "post",
        url: ("https://project-1-api.herokuapp.com/comments" + projectKey), 
        data: {name: entry.name, comment: entry.comment} 
    }) .then(resp => {
        loadData();
    });
})

loadData(); 


// Fnx below placed after initial load with timeouts bc they target elements created on load. 
// Prevents targetting undefined objects, variables


// Delete Comment Setup
// Added another function (deleteSetup) around the setTimeout and deletePost function 
// Needed to fix the bug of only being able to delete one comment on a single pg load
function deleteSetup () {
    setTimeout( () => { 
        let delBtns = document.getElementsByClassName("delete"); 

        let deletePost = function () {
            let delId; 
            delId = this.id;

            axios({
                method: "delete",
                url: ("https://project-1-api.herokuapp.com/comments/" + delId + projectKey), 
            }) .then(resp => {
                loadData();
            });
        }

        Array.from(delBtns).forEach(function(element) {
            element.addEventListener('click', deletePost);
        });        
    }, 500)
}

function likeSetup () {
    setTimeout( () => { 
        let likeBtns = document.getElementsByClassName("like"); 

        let likePost = function () {
            let likeId; 
            likeId = this.id;

            axios({
                method: "put",
                url: ("https://project-1-api.herokuapp.com/comments/" + likeId + "/like" + projectKey), 
            }) .then(resp => {
                loadData();
            });
        }

        Array.from(likeBtns).forEach(function(element) {
            element.addEventListener('click', likePost);
        });        
    }, 500)
}