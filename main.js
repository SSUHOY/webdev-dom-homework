import { fetchRenderComments } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { renderComments as renderApp } from "./renderModule.js";
import { renderLoginComponent } from "./components/login-components.js";

// План
// 1.Перенести разметку в модуль (+)
// 2. Сделать форму входа динамической (+)
// 3. Отрефакторить приложение на модули (+)
// 4.

// массив Comments, рендерится через API
let comments = [];

let token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck';

token = null;


// renderLoginComponent(comments, token)
// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderApp(comments, token);
// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments, token);
// Очистка кода - защита
sanitizeHtml();
// Валидация и пост комментария
// validateFn(comments, token)



console.log("It works!");