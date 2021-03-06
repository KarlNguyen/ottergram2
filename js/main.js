// VARIABLES.
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

let nodeList = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
let index = nodeList[0];

// FUNCTIONS.
function hideDetails(){
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
function addKeyPressHandler(){
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY){
            hideDetails();
        }
    });
}
function showDetails(){
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}
function setDetails(imageUrl, titleText) {  
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    detailTitle.textContent = titleText;
}
function imageFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}
function titleFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}
function setDetailsFromThumb(thumbnail) {  
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
function addThumbClickHandler(thumb) {  
    'use strict';
    thumb.addEventListener('click', function(event) { 
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}
function getThumbnailsArray() {  
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}
function initializeEvents() {  
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

getArray = () => {
    "use strict";
    let imgArray = getThumbnailsArray();
    for (let i = 0; i < imgArray.length; i++) {
        imgArray[i] = imgArray[i].href;
    }
    return imgArray;
}

document.getElementById('PreviousButton').addEventListener('click', btnPrevious = () => {
    let imgArray = getArray();
    let thumbArray = getThumbnailsArray();
    let current = imgArray.indexOf(document.getElementById("detail-image").src);
    if (current === 0) {
        current = imgArray.length - 1;
    } else {
        current = current - 1;
    }
    thumbArray[current].click();
})

document.getElementById('NextButton').addEventListener('click', btnNext = () => {
    let imgArray = getArray();
    let thumbArray = getThumbnailsArray();
    let current = imgArray.indexOf(document.getElementById("detail-image").src);
    if (current === 4) {
        current = 0;
    } else {
        current = current + 1;
    }
    thumbArray[current].click();
})

initializeEvents();






