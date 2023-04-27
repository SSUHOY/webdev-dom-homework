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


// export const renderUnauthorizedApp = (comments, index) => {
//     const appUnAuthEl = document.querySelectorAll('app');


//     const appUnAuthElHtml = comments.map((comment, index) => {
//        return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
//         <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'> <div class="likes">
//               <span class="likes-counter" >${comments[index].likes}</span>
//               <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
//             </div></div></li>`
//     }).join('')

//         appUnAuthEl.innerHTML = appUnAuthElHtml;

// }


const renderApp = (comments, token) => {

    const appEl = document.getElementById('app');

    if (!token) {
        // ФОРМА ВХОДА
        // const appHtml = `
        // <div class="form">
        // <h3 class="form-title">Форма входа</h3>
        //     <div class="form-row">
        //     Логин
        //     <input type="text" id="login-input" class="input">
        //     <br>
        //     Пароль
        //     <input type="password" id="password-input" class="input">
        //     </div>
        //     <br>
        //     <button class="button" id='login-button'>Войти</button>
        //     </div>    
        // `
        // appEl.innerHTML = appHtml;

        // document.getElementById('login-button').addEventListener('click', () => {
        //     token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck'
        //     // loadingCommentsList(comments, token);
        //     fetchRenderComments(comments, token)
        // })
        renderLoginComponent({
            appEl,
            setToken: (newToken) => {
                token = newToken;
            },
            fetchRenderComments,
        });
        return;
    };

    const commentsHtml = comments.map((comment, index) => {
        return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
      <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'> <div class="likes">
            <span class="likes-counter" >${comments[index].likes}</span>
            <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
          </div></div></li>`

    }).join('')
    // ФОРМА ПРИЛОЖЕНИЯ
    const appHtml = `
        <div class="container">
    ${commentsHtml}
        <ul class="comments" id="list">
        <!-- Список рендерится из JS -->
        </ul>
        <div class="add-form">
        <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            id="comment-input"></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="buttonElement">Написать</button>
        </div>
    `
    appEl.innerHTML = appHtml;
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
export { renderApp as renderComments };
export { initLikeButtonOnOff }
export { initReplyListeners }
export { loadingCommentsList }