import getApi from '../util/getApi.js';

class SearchForm {
    constructor(obj) {
        this.content = obj.content;
    }

    createForm() {
        const buttonSearch = $('<button>', {
            class: 'btn btn-primary',
            type: 'submit'
        }).text('Tìm kiếm');

        const html = $('<form>', {
            name: 'form-search',
            class: 'container pb-4 pt-4',
            // enctype: 'multipart/form-data'
        }).html(this.content)
            .append(buttonSearch);

        const formSearch = $('form[name="form-search"]')[0];

        if (formSearch) {
            formSearch.remove();
        }
        $('.search .heading').after(html)
    }

    async search(api, renderDb) {
        const form = $('form[name="form-search"]');

        form.submit(function (e) {
            console.log('Search');

            $.ajax({
                url: api,
                type: 'post',
                dataType: 'json',
                // data: new FormData(this),
                data: form.serialize(),
                // processData: false,
                // contentType: false,
                success: function (result) {
                    console.log(result);
                    renderDb(result);
                },
                fail: function (err) {
                    console.log(err);
                }
            });

            // getApi(getApiSearchAccount, renderDb);
            e.preventDefault();
            return false;
        });
    }
}

export default SearchForm;