import FloatForm from "./float-form.model.js";

class InsertForm extends FloatForm {
    constructor(title, content) {
        super(title, content, 'btn-insert', 'Thêm mới', 'insert-form');
    }
}

export default InsertForm;