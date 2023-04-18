import { sanitizeHtml } from "./sanitizeHtml.js";

// ОБЬЯВЛЕНИЕ НЕОБХОДИМЫХ ПЕРЕМЕННЫХ

const listElement = document.getElementById('list');
const containerElement = document.querySelector('.container');
const commentInputElement = document.getElementById('comment-input')

// Строка загрузки комментов
function loadingCommentsList(comments) {
    if (comments.length === 0) {
        containerElement.insertAdjacentHTML("afterbegin", "<span>Подождите, список загружается...</span>")
    }
}


// // кнопка для лайка, с ветвлением при нажатии
const initLikeButtonOnOff = (comments) => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtonElements) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            if (comments[index].isLiked === '-active-like') {
                comments[index].isLiked = '';
                comments[index].likes--;
            } else {
                comments[index].isLiked = '-active-like';
                comments[index].likes++;
            }
            renderComments(comments);
        })
    }
}
// Функция реплая 
const initReplyListeners = (comments) => {
    const replyClicks = document.querySelectorAll('.comment'); {
        for (const replyClick of replyClicks) {
            replyClick.addEventListener('click', () => {
                const index = replyClick.dataset.index;
                commentInputElement.value =
                    `>${comments[index].text} 
   ${comments[index].name},`;
            });
        }
    }
}


// Рендер комментов на основе массива
const renderComments = (comments) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
      <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'> <div class="likes">
            <span class="likes-counter" >${comments[index].likes}</span>
            <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
          </div></div></li>`

    }).join('')
    listElement.innerHTML = commentsHtml;
    initReplyListeners(comments);
    initLikeButtonOnOff(comments);
}




// ЭКСПОРТ ФУНКЦИЙ ИЗ МОДУЛЯ
export { renderComments };
export { initLikeButtonOnOff }
export { initReplyListeners }
export { loadingCommentsList }