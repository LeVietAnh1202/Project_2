// Gọi api lấy dữ liệu
export default async function getApi(api, callback) {
    await fetch(api)
        .then(function (res) {
            return res.json();
        })
        .then(callback);
}