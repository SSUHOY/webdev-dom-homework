import { fetchRenderComments } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { addComment } from "./api.js";
import { initReplyListeners, loadingCommentsList } from "./renderModule.js";
import { initLikeButtonOnOff } from "./renderModule.js";
import { renderComments } from "./renderModule.js";
import { validateFn } from "./validate.js";

// План
// 1.Перенести разметку в модуль (+)
// 2. Сделать форму входа динамической

export let token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck';

token = null;

// массив Comments, рендерится через API
let comments = [];

// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderComments(comments);
// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments);
// Очистка кода - защита
sanitizeHtml();
// Валидация и пост комментария
validateFn()



console.log("It works!");