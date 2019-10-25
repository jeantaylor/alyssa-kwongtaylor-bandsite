// Variable Declarations
const projectKey = "2bb7dd6d-ca82-47b6-9411-0b448a4f3395"; 
const form = document.querySelector("#conversation__input"); 
const thread = document.querySelector(".conversation__thread"); 

// Fetch Data from API
let commentData = []; 
function reloadData() {
    axios.get("https://project-1-api.herokuapp.com/comments?api_key=" + projectKey) 
        .then((resp) => {
            commentData = resp.data;
            displayComments(commentData); 
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

        content = document.createTextNode(formatDate(entry.timestamp)); 
        date.appendChild(content); 

        content = document.createTextNode(entry.comment); 
        msg.appendChild(content); 

        // Assign comment id to comment to test out deletion func later
        comment.id = entry.id; 

        // Building the Comment, inside elements out 
        id.appendChild(name); 
        id.appendChild(date); 

        // tools.innerHTML = '<img class="conversation__comment-tool-icon" src="assets/Icons/PNG/icons8-facebook-like-24.png" alt="Like icon"/><img class="conversation__comment-tool-icon" src="./assets/Icons/SVG/icons8-trash.svg" alt="Delete icon"/>'; 

        // Below adds both the comment tool button icons into the tool bar, likes 1st then delete
        tools.innerHTML = '<button class="conversation__comment-tool-icon"><img src="assets/Icons/PNG/icons8-facebook-like-24.png" alt="Like icon"/></button><button class="conversation__comment-tool-icon"><img class="conversation__comment-tool-icon" src="./assets/Icons/SVG/icons8-trash.svg" alt="Delete icon"/></button>';

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

function formatDate(epochTime) {
    let msToday = Date.now(); 
    let msDiff = msToday - epochTime; 
    let daysAgo = Math.floor(msDiff / 8.64e+7); 
    let timesText = daysAgo === 1 ? 'day' : 'days'; 
    let dynamicTimestamp = daysAgo === 0 ? 'today' : `${daysAgo} ${timesText} ago`; 
    return dynamicTimestamp; 
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    let name = event.target.name.value; 
    let comment = event.target.comment.value; 
    let avatar = event.target.avatar.src; 

    let entry = {}; 

    entry.name = name; 
    entry.comment = comment; 

    form.reset(); 

    axios({
        method: "post",
        url: ("https://project-1-api.herokuapp.com/comments?api_key=" + projectKey), 
        data: {name: entry.name, comment: entry.comment} 
    }) .then(resp => {
        reloadData();
    });
})

reloadData(); 