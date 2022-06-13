import includeHTML from "./util/include-html.js";
import login from "./login.js";
import loadingScreen from "./loading-screen.js";
import header, {updateUserInfor} from "./header.js";
import sideBar from "./sidebar.js";
import searchBox from "./search-box.js";
import updateDatabase from "./update-database.js";
import account from "./account/account.js";
import router from "./router/sidebar.route.js";

async function main(param) {
    // await login(() => {
    //     console.log('login done')
    //     includeHTML(async () => {
    //         header();
    //         updateUserInfor();
    //         await sideBar();
    //         loadingScreen();
    //         searchBox();
    //     });
    // });

    includeHTML(async () => {
        $('.header__body').remove();
        router();
        header();
        updateUserInfor();
        await sideBar('?page_name=CMS');
        loadingScreen();
        searchBox();
    });
};

main();



