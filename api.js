import { renderComments } from "./renderModule.js";
import { loadingCommentsList } from "./renderModule.js";
import { initLikeButtonOnOff } from "./renderModule.js";

const containerElement = document.querySelector('.container');
const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')


// GET комментариев

const fetchRenderComments = (comments) => {
    loadingCommentsList(comments);
    fetch("https://webdev-hw-api.vercel.app/api/v1/:sukhoysemyon-key/comments", {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        const formatComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                text: comment.text,
                date: new Date().toLocaleString().slice(0, -3),
                likes: comment.likes,
                isLiked: false,
            };
        })
        // console.log(formatComments);
        // получили данные и рендерим их в приложении
        comments = formatComments;
        renderComments(comments);
        const span = containerElement.querySelector("span");
        span.remove();
    })
}

const addComment = (comments) => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/:sukhoysemyon-key/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
        }),
    }).then((response) => {

        // Ветвление с выбрасыванием ошибки в случае отключенного интернета
        if (response.status === 500) {
            throw new Error('Сервер сломался')
            // ошибка при вводе коротких данных, менее 3 символов в поле имя и в поле комменты
        } else if (response.status === 400) {
            throw new Error('Слишком короткое значение, поле имя и комментарий должно содержать хотя бы 3 символа')
        } else {
            return response.json();
        }
    })
        .then(() => {
            // GET через вызов функции
            return fetchRenderComments(comments);
        })
        .then(() => {
            // Отработка функционала кнопки и полей после публикации комментария
            buttonElement.disabled = false;
            buttonElement.textContent = 'Добавить'
            nameInputElement.value = ''
            commentInputElement.value = ''
        }).catch((error) => {
            console.log(error);
            // Alert с ошибкой, в случае, если интернет не функционирует - РАБОТАЕТ
            if (error.message === 'Failed to fetch') {
                alert('Кажется что-то пошло не так, проверьте интернет соединение');
                //  Alert с ошибкой, в случае, если выпала ошибка 500 
            } else if (error === 'Сервер сломался') {
                alert('Кажется что-то пошло не так...');
                // Alert с ошибкой, в случае введения в полях имени и коммента менее 3 символов
            } else if (error.message === "Слишком короткое значение, поле имя и комментарий должно содержать хотя бы 3 символа") {
                alert('Минимальное количество символов в полях ввода не менее трех')
            }
            // user exp: возврат активной кнопки после публикации коммента 
            buttonElement.disabled = false;
            buttonElement.textContent = 'Добавить'

        })
    renderComments(comments);
    initLikeButtonOnOff(comments)
    renderComments(comments);
}

export { addComment }
export { fetchRenderComments }