import Validate from "./validate.js";

function openCloseSearchForm() {
    const angle_double_up = $('.fa-angle-double-up');
    
    angle_double_up.click((e) => {
        const form = $(e.currentTarget).parent().next();
        form.toggle();
    });
}

function validateSearchForm() {
    let validate = new Validate("form-search", {
        rules: {
            user: {
                required: true,
				maxlength: 15
            }
        },
        message: {
            "user": {
				required: "Bắt buộc nhập username",
				maxlength: "Hãy nhập tối đa 15 ký tự"
			}
        }
    });

    validate.printf();
    validate.submit();
}

export default () => {
    openCloseSearchForm();
    // validateSearchForm();
};