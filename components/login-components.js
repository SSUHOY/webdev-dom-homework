import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchRenderComments, comments, token }) {
    // let isLoginMode = false;
    const appHtml = `
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
            Логин
            <input type="text" id="login-input" class="input">
            <br>
            Пароль
            <input type="password" id="password-input" class="input">
            </div>
            <br>
            <button class="button" id='login-button'>Войти</button>
            </div>    
        `
    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {
        setToken('Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck');
        // // loadingCommentsList(comments, token)
        // fetchRenderComments(comments,'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck')

        loginUser({
            login:'admin',
            password:'admin',
        }).then((user) => {
                console.log(user);
                setToken(`Bearer ${user.token}`);
                fetchRenderComments(comments, 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck');
            });
    })
}