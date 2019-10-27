function showForm() {
    $('.auth-btn__left').on('click', function() {
        $('.show').removeClass('show');
        $('.login').addClass('show');

        $('.auth-btn-focus').removeClass('auth-btn-focus');
        $(this).addClass('auth-btn-focus');
    });

    $('.auth-btn__right').on('click', function() {
        $('.show').removeClass('show');
        $('.register').addClass('show');

        $('.auth-btn-focus').removeClass('auth-btn-focus');
        $(this).addClass('auth-btn-focus');
    });
}

function fromValidation(data) {
    let validLogin = (login) => /^[a-zA-Z0-9_-]{3,16}$/.test(login);
    let validPassword = (password) => /^[a-zA-Z0-9_-]{6,30}$/.test(password);
    let validEmail = (email) => /.+@.+\..+/i.test(email);

    let errors = [];
    $(data.selector).each((id, el) => {
        let inputValue = $(el).val().trim();
        let inputAttrName = $(el).attr('name').trim();

        switch(inputAttrName) {
            case 'login':
                if (!validLogin(inputValue)) {
                    errors.push(data.errors.login);
                }
            break;

            case 'password':
                if (!validPassword(inputValue)) {
                    errors.push(data.errors.password);
                }
            break;

            case 'email':
                if (!validEmail(inputValue)) {
                    errors.push(data.errors.email);
                }
            break;
        }
    });
    
    if (errors.length > 0) {
        $(data.errorSelector).text(errors.shift());
    } else {
        $(data.errorSelector).text('');

        console.log($(data.btnSelector));
        $(data.btnSelector).attr("disabled", false);
    }
}

let registerData = {
    selector: '.register input',
    errorSelector: '.registerTextError',
    btnSelector: '.register-btn',
    errors: {
        login: 'Логин не должен быть короче 3 символов и больше 16 a-zA-Z0-9_-',
        password: 'Пароль не должен быть меньше 6 и больше 30 символов. a-z A-Z 1-9',
        email: 'Проверьте емейл адрес'
    }
};
$(registerData.selector).on('input', () => fromValidation(registerData));

let loginData = {
    selector: '.login input',
    errorSelector: '.loginTextError',
    btnSelector: '.login-btn',
    errors: {
        login: 'Проверьте логин на корректность.',
        password: 'Проверьте пароль на корректность.',
        email: 'Проверьте емейл адрес.'
    }

};
$(loginData.selector).on('input', () => fromValidation(loginData));

showForm(); // Tabs

// events on button
$('.login-btn').on('click', () => {
    let login = $(".login input[name='login']").val().trim();
    let password = $(".login input[name='password']").val().trim();
    mp.trigger('CEF_Login_c', login, password);
    $('.login-btn').attr("disabled", true);
});

$('.register-btn').on('click', () => {
    let login = $(".register input[name='login']").val().trim();
    let password = $(".register input[name='password']").val().trim();
    let email = $(".register input[name='email']").val().trim();
    mp.trigger('CEF_Register_c', login, password, email);
    $('.login-btn').attr("disabled", true);
});