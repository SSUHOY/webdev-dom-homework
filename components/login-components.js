import { loginUser, registerUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchRenderComments, comments, setUser }) {
  let isLoginMode = true;


  // Рендер формы авторизации/регистрации
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
      const password = document.getElementById('password-input').value;

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
          console.log(user.user.name);
          setToken(`Bearer ${user.user.token}`);
          setUser(user.user);
          fetchRenderComments(comments, `Bearer ${user.user.token}`, user.user.name);
        }).catch((error) => {
       console.log(error);
          alert(error.message);
        });

      } else {
        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;
        let name = document.getElementById('name-input').value;
        // name=user

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
          setUser(user.user);
          fetchRenderComments(comments, `Bearer ${user.user.token}`, user.user.name);
        }).catch((error) => {
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