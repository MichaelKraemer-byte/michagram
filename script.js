let posts = [ 
    { 
        'likes': 0, 
        'likeHeart': 'img/like.png',
        'author': 'Tagesschau',
        'image': 'img/img1.jpg',
        'description': 'Irgendwo in der Schweiz liegt Schnee',
        'location': 'Location: Graubünden',
        'comments': [],
        'names': []
    },    
    { 
        'likes': 0, 
        'likeHeart': 'img/like.png',
        'author': 'Skyschau',
        'image': 'img/starry-sky.jpg',
        'description': 'Schoener Himmel, wenn man die Sterne mal sieht',
        'location': 'Location: Schwarzwald',
        'comments': [],
        'names': []
    },
    { 
        'likes': 0, 
        'likeHeart': 'img/like.png',
        'author': 'Michaschau',
        'image': 'img/img2.jpg',
        'description': 'Der Micha geht gerne wandern, wir auch!',
        'location': 'Location: Grindelwald',
        'comments': [],
        'names': []
    },
    { 
        'likes': 0, 
        'likeHeart': 'img/like.png',
        'author': 'Florianschau',
        'image': 'img/img3.jpg',
        'description': 'Guckmal, wat nen feiner Ort',
        'location': 'Location: Grindelwald',
        'comments': [],
        'names': []
    }
];


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        load(i);
        loadLikedHearts(i);
        let post = posts[i];
        content.innerHTML += /*html*/`
            <div class="postRow">
                <div class="post"><img onclick="openImgAndComments(${i})" src="${post['image']}" class="postImg" alt="Picture">
                    <div class="postDescription">
                        <div class="iconContainer">
                            <div class="d-flex">
                                <img id="likeButton${i}" onclick="like(${i})" class="postIcon" src="${post['likeHeart']}" alt="Like Button">
                                <img onclick="openImgAndComments(${i})" class="postIcon" src="img/speech-bubble.png" alt="Comment Button">
                                <img class="postIcon" src="img/send.png" alt="Send Button">
                            </div>
                            <img class="postIcon" src="img/save.png" alt="save button">
                        </div>
                        <span class="likesDescription">Likes <p id="likesCount${i}" class="likesCount"> ${post['likes']}</p></span>
                        <h2>${post['author']}</h2>
                        <p id="description">${post['description']}</p>
                        <p id="location">${post['location']}</p>
                        
                    </div>
                </div>
            </div>
        `;
    }
}


function loadLikedHearts(i) {
    let likeHeartAsText = localStorage.getItem(`LikeHeart${i}`);
    
    if (likeHeartAsText) {
        posts[i]['likeHeart'] = JSON.parse(likeHeartAsText);
    }
}


function likeCopy(i) {
    let post = posts[i];
    let likeButtonInPhotoView = document.getElementById(`likeButtonInPhotoView${i}`);

    if ( post['likes'] === 0) {
        post['likes']++;
        post['likeHeart'] = 'img/redLike.png';
    } else {
        post['likes']--;
        post['likeHeart'] = 'img/like.png';
    }

    likeButtonInPhotoView.src = post['likeHeart'];
    document.getElementById(`likesCountAtCommentSection${i}`).innerHTML = `${post['likes']}`;
    save(i);
}


function save(i) {
    let post = posts[i];
    let likesAsText = JSON.stringify(post['likes']);
    let commentsAsText = JSON.stringify(post['comments']);
    let nameInputAsText = JSON.stringify(post['names']);

    localStorage.setItem(`Likes${i}`, likesAsText);
    localStorage.setItem(`Comments${i}`, commentsAsText);
    localStorage.setItem(`Names${i}`, nameInputAsText);

    if ( post['likes'] === 1) {
        let likeHeartAsText = JSON.stringify(post['likeHeart']);
        localStorage.setItem(`LikeHeart${i}`, likeHeartAsText);
    }
    if ( post['likes'] === 0) {
        let likeHeartAsText = JSON.stringify(post['likeHeart']);
        localStorage.setItem(`LikeHeart${i}`, likeHeartAsText);
    }
}


function load(i) {
    let likesAsText = localStorage.getItem(`Likes${i}`);
    let commentsAsText = localStorage.getItem(`Comments${i}`);
    let nameInputAsText = localStorage.getItem(`Names${i}`);

    if (likesAsText) {
        posts[i]['likes'] = JSON.parse(likesAsText);
        }
    
    if (commentsAsText) {
        posts[i]['comments'] = JSON.parse(commentsAsText);
        }

    if (nameInputAsText) {
        posts[i]['names'] = JSON.parse(nameInputAsText);
    }
}


