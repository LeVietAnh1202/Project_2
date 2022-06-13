import FloatForm from "./float-form.model.js";

class ConfirmDelete extends FloatForm {
    constructor(title, content) {
        super(title, content, 'btn-agree', 'Đồng ý', 'confirm-delete');
        this.confirmClass = 'confirm-delete';
    }
}

export default ConfirmDelete;