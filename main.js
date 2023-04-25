import { fetchRenderComments } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { addComment } from "./api.js";
import { initReplyListeners, loadingCommentsList } from "./renderModule.js";
import { initLikeButtonOnOff } from "./renderModule.js";
import { renderComments as renderApp } from "./renderModule.js";
import { validateFn } from "./validate.js";

// План
// 1.Перенести разметку в модуль (+)
// 2. Сделать форму входа динамической


// массив Comments, рендерится через API
let comments = [];

// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderApp(comments);
// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments);
// Очистка кода - защита
sanitizeHtml();
// Валидация и пост комментария
validateFn()



console.log("It works!");