const heart = $('.fa-heart-o');

export default function() {
    heart.click((e) => {
        $(e.target).toggleClass('fa-heart-o');
        $(e.target).toggleClass('fa-heart');
        // btnFollow.text(btnFollow.hasClass('fa-heart-o') ? "Theo dõi công ty" : "Đang theo dõi");
    })
}