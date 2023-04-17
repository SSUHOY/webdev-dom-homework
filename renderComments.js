import { comments } from "./data";

const renderCommentsData = () => {
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

export {renderCommentsData};