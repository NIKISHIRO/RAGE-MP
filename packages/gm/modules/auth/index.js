/*
1) валидация по регуляркам.
 логин от 3 до 20.  
 пароль от 6 до 30.
 повторный пароль === пароль

*/

module.exports = {
    register: (player, fullText, username, email, password, confirmPassword) => {
        if (!fullText) return console.log('/register [login] [email] [password] [Confirm password]');
        
        /*
            1) валидация по регуляркам.
            логин от 3 до 20.  
            пароль от 6 до 30.
            повторный пароль === пароль
        */

        User.find({login: username})
            .then(result => {
                if (result) {
                    console.log('Логин уже занят!');
                }
            })
            .catch(error => console.log(error));
    }
};