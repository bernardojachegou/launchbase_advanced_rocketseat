const Categories = require('../models/Categories');
const Product = require('../models/Product');

module.exports = {
    create(request, response) {
        // Pegar as categorias (Usando Promises)
        Categories.all().then(function (results) {

            const categories = results.rows

            return response.render("products/create.njk", { categories });
        }).catch(function (err) {
            throw new Error(err)
        })
    },

    async post(request, response) {
        // const keys = Object.keys(request.body);

        // for (key of keys) {
        //     if (request.body[key] == "") {
        //         return response.send("Por favor, preencha todos os campos!")
        //     }
        // }

        // Lógica para salvar
        // Puxa as informações do produto e joga da variável
        let results = await Product.create(request.body);
        const productId = results.rows[0].id;

        // Puxa as informações das categorias e joga na variável
        results = await Categories.all();
        const categories = results.rows;

        return response.render("products/create.njk", { productId, categories })
    }
}