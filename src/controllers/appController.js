const appController = {
    getHome: (req, res) => {
        res.render('layout/home', {
            title: "Inicio"
        });
    }
}

export default appController;