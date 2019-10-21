// Variable Declarations
const projectKey = "2bb7dd6d-ca82-47b6-9411-0b448a4f3395"; 

let commentData = []; 
axios.get("https://project-1-api.herokuapp.com/comments?api_key=" + projectKey) 
    .then((resp) => {
        commentData = resp.data;
        displayComments(commentData); 
    }) 

const form = document.querySelector("#conversation__input"); 
const thread = document.querySelector(".conversation__thread"); 

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

        //Fetch and append data to elements 
        content = document.createTextNode(entry.name); 
        name.appendChild(content); 

        content = document.createTextNode(entry.timestamp); 
        date.appendChild(content); 

        content = document.createTextNode(entry.comment); 
        msg.appendChild(content); 

        // Set comment avatar 
        if (entry.img === "") {
            avatar.src = ""; 
            avatar.alt = "Upload an Avatar here for your comments!"; 
        } else {
            avatar.src = entry.img; 
        }

        // Building the Comment, inside elements out 
        id.appendChild(name); 
        id.appendChild(date); 

        commentText.appendChild(id);
        commentText.appendChild(msg); 
        
        avatarWrapper.appendChild(avatar); 

        comment.appendChild(avatarWrapper); 
        comment.appendChild(commentText); 

        // Append completed comment to thread 
        thread.appendChild(comment); 
    }
}

function getDate() {
    let date = new Date(); 
    let mo = date.getMonth() + 1; 
    let d = date.getDate(); 
    let y = date.getFullYear(); 
    return mo + "/" + d + "/" + y; 
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let date = getDate(); 
    let name = event.target.name.value; 
    let msg = event.target.comment.value; 
    let avatar = event.target.avatar.src; 

    let comment = {}; 

    comment.name = name; 
    comment.timestamp = date; 
    comment.msg = msg; 
    comment.img = avatar; 

    commentData.unshift(comment); 

    form.reset(); 

    displayComments(commentData); 
})