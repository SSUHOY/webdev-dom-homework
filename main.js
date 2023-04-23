// План
// 1. Подключить новый API с функционалом авторизации (+)
// 2. Реализовать форму логина в приложении




// // ИМПОРТ ИЗ МОДУЛЕЙ
import { fetchRenderComments } from "./api.js";
import { renderComments } from "./renderModule.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { initReplyListeners } from "./renderModule.js";
import { initLikeButtonOnOff } from "./renderModule.js";
import { validateFn } from "./validate.js";
import { loadingCommentsList } from "./renderModule.js";

// Переменные
// const listElement = document.getElementById('list');
// const buttonElement = document.getElementById('buttonElement')
// const nameInputElement = document.getElementById('name-input')
// const commentInputElement = document.getElementById('comment-input')
// const containerElement = document.querySelector('.container');
// массив Comments, рендерится через API
let comments = [];
let token = ''

// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderComments(comments)
// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments);
// ОЧИСТКА КОДА CALLBACK ИЗ МОДУЛЯ
sanitizeHtml();
//  Валидация значений при вводе, кнопка добавления комментария
validateFn(comments);
// CALLBACK ВСЕХ ФУНКЦИЙ КОДА И ФОРМЫ КОМЕНТАРИЯ ИЗ МОДУЛЯ
initReplyListeners(comments);
initLikeButtonOnOff(comments);

console.log("It works!");