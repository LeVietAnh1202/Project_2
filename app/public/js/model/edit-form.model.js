import FloatForm from "./float-form.model.js";

class EditForm extends FloatForm {
    constructor(title, content) {
        super(title, content, 'btn-edit', 'Lưu', 'edit-form');
    }
}

export default EditForm;