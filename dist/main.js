/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addComment\": () => (/* binding */ addComment),\n/* harmony export */   \"fetchRenderComments\": () => (/* binding */ fetchRenderComments),\n/* harmony export */   \"loginUser\": () => (/* binding */ loginUser),\n/* harmony export */   \"registerUser\": () => (/* binding */ registerUser)\n/* harmony export */ });\n/* harmony import */ var _renderModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderModule.js */ \"./renderModule.js\");\n// ИМПОРТ МОДУЛЕЙ\r\n\r\n\r\n\r\n\r\n// GET комментариев\r\nconst fetchRenderComments = (comments, token, name) => {\r\n    // const containerElement = document.querySelector('.container');\r\n    fetch(\"https://webdev-hw-api.vercel.app/api/v2/sam-sukhoi/comments\", {\r\n        method: \"GET\",\r\n        headers: {\r\n            Authorization: token,\r\n        },\r\n    }).then((response) => {\r\n        return response.json();\r\n    }).then((responseData) => {\r\n        const formatComments = responseData.comments.map((comment) => {\r\n            return {\r\n                name: comment.author.name,\r\n                login: comment.author.login,\r\n                text: comment.text,\r\n                date: new Date().toLocaleString().slice(0, -3),\r\n                likes: comment.likes,\r\n                isLiked: false,\r\n            };\r\n        })\r\n        // получили данные и рендерим их в приложении\r\n        comments = formatComments;\r\n        (0,_renderModule_js__WEBPACK_IMPORTED_MODULE_0__.renderApp)(comments, token, name);\r\n    })\r\n}\r\n\r\n// POST КОММЕНТАРИЕВ\r\nconst addComment = (comments, token) => {\r\n    const nameInputElement = document.getElementById('name-input')\r\n    const commentInputElement = document.getElementById('comment-input')\r\n    fetch(\"https://webdev-hw-api.vercel.app/api/v2/sam-sukhoi/comments\", {\r\n        method: 'POST',\r\n        headers: {\r\n            Authorization: token,\r\n        },\r\n        body: JSON.stringify({\r\n            name: nameInputElement.value,\r\n            text: commentInputElement.value,\r\n        }),\r\n    })\r\n        .then((response) => {\r\n\r\n            // Ветвление с выбрасыванием ошибки в случае отключенного интернета\r\n            if (response.status === 500) {\r\n                throw new Error('Сервер сломался')\r\n                // ошибка при вводе коротких данных, менее 3 символов в поле имя и в поле комменты\r\n            } else if (response.status === 400) {\r\n                throw new Error('Слишком короткое значение, поле имя и комментарий должно содержать хотя бы 3 символа')\r\n            } else {\r\n                return response.json();\r\n            }\r\n        })\r\n        .then(() => {\r\n            // GET через вызов функции\r\n            return fetchRenderComments(comments, token);\r\n        })\r\n        .then(() => {\r\n            // Отработка функционала кнопки и полей после публикации комментария\r\n            buttonElement.disabled = false;\r\n            buttonElement.textContent = 'Добавить'\r\n            commentInputElement.value = ''\r\n        }).catch((error) => {\r\n            // Alert с ошибкой, в случае, если интернет не функционирует - РАБОТАЕТ\r\n            if (error.message === 'Failed to fetch') {\r\n                alert('Кажется что-то пошло не так, проверьте интернет соединение');\r\n                //  Alert с ошибкой, в случае, если выпала ошибка 500 \r\n            } else if (error === 'Сервер сломался') {\r\n                alert('Кажется что-то пошло не так...');\r\n                // Alert с ошибкой, в случае введения в полях имени и коммента менее 3 символов\r\n            } else if (error.message === \"Слишком короткое значение, поле имя и комментарий должно содержать хотя бы 3 символа\") {\r\n                alert('Минимальное количество символов в полях ввода не менее трех')\r\n            }\r\n            // user exp: возврат активной кнопки после публикации коммента \r\n            buttonElement.disabled = false;\r\n            buttonElement.textContent = 'Добавить'\r\n        })\r\n    ;(0,_renderModule_js__WEBPACK_IMPORTED_MODULE_0__.initLikeButtonOnOff)(comments, token)\r\n\r\n}\r\n\r\nfunction loginUser({ login, password }) {\r\n    return fetch(\"https://webdev-hw-api.vercel.app/api/user/login\", {\r\n        method: 'POST',\r\n        body: JSON.stringify({\r\n            login,\r\n            password,\r\n        }),\r\n    }).then((response) => {\r\n        console.log(response);\r\n        if (response.status === 400) {\r\n            throw new Error('Неверный логин или пароль')\r\n        }\r\n        return response.json();\r\n    });\r\n}\r\n\r\n\r\nfunction registerUser({ login, password, name }) {\r\n    return fetch(\"https://webdev-hw-api.vercel.app/api/user\", {\r\n        method: 'POST',\r\n        body: JSON.stringify({\r\n            login,\r\n            password,\r\n            name,\r\n        }),\r\n    }).then((response) => {\r\n        if (response.status === 400) {\r\n            throw new Error('Такой пользователь уже существует')\r\n        }\r\n        return response.json();\r\n    });\r\n}\r\n\r\n\r\n\r\n// ЭКСПОРТ ФУНКЦИЙ ИЗ МОДУЛЯ\r\n\r\n\n\n//# sourceURL=webpack://jscommentsprogecthw/./api.js?");

