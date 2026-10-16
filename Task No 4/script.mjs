  const form = document.getElementById('registerForm');
    const statusBox = document.getElementById('status');
    const fields = {
      name: document.getElementById('fullName'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      role: document.getElementById('role'),
      password: document.getElementById('password'),
      confirm: document.getElementById('confirmPassword')
    };
    const fieldBoxes = {
      name: document.getElementById('nameField'),
      email: document.getElementById('emailField'),
      phone: document.getElementById('phoneField'),
      role: document.getElementById('roleField'),
      password: document.getElementById('passwordField'),
      confirm: document.getElementById('confirmField')
    };

    function setFieldState(key, isValid) {
      fieldBoxes[key].classList.toggle('invalid', !isValid);
      fieldBoxes[key].classList.toggle('valid', isValid);
      const input = fields[key];
      input.setAttribute('aria-invalid', String(!isValid));
      return isValid;
    }

    function validateName() {
      const value = fields.name.value.trim();
      return setFieldState('name', value.length >= 2);
    }
    function validateEmail() {
      const value = fields.email.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return setFieldState('email', emailPattern.test(value));
    }
    function validatePhone() {
      const digits = fields.phone.value.replace(/\D/g, '');
      return setFieldState('phone', digits.length >= 7 && digits.length <= 15);
    }
    function validateRole() {
      return setFieldState('role', fields.role.value !== '');
    }
    function validatePassword() {
      const value = fields.password.value;
      const valid = value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
      setFieldState('password', valid);
      if (fields.confirm.value.length > 0) validateConfirm();
      return valid;
    }
    function validateConfirm() {
      const valid = fields.confirm.value.length > 0 && fields.confirm.value === fields.password.value;
      return setFieldState('confirm', valid);
    }

    const validators = [validateName, validateEmail, validatePhone, validateRole, validatePassword, validateConfirm];
    const validationInputs = [
      ['name', validateName], ['email', validateEmail], ['phone', validatePhone],
      ['role', validateRole], ['password', validatePassword], ['confirm', validateConfirm]
    ];
    validationInputs.forEach(([key, validate]) => {
      fields[key].addEventListener('input', () => {
        // Show a field's error after the user starts filling it in.
        if (fields[key].value.length > 0 || fieldBoxes[key].classList.contains('invalid')) validate();
        statusBox.className = 'status';
        statusBox.textContent = '';
      });
      fields[key].addEventListener('blur', validate);
      if (fields[key].tagName === 'SELECT') fields[key].addEventListener('change', validate);
    });

    document.getElementById('togglePassword').addEventListener('click', () => {
      const reveal = fields.password.type === 'password';
      fields.password.type = reveal ? 'text' : 'password';
      fields.confirm.type = reveal ? 'text' : 'password';
      document.getElementById('togglePassword').setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
    });

    document.getElementById('termsLink').addEventListener('click', (event) => {
      event.preventDefault();
      alert('Demo form: please use your own terms and conditions in a real project.');
    });

    const terms = document.getElementById('terms');
    terms.addEventListener('change', () => {
      document.getElementById('termsError').classList.toggle('show', !terms.checked);
      document.getElementById('termsField').classList.toggle('invalid', !terms.checked);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const results = validators.map((validate) => validate());
      const termsValid = terms.checked;
      document.getElementById('termsError').classList.toggle('show', !termsValid);
      document.getElementById('termsField').classList.toggle('invalid', !termsValid);
      const allValid = results.every(Boolean) && termsValid;

      statusBox.className = 'status show ' + (allValid ? 'success' : 'failure');
      if (!allValid) {
        statusBox.textContent = 'Please review the highlighted fields and fix the errors before continuing.';
        const firstInvalid = form.querySelector('.field.invalid input, .field.invalid select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      statusBox.textContent = 'Success! All fields passed validation.';
      document.getElementById('successMessage').textContent = `Thanks, ${fields.name.value.trim()}! Your details passed every validation check. This demo does not send or save your information.`;
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('successView').classList.add('show');
    });

    document.getElementById('editDetails').addEventListener('click', () => {
      document.getElementById('formContent').style.display = 'block';
      document.getElementById('successView').classList.remove('show');
      statusBox.className = 'status';
      fields.name.focus();
    });