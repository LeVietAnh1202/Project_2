import router from './router/sidebar.route.js';

function submitLogin() {
    const originUrl = window.location.origin;
    const postApiLogin = originUrl + '/api' + '/login';
    const homeUrl = originUrl + '/home';

    $('.form-login__button').click(function () {
        $('.form-login').submit((e) => {
            e.preventDefault();
            return false;
        })

        $.ajax({
            url: postApiLogin,
            type: 'post',
            dataType: 'json',
            data: $('.form-login').serialize(),
            success: function (data) {
                if (data.check_login == 1) {
                    const encrypted = CryptoJS.AES.encrypt(
                        JSON.stringify({
                            full_name: data.full_name,
                            account: data.account,
                            avatar: data.avatar
                        }), "SecretAdvmln"
                    );
                    localStorage.setItem('account', encrypted);
                    if (data.account == '10120620')                 // nmd
                        window.location.href = originUrl + '/nmd';  // nmd
                    else window.location.href = homeUrl;
                }
                else {
                    alert('login fail')
                }
            }
        });
    });
}

function showPassword() {
    const iconShow = $('.fa-eye');
    const inputPassword = $('input[type=password]');

    iconShow.click(() => {
        if (iconShow.hasClass('fa-eye')) {
            iconShow.removeClass('fa-eye');
            iconShow.addClass('fa-eye-slash');
            inputPassword.attr('type', 'text');
        }
        else {
            iconShow.removeClass('fa-eye-slash');
            iconShow.addClass('fa-eye');
            inputPassword.attr('type', 'password');
        }
    });
}

function loginFn() {
    showPassword();
    submitLogin();
}

export default loginFn();