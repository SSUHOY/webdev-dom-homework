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
    const appEl = document.getElementById('app');
    const commentsHtml = comments.map((comment, index) => {
        return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
      <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'> <div class="likes">
            <span class="likes-counter" >${comments[index].likes}</span>
            <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
          </div></div></li>`

    }).join('');
    const appHtml = `
    
    <div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        Логин
        <input type="text" id="login-input" class="input" />
        <br />
        Пароль
        <input type="text" id="login-input" class="input" />
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
    </div>

  <div class="container">
  ${commentsHtml}
    <ul class="comments" id="list">

    </ul>
    <div class="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="text-input" ></textarea>
      <div class="add-form-row">
        <button class="add-form-button turn-off" id="add-button">Написать</button>
      </div>

    </div>`
    appEl.innerHTML = appHtml;
    initReplyListeners(comments);
    initLikeButtonOnOff(comments);
}




// ЭКСПОРТ ФУНКЦИЙ ИЗ МОДУЛЯ
export { renderComments };
export { initLikeButtonOnOff }
export { initReplyListeners }
export { loadingCommentsList }