function like(i) {
    let post = posts[i];
    let likeButton = document.getElementById(`likeButton${i}`);

    if (post['likes'] === 0 ) {
        post['likes']++;
        post['likeHeart'] = 'img/redLike.png';
    } else {
        post['likes']--;
        post['likeHeart'] = 'img/like.png';
    }

    likeButton.src = post['likeHeart'];
    document.getElementById(`likesCount${i}`).innerHTML = `${post['likes']}`;
    save(i); 
}


function openImgAndComments(i) {
    let post = posts[i];
    let imgAndComments = document.getElementById('imgAndComments');
    let greyBackground = document.getElementById('greyBackground');

    greyBackground.classList.remove('d-none');
    imgAndComments.classList.remove('d-none');

    imgAndComments.innerHTML = /*html*/`
    <div id="commentView${i}" class="commentViewClass">
        <img class="imgZoom" id="imgZoom" src="${post['image']}" alt="Picture">

        <div id="commentSection" class="commentSection">
            
            <div id="commentColumn">

            </div>

            <div>
                <div id="postDescription" class="postDescription">
                    <div id="iconContainer" class="iconContainer">
                        <div class="d-flex">
                            <img id="likeButtonInPhotoView${i}" onclick="likeCopy(${i})" class="postIcon" src="${post['likeHeart']}" alt="Like Button">
                            <img id="commentButton" class="postIcon" src="img/speech-bubble.png" alt="Comment Button">
                            <img id="sendButton" class="postIcon" src="img/send.png" alt="Send Button">
                        </div>
                        <img id="saveButton" class="postIcon" src="img/save.png" alt="save button">
                    </div>

                    <div class="likesDescription">Likes <p id="likesCountAtCommentSection${i}" class="likesCount"> ${post['likes']}</p></div>
                    <h2 id="viewAuthor">${post['author']}</h2>
                    <p id="viewDescription">${post['description']}</p>
                    <p id="viewLocation">${post['location']}</p>
                </div>

                <div id="commentContainer" class="commentContainer d-flex">
                    <div class="nameAndMessageContainer">
                        <label class="label">Name:</label><input id="nameInput" type="text" class="nameInputField" oninput="backToNormalPostFocus(${i})" maxlength="10">
                        <label class="label">Message:</label><textarea id="textareaMessage" rows="4" type="text" class="textField" oninput="backToNormalPostFocus(${i})"></textarea>
                    </div>
                    <button id="postButton${i}" onclick="addComment(${i})" class="postButton">Post</button>
                    <button id="replyPostButton${i}" class="d-none postButton" onclick="">Reply</button>
                </div>
            </div>
        </div>    
    </div>
    `;
    renderCommentColumn(i);
    textFocus();
}


function renderCommentColumn(i) {
    let post = posts[i];
    let commentColumn = document.getElementById(`commentColumn`);
    commentColumn.innerHTML = '';

    for ( let j = 0; j < post['comments'].length; j++ ) {
        commentColumn.innerHTML += /*html*/`
            <div class="commentRow">
                <div class="d-flex">
                    <b class="name">${post['names'][j]}:</b>
                    <p class="comment">${post['comments'][j]}</p>
                </div>
                <div class="d-flex gap">
                    <button class="Button" onclick="focusToReplyComment(${i}, ${j})">Reply</button>
                    <button class="Button" onclick="deleteComment(${i}, ${j})">Delete</button>
                </div>
                <div id="replyColumn${j}" class="d-none">

                </div>
            </div>
        `;
        createReplyArrays(i, j);
        loadReplies(i, j)
    }
}


function addComment(i){
    let post = posts[i];
    textareaMessage = document.getElementById('textareaMessage');
    nameInput = document.getElementById('nameInput');

    post['names'].push(nameInput.value);
    post['comments'].push(textareaMessage.value);
    renderCommentColumn(i);

    save(i);

    textareaMessage.value = '';
}


function deleteComment(i, j) {
    let post = posts[i];
    post['comments'].splice([j], 1);
    post['names'].splice([j], 1);

    
    deleteAllReplies(i, j);
    renderCommentColumn(i);
    save(i);
}


