import { fetchRenderComments } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { addComment } from "./api.js";
import { initReplyListeners, loadingCommentsList } from "./renderModule.js";
import { initLikeButtonOnOff } from "./renderModule.js";
import { renderComments } from "./renderModule.js";
import { validateFn } from "./validate.js";



// массив Comments, рендерится через API
let comments = [];


// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderComments(comments);

// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments);

// Очистка кода - защита
sanitizeHtml();

// Валидация и пост комментария

// CALLBACK ВСЕХ ФУНКЦИЙ КОДА И ФОРМЫ КОМЕНТАРИЯ ИЗ МОДУЛЯ
initReplyListeners(comments);
initLikeButtonOnOff(comments);
// renderComments(comments);

console.log("It works!");