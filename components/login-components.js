import { loginUser, loginUser as registerUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchRenderComments, comments }) {
  let isLoginMode = true;

  // const renderUnauthorizedApp = () => {

  // }

  const renderForm = () => {

    const appHtml = `
    <div class="form">
    <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
        <div class="form-row">
        ${isLoginMode ? '' : ' <input type="text" id="name-input" class="userinput" placeholder = Имя> <br>'
      }
        <input type="text" id="login-input" class="userinput" placeholder = 'Логин'>
        <br>
        <input type="password" id="password-input" class="userinput" placeholder = 'Пароль'>
        </div>
        <button class="button" id='login-button'>${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
        <button class="toggle" id='toggle-button'>Перейти ${isLoginMode ? "к регистрации" : "ко входу"}</button> 
        </div>  
    `
    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {

      const login = document.getElementById('login-input').value;
      const password = document.getElementById('login-input').value;

      if (isLoginMode) {
        if (!login) {
          alert('Введите логин')
          return
        }

        if (!password) {
          alert('Введите пароль')
          return
        }

        // Форма регистрации LOGIN
        loginUser({
          login: login,
          password: password,
        }).then((user) => {
          setToken(`Bearer ${user.user.token}`);
          fetchRenderComments(comments, 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck');
        }).catch((error) => {
          // Выводить алерт
          alert(error.message);
        });

      } else {
        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;
        const name = document.getElementById('name-input').value;

        if (!name) {
          alert('Введите имя');
          return;
        }

        if (!login) {
          alert('Введите логин');
        }
        if (!password) {
          alert('Введите пароль');
          return;
        }


// Форма регистрации USER
        registerUser({
          login: login,
          password: password,
          name: name,
        }).then((user) => {
          setToken(`Bearer ${user.user.token}`);
          fetchRenderComments(comments, 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck');
        }).catch((error) => {
           console.log(error);
          alert(error.message);
        });
      }
    });

    document.getElementById('toggle-button').addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  }
  renderForm();
}