/***/ }),

/***/ "./components/login-components.js":
/*!****************************************!*\
  !*** ./components/login-components.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderLoginComponent\": () => (/* binding */ renderLoginComponent)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./api.js\");\n\r\n\r\nfunction renderLoginComponent({ appEl, setToken, fetchRenderComments, comments, setUser }) {\r\n  let isLoginMode = true;\r\n\r\n\r\n  // Рендер формы авторизации/регистрации\r\n  const renderForm = () => {\r\n\r\n    const appHtml = `\r\n    <div class=\"form\">\r\n    <h3 class=\"form-title\">Форма ${isLoginMode ? \"входа\" : \"регистрации\"}</h3>\r\n        <div class=\"form-row\">\r\n        ${isLoginMode ? '' : ' <input type=\"text\" id=\"name-input\" class=\"userinput\" placeholder = Имя> <br>'\r\n      }\r\n        <input type=\"text\" id=\"login-input\" class=\"userinput\" placeholder = 'Логин'>\r\n        <br>\r\n        <input type=\"password\" id=\"password-input\" class=\"userinput\" placeholder = 'Пароль'>\r\n        </div>\r\n        <button class=\"button\" id='login-button'>${isLoginMode ? \"Войти\" : \"Зарегистрироваться\"}</button>\r\n        <button class=\"toggle\" id='toggle-button'>Перейти ${isLoginMode ? \"к регистрации\" : \"ко входу\"}</button> \r\n        </div>  \r\n    `\r\n    appEl.innerHTML = appHtml;\r\n\r\n    document.getElementById('login-button').addEventListener('click', () => {\r\n\r\n      const login = document.getElementById('login-input').value;\r\n      const password = document.getElementById('password-input').value;\r\n\r\n      if (isLoginMode) {\r\n        if (!login) {\r\n          alert('Введите логин')\r\n          return\r\n        }\r\n\r\n        if (!password) {\r\n          alert('Введите пароль')\r\n          return\r\n        }\r\n        // Форма регистрации LOGIN\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)({\r\n          login: login,\r\n          password: password,\r\n        }).then((user) => {\r\n          console.log(user.user.name);\r\n          setToken(`Bearer ${user.user.token}`);\r\n          setUser(user.user);\r\n          fetchRenderComments(comments, `Bearer ${user.user.token}`, user.user.name);\r\n        }).catch((error) => {\r\n       console.log(error);\r\n          alert(error.message);\r\n        });\r\n\r\n      } else {\r\n        const login = document.getElementById('login-input').value;\r\n        const password = document.getElementById('password-input').value;\r\n        let name = document.getElementById('name-input').value;\r\n        // name=user\r\n\r\n        if (!name) {\r\n          alert('Введите имя');\r\n          return;\r\n        }\r\n\r\n        if (!login) {\r\n          alert('Введите логин');\r\n        }\r\n        if (!password) {\r\n          alert('Введите пароль');\r\n          return;\r\n        }\r\n        // Форма регистрации USER\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({\r\n          login: login,\r\n          password: password,\r\n          name: name,\r\n        }).then((user) => {\r\n          setToken(`Bearer ${user.user.token}`);\r\n          setUser(user.user);\r\n          fetchRenderComments(comments, `Bearer ${user.user.token}`, user.user.name);\r\n        }).catch((error) => {\r\n          alert(error.message);\r\n        });\r\n      }\r\n    });\r\n\r\n    document.getElementById('toggle-button').addEventListener('click', () => {\r\n      isLoginMode = !isLoginMode;\r\n      renderForm();\r\n    });\r\n  }\r\n  renderForm();\r\n}\n\n//# sourceURL=webpack://jscommentsprogecthw/./components/login-components.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sanitizeHtml.js */ \"./sanitizeHtml.js\");\n/* harmony import */ var _renderModule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderModule.js */ \"./renderModule.js\");\n\r\n\r\n\r\n\r\n// План\r\n// 1.Перенести разметку в модуль (+)\r\n// 2. Сделать форму входа динамической (+)\r\n// 3. Отрефакторить приложение на модули (+)\r\n// 4. Создать форму регистрации (+)\r\n// 5. Оживить форму регистрации (+)\r\n// 6. Авторизация нового пользователя (+)\r\n\r\n// массив Comments, рендерится через API\r\nlet comments = [];\r\n\r\nlet token = null;\r\nlet user = null;\r\n\r\n// FETCH ЗАПРОС В API GET ИЗ МОДУЛЯ\r\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchRenderComments)(comments, token, user);\r\n// РЕНДЕР КОММЕНТОВ ИЗ МОДУЛЯ\r\n(0,_renderModule_js__WEBPACK_IMPORTED_MODULE_2__.renderApp)(comments, token, user);\r\n// ОЧИСТКА КОДА\r\n(0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_1__.sanitizeHtml)();\r\n\r\n\r\nconsole.log(\"It works!\");\n\n//# sourceURL=webpack://jscommentsprogecthw/./index.js?");

