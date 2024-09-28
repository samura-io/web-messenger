class Validation {
    public form: HTMLFormElement | null = null;
    private inputs: HTMLInputElement[] = [];
    private errors: Record<string, string> = {};
    private data: Record<string, string> = {};

    constructor(formName: string) {
        this.form = this._findForm(formName);
        this.inputs = this._getFormInputs();
        this._addEventListeners();
    }

    private _findForm(formName: string): HTMLFormElement | null {
        return Array.from(document.forms).find(form => form.name === formName) || null;
    }

    private _getFormInputs(): HTMLInputElement[] {
        return Array.from(this.form?.querySelectorAll('input') || []);
    }

    private _checkValidityInput(input: HTMLInputElement): void {
        if (input.validity.valid) {
            this._setValidState(input);
        } else {
            this._setInvalidState(input);
        }
    }

    private _setValidState(input: HTMLInputElement): void {
        input?.classList.remove('invalid');
        delete this.errors[input.name];
        this.data[input.name] = input.value;
        this._removeTextError(input);
    }

    private _setInvalidState(input: HTMLInputElement): void {
        input?.classList.add('invalid');
        this.errors[input.name] = input.validationMessage;
        this._addTextError(input);
    }

    private _addTextError(input: HTMLInputElement, customError?: string): void {
        const errorElement = input.nextElementSibling
            || this.form?.querySelector(`[for="${input.name}"]`);
        if (errorElement) {
            errorElement.textContent = customError || input.validationMessage;
        }
    }

    private _removeTextError(input: HTMLInputElement): void {
        const errorElement = input.nextElementSibling 
            || this.form?.querySelector(`[for="${input.name}"]`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    private _resetValidation(input: HTMLInputElement): void {
        input.classList.remove('invalid');
        this._removeTextError(input);
    }

    private _formSubmit(event: Event): void {
        event.preventDefault();
        this.inputs.forEach(input => {
            this._checkValidityInput(input);
            this._handleCustomValidation(input);
        });

        if (Object.keys(this.errors).length === 0) {
            this._triggerValidationSuccess();
        }
    }

    private _triggerValidationSuccess(): void {
        this._removeEventListeners();
        const validEvent = new CustomEvent('validationSuccess', {
            detail: { form: this.form, fields: this.data }
        });
        this.form?.dispatchEvent(validEvent);
    }

    private _addEventListeners(): void {
        this.inputs.forEach(input => {
            input.addEventListener('blur', this._handleBlur.bind(this, input));
            input.addEventListener('input', this._handleInput.bind(this, input));
        });
        this.form?.addEventListener('submit', this._formSubmit.bind(this));
    }

    private _removeEventListeners(): void {
        this.inputs.forEach(input => {
            input.removeEventListener('blur', this._handleBlur.bind(this, input));
            input.removeEventListener('input', this._handleInput.bind(this, input));
        });
        this.form?.removeEventListener('submit', this._formSubmit.bind(this));
    }

    private _handleBlur(input: HTMLInputElement): void {
        this._checkValidityInput(input);
        this._handleCustomValidation(input);
    }

    private _handleInput(input: HTMLInputElement): void {
        this._resetValidation(input);
    }

    private _handleCustomValidation(input: HTMLInputElement): void {
        if (!this._shouldSkipCustomValidation(input)) {
            this._runCustomValidations(input.name);
        }
    }

    private _shouldSkipCustomValidation(input: HTMLInputElement): boolean {
        return input.getAttribute('only-standart-validate') === 'true';
    }

    private _runCustomValidations(inputName: string): void {
        const validationMap: Record<string, () => void> = {
            'password': () => { this._checkPassword(); this._checkRepeatPassword(); },
            'repeat-password': () => { this._checkPassword(); this._checkRepeatPassword(); },
            'first_name': () => this._checkNames(),
            'second_name': () => this._checkNames(),
            'display_name': () => this._checkNames(),
            'login': () => this._checkLogin(),
            'email': () => this._checkEmail(),
            'phone': () => this._checkPhone(),
        };

        if (validationMap[inputName]) {
            validationMap[inputName]();
        }
    }

    private _checkNames(): void {
        this._validateInputs(['first_name', 'second_name', 'display_name'], /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/, 'Латиница или Кириллица, первая буква заглавная допустимые символы: -');
    }

    private _checkLogin(): void {
        const loginInput = this.inputs.find(input => input.name === 'login');
        if (loginInput) {
            const { value } = loginInput;
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                this._setInvalidState(loginInput);
                this._addTextError(loginInput, 'Латиница, допустимые символы: -, _');
            } else if (/^[0-9]+$/.test(value)) {
                this._setInvalidState(loginInput);
                this._addTextError(loginInput, 'Не может состоять только из цифр');
            }
        }
    }

    private _checkEmail(): void {
        this._validateInput('email', /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Некорректный email');
    }

    private _checkRepeatPassword(): void {
        const passwordInputs = [];
        passwordInputs.push(this.inputs.find(input => input.name === 'password'));
        passwordInputs.push(this.inputs.find(input => input.name === 'repeat-password'));
        if (passwordInputs.length === 2 && passwordInputs[0]?.value !== passwordInputs[1]?.value) {
            passwordInputs.forEach(input => {
                this._setInvalidState(input as HTMLInputElement);
                this._addTextError(input as HTMLInputElement, 'Пароли не совпадают');
            });
        }
    }

    private _checkPassword(): void {
        this._validateInputs(['password', 'repeat-password'], /^(?=.*[A-Z])(?=.*\d).+$/, 'Пароль должен содержать хотя бы одну заглавную букву и цифру');
    }

    private _checkPhone(): void {
        this._validateInput('phone', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/, 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.');
    }

    private _validateInputs(names: string[], regex: RegExp, errorMessage: string): void {
        this.inputs
            .filter(input => names.includes(input.name))
            .forEach(input => {
                if (!regex.test(input.value)) {
                    this._setInvalidState(input);
                    this._addTextError(input, errorMessage);
                }
            });
    }

    private _validateInput(name: string, regex: RegExp, errorMessage: string): void {
        const input = this.inputs.find(input => input.name === name);
        if (input && !regex.test(input.value)) {
            this._setInvalidState(input);
            this._addTextError(input, errorMessage);
        }
    }
}

export default Validation;
