const authController = {
    postRegister: (req, res) => {
        const {name, email, password} = req.body;
        console.log(name);
        console.log(email);
        console.log(password);
    },
    postLogin: (req, res) => {
    },
    getRegister: (req, res) => {
        res.render('auth/register', {
            title: "Registro"
        })
    },
    getLogin: (req, res) => {
        res.render('auth/login', {
            title: "Iniciar Sesión"
        })
    }
}

export default authController