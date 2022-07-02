import FloatForm from "./float-form.model.js";

class InsertForm extends FloatForm {
    constructor(title, content, api, enctype) {
        super(title, content, 'btn-insert', 'Thêm mới', 'insert-form', api, enctype);
    }
}

export default InsertForm;