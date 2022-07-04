import FloatForm from "./float-form.model.js";

class ConfirmDelete extends FloatForm {
    constructor(title, content, api) {
        super(title, content, 'btn-agree', 'Đồng ý', 'confirm-delete', api);
        this.confirmClass = 'confirm-delete';
    }
}

export default ConfirmDelete;