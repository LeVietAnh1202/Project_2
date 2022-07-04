const btnFollow = $('.box-follow .btn');

function follow() {
    btnFollow.click(function () {
        btnFollow.toggleClass('btn-follow');
        btnFollow.toggleClass('btn-unfollow');
        btnFollow.text(btnFollow.hasClass('btn-follow') ? "Theo dõi công ty" : "Đang theo dõi");
    })
}

export default follow;