/***/ }),

/***/ "./renderModule.js":
/*!*************************!*\
  !*** ./renderModule.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initLikeButtonOnOff\": () => (/* binding */ initLikeButtonOnOff),\n/* harmony export */   \"initReplyListeners\": () => (/* binding */ initReplyListeners),\n/* harmony export */   \"loadingCommentsList\": () => (/* binding */ loadingCommentsList),\n/* harmony export */   \"renderApp\": () => (/* binding */ renderApp)\n/* harmony export */ });\n/* harmony import */ var _sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitizeHtml.js */ \"./sanitizeHtml.js\");\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate.js */ \"./validate.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _components_login_components_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login-components.js */ \"./components/login-components.js\");\n\r\n\r\n\r\n\r\n\r\n// Строка загрузки комментов\r\nfunction loadingCommentsList(comments) {\r\n    const containerElement = document.querySelector('.container');\r\n    if (comments.length === 0) {\r\n        containerElement.insertAdjacentHTML(\"afterbegin\", \"<span>Подождите, список загружается...</span>\")\r\n    }\r\n}\r\n\r\nconst renderApp = (comments, token, user) => {\r\n\r\n    const appEl = document.getElementById('app');\r\n\r\n\r\n\r\n    const commentsHtml = comments.map((comment, index) => {\r\n        return `<li class = 'comment'  data-index=\"${index}\"><div class = 'comment-header'><div>${(0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitizeHtml)(comments[index].name)}</div><div>${comments[index].date}</div></div>\r\n      <div class=\"comment-body\" ><div class = 'comment-text' data-index=\"${index}\">${(0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitizeHtml)(comments[index].text)}</div></div><div class ='comment-footer'><div class=\"likes\">\r\n            <span class=\"likes-counter\" >${comments[index].likes}</span>\r\n            <button class=\"like-button ${comments[index].isLiked}\" data-index=\"${index}\"></button>\r\n          </div></div></li>`\r\n\r\n    }).join('')\r\n    // ФОРМА ПРИЛОЖЕНИЯ\r\n\r\n    \r\n    const appHtml = `\r\n        <div class=\"container\">\r\n    ${commentsHtml}\r\n        <ul class=\"comments\" id=\"list\">\r\n        </ul>\r\n        ${token ? `<div class=\"add-form\">\r\n        \r\n        <input type=\"text\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" id=\"name-input\" disabled value=\"${user}\" />\r\n        <textarea type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\"\r\n            id=\"comment-input\"></textarea>\r\n        <div class=\"add-form-row\">\r\n            <button class=\"add-form-button\" id=\"buttonElement\">Написать</button>\r\n        </div>`: `<p>Чтобы добавить комментарий, <a class=\"check\" id=\"auth\">авторизуйтесь</a></p>`}`;\r\n    appEl.innerHTML = appHtml;\r\n\r\n    if (!token) {\r\n       \r\n        document.getElementById(\"auth\").addEventListener('click', () => {\r\n            (0,_components_login_components_js__WEBPACK_IMPORTED_MODULE_3__.renderLoginComponent)({\r\n                appEl,\r\n                setToken: (newToken) => {\r\n                    token = newToken;\r\n                },\r\n                setUser: (newUser) => {\r\n                    user = newUser;\r\n                },\r\n                fetchRenderComments: _api_js__WEBPACK_IMPORTED_MODULE_2__.fetchRenderComments,\r\n            });\r\n        });\r\n        return;\r\n    };\r\n\r\n\r\n\r\n    // fetchRenderComments(comments)\r\n    initReplyListeners(comments, token);\r\n    initLikeButtonOnOff(comments, token);\r\n    (0,_validate_js__WEBPACK_IMPORTED_MODULE_1__.validateFn)(comments, token)\r\n\r\n}\r\n\r\n\r\n\r\n\r\n// // кнопка для лайка, с ветвлением при нажатии\r\nconst initLikeButtonOnOff = (comments, token) => {\r\n    const likeButtonElements = document.querySelectorAll('.like-button');\r\n    for (const likeButton of likeButtonElements) {\r\n        likeButton.addEventListener('click', (event) => {\r\n            event.stopPropagation();\r\n            const index = likeButton.dataset.index;\r\n            if (comments[index].isLiked === '-active-like') {\r\n                comments[index].isLiked = '';\r\n                comments[index].likes--;\r\n            } else {\r\n                comments[index].isLiked = '-active-like';\r\n                comments[index].likes++;\r\n            }\r\n            renderApp(comments, token);\r\n        })\r\n    }\r\n}\r\n// Функция реплая \r\nconst initReplyListeners = (comments, token) => {\r\n    const commentInputElement = document.getElementById('comment-input')\r\n    const replyClicks = document.querySelectorAll('.comment'); {\r\n        for (const replyClick of replyClicks) {\r\n            replyClick.addEventListener('click', () => {\r\n                const index = replyClick.dataset.index;\r\n                commentInputElement.value =\r\n                    `>${comments[index].text} \r\n   ${comments[index].name},`;\r\n            });\r\n        }\r\n    }\r\n}\r\n\r\n\r\n// ЭКСПОРТ ФУНКЦИЙ ИЗ МОДУЛЯ\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://jscommentsprogecthw/./renderModule.js?");

