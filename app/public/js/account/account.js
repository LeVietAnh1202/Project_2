import Table from "../table.js";

const originUrl = window.location.origin;
const getAllAcount = originUrl + '/api/account/get-all';

// Lấy dữ liệu từ database và tạo sidebar
async function start() {
    await getApi(getAllAcount, createTbl);
}

// Gọi api lấy dữ liệu
async function getApi(api, callback) {
    await fetch(api)
        .then(function (res) {
            return res.json();
        })
        .then(callback);
}

function createTbl(allAccount) {
    var tblAccount = new Table(['Role name', 'Account', 'Password', 'Avatar', 'Full name', 'Gender']);
    // window.onpopstate = function() {
        // console.log('onpopstate')
        // if (window.location.href == "http://localhost:1202/internship/summary")
            tblAccount.createTbl(allAccount.recordset, 1, 5);
    // }
}

export default async () => {
    await start();
};