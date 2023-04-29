import { sanitizeHtml } from "./sanitizeHtml.js";
import { validateFn } from "./validate.js";
import { fetchRenderComments } from "./api.js";
import { renderLoginComponent } from "./components/login-components.js";

// Строка загрузки комментов
function loadingCommentsList(comments) {
    const containerElement = document.querySelector('.container');
    if (comments.length === 0) {
        containerElement.insertAdjacentHTML("afterbegin", "<span>Подождите, список загружается...</span>")
    }
}

const renderApp = (comments, token, user) => {

    const appEl = document.getElementById('app');



    const commentsHtml = comments.map((comment, index) => {
        return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
      <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'><div class="likes">
            <span class="likes-counter" >${comments[index].likes}</span>
            <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
          </div></div></li>`

    }).join('')
    // ФОРМА ПРИЛОЖЕНИЯ

    
    const appHtml = `
        <div class="container">
    ${commentsHtml}
        <ul class="comments" id="list">
        </ul>
        ${token ? `<div class="add-form">
        
        <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" disabled value="${user}" />
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            id="comment-input"></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="buttonElement">Написать</button>
        </div>`: `<p>Чтобы добавить комментарий, <a class="check" id="auth">авторизуйтесь</a></p>`}`;
    appEl.innerHTML = appHtml;

    if (!token) {
       
        document.getElementById("auth").addEventListener('click', () => {
            renderLoginComponent({
                appEl,
                setToken: (newToken) => {
                    token = newToken;
                },
                setUser: (newUser) => {
                    user = newUser;
                },
                fetchRenderComments,
            });
        });
        return;
    };



    // fetchRenderComments(comments)
    initReplyListeners(comments, token);
    initLikeButtonOnOff(comments, token);
    validateFn(comments, token)

}




// // кнопка для лайка, с ветвлением при нажатии
const initLikeButtonOnOff = (comments, token) => {
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
            renderApp(comments, token);
        })
    }
}
// Функция реплая 
const initReplyListeners = (comments, token) => {
    const commentInputElement = document.getElementById('comment-input')
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


// ЭКСПОРТ ФУНКЦИЙ ИЗ МОДУЛЯ
export { renderApp };
export { initLikeButtonOnOff }
export { initReplyListeners }
export { loadingCommentsList }