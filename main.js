import { fetchRenderComments } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { renderComments as renderApp } from "./renderModule.js";

// План
// 1.Перенести разметку в модуль (+)
// 2. Сделать форму входа динамической (+)
// 3. Отрефакторить приложение на модули (+)
// 4. Создать форму регистрации (+)
// 5. Оживить форму регистрации ()

// массив Comments, рендерится через API
let comments = [];

let token = null;

// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ
fetchRenderComments(comments, token);
// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ
renderApp(comments, token);
// ОЧИСТКА КОДА
sanitizeHtml();
// Валидация и пост комментария
// validateFn(comments, token)



console.log("It works!");