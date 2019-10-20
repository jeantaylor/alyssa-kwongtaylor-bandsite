const commentData = [
    {name: "Anita Yu", date: "12/18/2018", msg: "*dabs*",}, 
    {name: "Parvaneh Zolfaghari", date: "12/12/2018", msg: "Their sick beats blew my mind omg",}, 
    {name: "Nooruddin Khorasi", date: "11/15/2018", msg: "10/10, would watch again!",}
]

const form = document.querySelector("#conversation__input"); 
const thread = document.querySelector(".conversation__thread"); 

function loadComments (thread, commentData) {
    for (entry of commentData) {
        let comment = document. createElement('div'); 
        comment.classList.add("conversation__comment"); 

        let commentText = document.createElement('div'); 
        commentText.classList.add("converstation__comment-text"); 

        let id = document.createElement('div'); 
        id.classList.add("conversation__comment-id"); 

        let name = document.createElement('div'); 
        name.classList.add("conversation__comment-name"); 

        let date = document.createElement('div'); 
        date.classList.add("conversation__comment-date"); 

        let msg = document.createElement('div'); 
        msg.classList.add("conversation__comment-msg"); 

        let avatar = document.createElement('div'); 
        avatar.classList.add("conversation__avatar"); 
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

    let comment = {}; 

    comment.name = name; 
    comment.date = date; 
    comment.msg = msg; 

    commentData.unshift(comment); 
    //console.log(commentData); 

    loadComments(); 
})

//window.onload = () => {
//   loadComments(thread, commentData); 
//}