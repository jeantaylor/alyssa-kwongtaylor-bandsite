const commentData = [
    {name: "Anita Yu", date: "12/18/2018", msg: "*dabs*", img: "./assets/Images/anita-yu.jpg"}, 
    {name: "Parvaneh Zolfaghari", date: "12/12/2018", msg: "Their sick beats blew my mind omg", img: "./assets/Images/parveneh-zolfaghari.jpg"}, 
    {name: "Nooruddin Khorasi", date: "11/15/2018", msg: "10/10, would watch again!", img: "./assets/Images/noor-khorasi.jpg"}
]

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

        content = document.createTextNode(entry.date); 
        date.appendChild(content); 

        content = document.createTextNode(entry.msg); 
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
    let msg = event.target.msg.value; 
    let avatar = event.target.avatar.src; 

    let comment = {}; 

    comment.name = name; 
    comment.date = date; 
    comment.msg = msg; 
    comment.img = avatar; 

    commentData.unshift(comment); 

    form.reset(); 

    displayComments(commentData); 
})

window.onload = () => {
   displayComments(commentData); 
}