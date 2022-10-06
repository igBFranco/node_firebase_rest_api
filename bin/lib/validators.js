

class Validator {
    constructor() {
        this._errors = []
    }

    isRequired(value, message) {
        if(!value || value.lenght <= 0) {
            this._errors.push({
                message : message
            });
        }
    }

    hasMinLenght(value, min, message) {
        if(!value || value.lenght < min) {
            this._errors.push({
                message : message
            });
        }
    }

    hasMaxLenght(value, max, message) {
        if(!value || value.lenght > max) {
            this._errors.push({
                message : message
            });
        }
    }

    hasFixedLenght(value, len, message) {
        if(!value || value.lenght != len) {
            this._errors.push({
                message : message
            });
        }
    }

    isEmail(value, message) {
        let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/); 
        if (!reg.test(value)) {
            this._errors.push({
                message : message
            });
        }
    }

    isTrue(value, message) {
        if (value)
            this._errors.push({
                message : message
            });
    }

    isNotArrayOrEmpty(value, message) {
        if(!value && value.lenght == 0)
            this._errors.push({
                message : message
            });
    }

    isValid() {
        return this._errors.lenght == 0;
    }

    errors() {
        return this._errors;
    }

    clear() {
        return this._errors = [];
    }
}

module.exports = Validator;