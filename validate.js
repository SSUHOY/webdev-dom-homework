import { addComment } from "./api.js";
import { renderComments } from "./renderModule.js";

const buttonElement = document.getElementById('buttonElement')
const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')


export function validateFn(comments) {
    buttonElement.addEventListener('click', () => {

        nameInputElement.classList.remove('error')
        commentInputElement.classList.remove('error')
        if (commentInputElement.value === '' && nameInputElement.value === "") {
          nameInputElement.classList.add('error')
          commentInputElement.classList.add('error')
          return;
        } else if (commentInputElement.value === '') {
          commentInputElement.classList.add('error')
          return;
        } else if (nameInputElement.value === '') {
          nameInputElement.classList.add('error')
          return
        }
      
        // отключение кнопки до завершения публикации нового коммента и замена содержимого контента на "Выполняется..."
        buttonElement.disabled = true;
        buttonElement.textContent = 'Выполняется...'
      
        // РЕНДЕР КОММЕНТОВ И ДОБАВЛЕНИЕ КОММЕНТАРИЯ, ОТРАБОТКА МЕТОДА POST ИЗ FETCH, CALLBACK ИЗ МОДУЛЯ
      
        addComment(comments);
      });
}