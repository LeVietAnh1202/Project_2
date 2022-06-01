import login from "./login.js";
import loadingScreen from "./loading-screen.js";
import header from "./header.js";
import sideBar from "./sidebar.js";
import searchBox from "./search-box.js";
import updateDatabase from "./update-database.js";
import account from "./account/account.js";

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
            console.log(file)
            // Tạo và gửi request
            xhttp.open("GET", file, true);
            xhttp.send();

            return; // Thoát function
        }
    }
    // const headerAvatar = document.querySelector('.header__avatar');
    // console.log('fn');
    // console.log(headerAvatar)
    callback();
};
// console.time('test')
// const mainFn = async () => {
//     const va = await includeHTML();
//     console.timeEnd('test')
//     // await header();
//     // console.timeEnd('test1')
// };

// // mainFn().then(header);
// console.log(mainFn())

// var promise = new Promise(function(resolve, reject) {
//     includeHTML();
//     resolve("success");
// });

// promise.then(function (data) {header(data)}, () => {});
console.time('test')

login();

includeHTML(async () => {
    header();
    await sideBar();
    loadingScreen();
    searchBox();
    // updateDatabase();
    //account();
    
})


