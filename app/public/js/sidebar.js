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
const ipConfig = '192.168.1.7';
const ipDeploy = window.location.href
// var sidebarApi = `http://${ipConfig}:3000/search`;
var sidebarApi = `${ipDeploy}search`;
console.log(sidebarApi)

async function start() {
    await getApi(sidebarApi, sideBar_render);
}

async function getApi(api, callback) {
    await fetch(api)
        .then(function (res) {
            
            return res.json();
        })
        .then(callback);
}

function sideBar_render(sideBar_arr) {
    console.log(sideBar_arr)
    let sideBar = $('.sidebar');
    let sideBar_html = '<ul>';
    
    sideBar_arr.map((menu_db, menu_i) => {
        sideBar_html += menu_i == 0 ? '<li class="active">' : '<li>';
        let submenu_arr = menu_db.submenu_arr;
        if ($.isEmptyObject(submenu_arr[0])) {
            sideBar_html += `
                    <a href="#" class="menu-link">${menu_db.menu_name}</a>
                </li>`
        }
        else {
            sideBar_html += `
                <a href="#submenu_${menu_i}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle menu-link">${menu_db.menu_name}</a>
                <ul class="collapse list-unstyled" id="submenu_${menu_i}">
            `
            submenu_arr.map((submenu_db, submenu_i) => {
                sideBar_html += `<li><a href="#" class="submenu-link">${submenu_db.submenu_name}</a></li>`;
            })

            sideBar_html += '</ul></li>';
        }
    });

    sideBar_html += '</ul>';
    sideBar.html(sideBar_html);
    
}

function selectMenuItem() {
    let menuLinkListParent = $('.menu-link').parent();
    let menuLinkList = $('.menu-link');
    let submenuLinkList = $('.submenu-link');

    console.log(menuLinkList)

    menuLinkList.each((index, value) => {
        $(value).click(() => {
            if (!$(value).hasClass('dropdown-toggle')) {
                removeClass(menuLinkListParent, 'active');
                removeClass(submenuLinkList, 'active');
                $(value).parent().addClass('active');
            }
            else {
                activeSubmenu();
            }
        });
    });

    function removeClass(listElement, className) {
        listElement.each((index, value) => {
            if ($(value).hasClass(className)) {
                $(value).removeClass(className);
                return false;   // Break out each loop
            }
        });
    }

    function activeSubmenu() {
        submenuLinkList.each((index, value) => {
            $(value).click(() => {
                removeClass(menuLinkListParent, 'active');
                removeClass(submenuLinkList, 'active');
                $(value).parent().parent().parent().addClass('active');
                $(value).addClass('active');
            });
        });
    }
}

export default async function sideBar_Fn() {
    await start();
    // $('.sidebar').html("<h1 style='color: white'>Hello</h1>")
    selectMenuItem();
    console.timeEnd('test')
    // setTimeout(selectMenuItem, 5000);
    
}