/***/ }),

/***/ "./sanitizeHtml.js":
/*!*************************!*\
  !*** ./sanitizeHtml.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sanitizeHtml\": () => (/* binding */ sanitizeHtml)\n/* harmony export */ });\nfunction sanitizeHtml(htmlString = \"\") {\r\n    return htmlString.replaceAll(\"<\", \"&lt;\").replaceAll(\">\", \"&gt;\");\r\n  }\r\n\r\n  // ЭКСПОРТ ФУНКЦИИ ИЗ МОДУЛЯ\r\n  \n\n//# sourceURL=webpack://jscommentsprogecthw/./sanitizeHtml.js?");

/***/ }),

/***/ "./validate.js":
/*!*********************!*\
  !*** ./validate.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validateFn\": () => (/* binding */ validateFn)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\r\n\r\n\r\n\r\nfunction validateFn(comments, token) {\r\n\r\n    const buttonElement = document.getElementById('buttonElement');\r\n    const nameInputElement = document.getElementById('name-input');\r\n    const commentInputElement = document.getElementById('comment-input');\r\n\r\n\r\n    buttonElement.addEventListener('click', () => {\r\n\r\n        nameInputElement.classList.remove('error')\r\n        commentInputElement.classList.remove('error')\r\n        if (commentInputElement.value === '' && nameInputElement.value === \"\") {\r\n            nameInputElement.classList.add('error')\r\n            commentInputElement.classList.add('error')\r\n            return;\r\n        } else if (commentInputElement.value === '') {\r\n            commentInputElement.classList.add('error')\r\n            return;\r\n        } else if (nameInputElement.value === '') {\r\n            nameInputElement.classList.add('error')\r\n            return\r\n        }\r\n\r\n        // отключение кнопки до завершения публикации нового коммента и замена содержимого контента на \"Выполняется...\"\r\n        buttonElement.disabled = true;\r\n        buttonElement.textContent = 'Выполняется...'\r\n\r\n        ;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.addComment)(comments, token);\r\n    });\r\n\r\n}\n\n//# sourceURL=webpack://jscommentsprogecthw/./validate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;