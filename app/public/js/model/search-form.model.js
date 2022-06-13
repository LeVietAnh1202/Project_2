class SearchForm {
    constructor (obj) {
        this.content = obj.content;
    }

    createForm() {
        const buttonSearch = $('<button>', {
            class: 'btn btn-primary',
            type: 'submit'
        }).text('Tìm kiếm');

        const html = $('<form>', {
            name: 'form-search',
            class: 'container pb-4 pt-4'
        }).html(this.content)
        .append(buttonSearch);

        const formSearch = $('form[name="form-search"]')[0];

        if (formSearch) {
            formSearch.remove();
        }
        $('.search .heading').after(html)
    }
}

export default SearchForm;