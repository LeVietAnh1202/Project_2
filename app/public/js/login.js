import router from './router/sidebar.route.js';

function submitLogin() {
    const originUrl = window.location.origin;
    const postApiLogin = originUrl + '/api' + '/login';
    const homeUrl = originUrl + '/home';
    const jobUrl = originUrl + '/job';
    const lecturerUrl = originUrl + '/lecturer';

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
                            role_id: data.role_id,
                            full_name: data.full_name,
                            account: data.account,
                            avatar: data.avatar,
                            cover_image: data.cover_image
                        }), "SecretAdvmln"
                    );
                    localStorage.setItem('account', encrypted);
                    
                        switch (Number(data.role_id)) {
                            case 1:
                                window.location.href = homeUrl;
                                break;
                            case 2:
                                window.location.href = lecturerUrl;
                                break;
                            case 3:
                                window.location.href = jobUrl;
                                break;
                        }
                }
                else {
                    alert('Đăng nhập thất bại!');
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