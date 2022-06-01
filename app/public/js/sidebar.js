// let sideBar_arr = [
//     {
//         "menu_name": "Quản lý tuyển dụng",
//         "submenu_arr":
//             [
//                 "Quản lý tin tuyển thực tập",
//                 "Quản lý sinh viên xét tuyển"
//             ],
//     },
//     {
//         "menu_name": "Thông tin doanh nghiệp",
//         "submenu_arr": [],
//     },
//     {
//         "menu_name": "Quản lý thực tập",
//         "submenu_arr":
//             [
//                 "Quản lý phân công",
//                 "Đánh giá quá trình",
//                 "Đánh giá tổng kết",
//             ],
//     },
//     {
//         "menu_name": "Quản lý tài khoản",
//         "submenu_arr": [],
//     },
// ];

import router from "./router/sidebar.route.js";
import account from "./account/account.js";

const originUrl = window.location.origin;
const sidebarApi = originUrl + '/api/sidebar';

// Lấy dữ liệu từ database và tạo sidebar
async function start() {
    await getApi(sidebarApi, sideBar_render);
}

// Gọi api lấy dữ liệu
async function getApi(api, callback) {
    await fetch(api)
        .then(function (res) {

            return res.json();
        })
        .then(callback);
}

// Tạo và hiển thị sidebar
function sideBar_render(sideBar_arr) {
    const sideBar = $('.sidebar');
    let sideBar_html = '<ul>';

    sideBar_arr.map((menu_db, menu_i) => {
        sideBar_html += menu_i == 0 ? '<li class="active">' : '<li>';
        let submenu_arr = menu_db.submenu_arr;
        console.log(menu_db)
        if ($.isEmptyObject(submenu_arr[0])) {
            sideBar_html += `
                    <a href="" data-link="${menu_db.menu_url}" class="menu-link">${menu_db.menu_item_name}</a>
                </li>`
        }
        else {
            sideBar_html += `
                <a href="#submenu_${menu_i}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle menu-link">${menu_db.menu_item_name}</a>
                <ul class="collapse" id="submenu_${menu_i}">
            `
            submenu_arr.map((submenu_db, submenu_i) => {
                sideBar_html += `<li><a href="" data-link="${submenu_db.submenu_url}" class="submenu-link">${submenu_db.submenu_item_name}</a></li>`;
            })

            sideBar_html += '</ul></li>';
        }
    });

    sideBar_html += '</ul>';
    sideBar.html(sideBar_html);
}

function changeUrlAndRouting(pathName) {
    const urlPushState = originUrl + pathName;
    window.history.pushState({}, '', urlPushState);
    router();
}

// Active các menu và submenu được chọn ở sidebar
function selectMenuItem() {
    const menuLinkListParent = $('.menu-link').parent();
    const menuLinkList = $('.menu-link');
    const submenuLinkList = $('.submenu-link');

    menuLinkList.each((index, value) => {
        $(value).click(() => {
            // Nếu menu này không có các submenu thì các menu được chọn
            if (!$(value).hasClass('dropdown-toggle')) {
                removeClass(menuLinkListParent, 'active');  // Xóa class active của menuLink
                removeClass(submenuLinkList, 'active');     // Xóa class active của submenuLink

                const menuLink = $(value);

                menuLink.parent().addClass('active');       // Thêm class active cho menuLink

                // Thay đổi nội dung ở thanh navbar
                $('.nav-address ul').html(`
                    <li><a href="#">Trang chủ</a></li>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <li><a href="">${menuLink.text()}</a></li>
                `);

                const pathName = menuLink.attr('data-link');
                changeUrlAndRouting(pathName);
                return false;
            }
            // Ngược lại chọn submenu và active submenu đấy
            else {
                activeSubmenu();
            }
        });
    });

    // Xóa 'className' ở phần tử đầu tiên trong 'listElement' có class là 'className'
    function removeClass(listElement, className) {
        listElement.each((index, value) => {
            if ($(value).hasClass(className)) {
                $(value).removeClass(className);
                return false;   // Thoát vòng lặp for each
            }
        });
    }

    // Active các menu và submenu được chọn
    function activeSubmenu() {
        submenuLinkList.each((index, value) => {
            $(value).click(() => {
                removeClass(menuLinkListParent, 'active');  // Xóa class active của menuLink
                removeClass(submenuLinkList, 'active');     // Xóa class active của submenuLink

                const submenuLink = $(value);
                const menuLink = submenuLink.parent().parent().prev();

                menuLink.parent().addClass('active');       // Thêm class active cho menuLink
                submenuLink.addClass('active');             // Thêm class active cho submenuLink

                // Thay đổi nội dung ở thanh navbar
                $('.nav-address ul').html(`
                    <li><a href="#">Trang chủ</a></li>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <li><a href="">${menuLink.text()}</a></li>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <li><a href="">${submenuLink.text()}</a></li>
                `);

                const pathName = submenuLink.attr('data-link');
                changeUrlAndRouting(pathName);
                return false;
            });
        });
    }
}

export default async function sideBar_Fn() {
    await start();
    selectMenuItem();
    console.timeEnd('test')

    $('.fa-bars').click(() => {
        $('.sidebar').toggle();
    });
}