function deleteAllReplies(i, j){
    let post = posts[i];

    post['replies'][j]['replyComments'] = [];
    post['replies'][j]['names'] = [];

    saveReplies(i, j);
}


function resume(event) {
    console.log(event);
    let imgAndComments = document.getElementById('imgAndComments');
    
    if (event.target === imgAndComments) {
        document.getElementById('greyBackground').classList.add('d-none');
        document.getElementById('imgAndComments').classList.add('d-none');
        render();
    }
}


function renderReplyComments(i, j) {
    let post = posts[i];
    let replyColumn = document.getElementById(`replyColumn${j}`);
    replyColumn.innerHTML = '';
    replyColumn.classList.remove('d-none');

    for ( let m = 0; m < post['replies'][j]['replyComments'].length; m++) {
        replyColumn.innerHTML += /*html*/`
        <div class="replyCommentRow">
            <div class="replyNameAndCommentContainer d-flex">
                <b class="replyName">${post['replies'][j]['names'][m]}:</b>
                <p class="replyComment">${post['replies'][j]['replyComments'][m]}</p>
            </div>
            <div class="d-flex gap">
                <button class="Button" onclick="focusToReplyComment(${i}, ${j}, ${m})">Reply</button>
                <button class="Button" onclick="deleteReplyComment(${i}, ${j}, ${m})">Delete</button>
            </div>
        </div>
        `;
    }
}


function deleteReplyComment(i, j, m) {
    let post = posts[i];

    post['replies'][j]['replyComments'].splice([m], 1);
    post['replies'][j]['names'].splice([m], 1);

    saveReplies(i, j);
    renderReplyComments(i, j);
}


function addReplyComment(i, j) {
    let post = posts[i];
    textareaMessage = document.getElementById('textareaMessage');

    if ( textareaMessage.value.startsWith('@')) {
            post['replies'][j]['replyComments'].push(textareaMessage.value);
            post['replies'][j]['names'].push(nameInput.value);
            saveReplies(i, j);
            renderReplyComments(i, j);    
        }
}


function createReplyArrays(i, j) {
    let post = posts[i];

    if (!post['replies']) {
        post['replies'] = {};
    }
    if (!post['replies'][j]) {
        post['replies'][j] = {
            'replyComments': [],
            'names': []
        };
    }
}


function saveReplies (i, j) {
    let post = posts[i];
    let replyNameInputAsText = JSON.stringify(post['replies'][j]['names']);
    let replyCommentsAsText = JSON.stringify(post['replies'][j]['replyComments']);

    localStorage.setItem(`ReplyNames${i}${j}`, replyNameInputAsText);
    localStorage.setItem(`ReplyComments${i}${j}`, replyCommentsAsText);
}


function loadReplies(i, j) {

    let replyNameInputAsText = localStorage.getItem(`ReplyNames${i}${j}`);
    let replyCommentsAsText = localStorage.getItem(`ReplyComments${i}${j}`);

    if (replyNameInputAsText) {
        posts[i]['replies'][j]['names'] = JSON.parse(replyNameInputAsText);
    }

    if (replyCommentsAsText) {
        posts[i]['replies'][j]['replyComments'] = JSON.parse(replyCommentsAsText);
    }
}



function backToNormalPostFocus(i) {
    textareaMessage = document.getElementById('textareaMessage');

    if ( textareaMessage.value === '') {
        document.getElementById(`postButton${i}`).classList.remove('d-none');
        document.getElementById(`replyPostButton${i}`).classList.add('d-none');
    }
}


function textFocus() {
    document.getElementById('textareaMessage').focus();
}


function focusToReplyComment(i, j, m) {
    let post = posts[i];
    let textareaMessage = document.getElementById('textareaMessage');
    let replyPostButton = document.getElementById(`replyPostButton${i}`);

    textareaMessage.focus();
    textareaMessage.value = `@${post['names'][j]}`;

    if (m !== undefined) {
        textareaMessage.value = `@${post['replies'][j]['names'][m]}`;
    } else {
        textareaMessage.value = `@${post['names'][j]}`;
    }

    if ( textareaMessage.value.startsWith('@') ) {
        document.getElementById(`postButton${i}`).classList.add('d-none');
        document.getElementById(`replyPostButton${i}`).classList.remove('d-none');
    }

    replyPostButton.onclick = function() {
        addReplyComment(i, j);
    };

    renderReplyComments(i, j);
}
