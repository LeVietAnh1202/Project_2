function showPassword() {
    const iconShow = $('.fa-eye');
    const inputPassword = $('input[type=password]');
    const originUrl = window.location.origin;
    var postApiLogin = originUrl + '/api' + '/login';
    var homeUrl = originUrl + '/home';

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

    $('.form-login__button').click(function () {
        console.log('da submit')
        // $.post('http://localhost:1202/api/login', $('.form-login').serialize(), function(data) {
        //      // ... do something with response from server
        //      console.log(data);
        //    },
        //    'json' // I expect a JSON response
        // );
        // window.location.href = 'http://localhost:1202/home';

        $('.form-login').submit((e) => {
            e.preventDefault();
            return true;
        })

        $.ajax({
            url: postApiLogin,
            type: 'post',
            dataType: 'json',
            data: $('.form-login').serialize(),
            success: function (data) {
                console.log(data);
                console.log(data.check_login);
                if (data.check_login == 1) {
                    window.location.href = homeUrl;
                }
                else {
                    console.log('false')
                }
            }
        });
    });
}

export default () => {
    $(document).ready(() => {
        showPassword();
    });
}