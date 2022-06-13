// let pageActive = $('.page-number li:nth-child(2)');
// const pageNumberLast = $('.page-number li:nth-last-child(2)').text();
// let pageNumberSelected;
// const pageList = $('.page-number li:not(:first-child, :last-child)');
// const previous = $('.page-number li:first-child');
// const next = $('.page-number li:last-child');

let pageActive, pageNumberLast, pageNumberSelected, pageList, previous, next;

function selectPageNumber() {
    // Chọn trang muốn hiển thị
    pageList.click((e) => {
        pageNumberSelected = $(e.target);   // Thẻ li của trang được chọn
        changePageNumber()
    });

    // Bấm nút Privious để chọn trang trước đó
    previous.click(() => {
        pageNumberSelected = pageActive.prev();
        changePageNumber();
    });

    // Bấm nút next để chọn trang tiếp theo
    next.click(() => {
        pageNumberSelected = pageActive.next();
        changePageNumber();
    });

}

// Đổi active sang trang được chọn
function activePageNumber() {
    console.assert('1');
    pageActive.removeClass('active');
    pageNumberSelected.addClass('active');
    pageActive = pageNumberSelected;
}

// Nếu trang đầu tiên được chọn thì hủy kích hoạt nút Previous
function checkPrevious() {
    console.assert('2');
    if (pageActive.text() != 1) {
        previous.removeClass('disabled');
    }
    else {
        previous.addClass('disabled');
    }
}

// Nếu trang cuối cùng được chọn thì hủy kích hoạt nút Next
function checkNext() {
    console.assert('3');
    if (pageActive.text() != pageNumberLast) {
        next.removeClass('disabled');
    }
    else {
        next.addClass('disabled');
    }
}

function changePageNumber() {
    activePageNumber();
    checkPrevious();
    checkNext();
}

export default function pageNumber() {
    pageActive = $('.page-number li:nth-child(2)');
    pageNumberLast = $('.page-number li:nth-last-child(2)').text();
    pageList = $('.page-number li:not(:first-child, :last-child)');
    previous = $('.page-number li:first-child');
    next = $('.page-number li:last-child');

    selectPageNumber();
}