import FloatForm from "./float-form.model.js";

class Success extends FloatForm {
    constructor(title, content, api) {
        super(title, content, null, null, 'success-notification', api);
        this.confirmClass = 'success-notification';
    }
}

export default Success;