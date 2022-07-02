import FloatForm from "./float-form.model.js";

class EditForm extends FloatForm {
    constructor(title, content, api, enctype) {
        super(title, content, 'btn-edit', 'Lưu', 'edit-form', api, enctype);
    }
}

export default EditForm;