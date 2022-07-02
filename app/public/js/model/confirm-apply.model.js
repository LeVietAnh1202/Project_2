import FloatForm from "./float-form.model.js";

class ConfirmApply extends FloatForm {
    constructor(title, content, api) {
        super(title, content, 'btn-agree', 'Đồng ý', 'confirm-apply', api);
        this.confirmClass = 'confirm-apply';
    }
}

export default ConfirmApply;