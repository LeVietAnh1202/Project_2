function includeHTML(callback) {
    var i, elem, file, xhttp; // Khởi tạo các biến

    // Lấy tất cả các thẻ có class là include-html (Như ở trên mình định nghĩa 2 thẻ để include header/footer)
    var includeFiles = document.getElementsByClassName('include-html');

    // Duyệt vòng lặp từ mảng phần tử ở trên
    for (i = 0; i < includeFiles.length; i++) {
        elem = includeFiles[i]; // Gán biến elem bằng thẻ đang được duyệt
        file = elem.getAttribute("data-file"); // Gán biến file là attribute của thẻ đang được duyệt

        if (file) { // Kiểm tra nếu tồn tại attribute này thì thực hiện tiếp
            xhttp = new XMLHttpRequest(); // Khởi tạo request
            xhttp.onreadystatechange = function () {
                // Lắng nghe event khi request kết thúc
                if (this.readyState == 4) {
                    // Nếu status là 200 (thành công) thì set nội dung của file vào thẻ đang được duyệt
                    if (this.status == 200) { elem.innerHTML = this.responseText; }

                    // Nếu status 404 (lỗi) thì hiển thị nội dung lỗi không thấy component
                    if (this.status == 404) { elem.innerHTML = "Component not found."; }

                    // Sau khi duyệt xong thẻ này thì xoá class include-html 
                    elem.classList.remove("include-html");

                    // Gọi lại function includeHTML để duyệt tất cả các thẻ có class include-html còn lại
                    includeHTML(callback);
                }
            }
            // Tạo và gửi request
            xhttp.open("GET", file, true);
            xhttp.send();

            return; // Thoát function
        }
    }
    callback();
};

export default includeHTML;