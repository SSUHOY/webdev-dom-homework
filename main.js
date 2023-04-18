const listElement = document.getElementById('list');
const buttonElement = document.getElementById('buttonElement')
const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')
const containerElement = document.querySelector('.container');

// массив Comments, рендерится через API
let comments = [];

// Рендер комментов на основе массива
const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class = 'comment'  data-index="${index}"><div class = 'comment-header'><div>${sanitizeHtml(comments[index].name)}</div><div>${comments[index].date}</div></div>
    <div class="comment-body" ><div class = 'comment-text' data-index="${index}">${sanitizeHtml(comments[index].text)}</div></div><div class ='comment-footer'> <div class="likes">
          <span class="likes-counter" >${comments[index].likes}</span>
          <button class="like-button ${comments[index].isLiked}" data-index="${index}"></button>
        </div></div></li>`

  }).join('')
  listElement.innerHTML = commentsHtml;
  initReplyListeners();
  initLikeButtonOnOff();
}

// Функция при загрузке комментов показывать строку

function loadingCommentsList() {
  if (comments.length === 0) {
    containerElement.insertAdjacentHTML("afterbegin", "<span>Подождите, список загружается...</span>")
  }
}


// Берем данные из массива с помощью GET и загружаем на сервер
// Подписываемся на успешное завершение запроса с помощью then, обьявление промиса с методом 'GET' через функцию

const fetchRenderComments = () => {
  loadingCommentsList();
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
    console.log(formatComments);
    // получили данные и рендерим их в приложении
    comments = formatComments;
    renderComments();
    const span = containerElement.querySelector("span");
    span.remove();
  })
}
fetchRenderComments();

// Очистка кода , доработал функцию вызова проверки кода на теги

function sanitizeHtml(htmlString = "") {
  return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
sanitizeHtml();

//  Валидация значений при вводе
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

  // добавление нового комментария и загрузка в сервер API

  const addComment = () => {
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
        return fetchRenderComments();
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
    renderComments();
    initLikeButtonOnOff();
    renderComments();
  }
  addComment();
});


// кнопка для лайка, с ветвлением при нажатии

const initLikeButtonOnOff = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');
  for (const likeButton of likeButtonElements) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      if (comments[index].isLiked == '-active-like') {
        comments[index].isLiked = '';
        comments[index].likes--;
      } else {
        comments[index].isLiked = '-active-like';
        comments[index].likes++;
      }
      renderComments();
    })
  }
}

// клик по комментарию добавляется в поле ввода: цитирование

const initReplyListeners = () => {
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
initReplyListeners();
initLikeButtonOnOff();
renderComments();

console.log("It works!");