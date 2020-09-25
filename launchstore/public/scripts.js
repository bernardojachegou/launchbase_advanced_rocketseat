const input = document.querySelector('input[name="price"]')

input.addEventListener("keydown", function (element) {
    setTimeout(function () {
        let { value } = element.target;

        value = value.replace(/\D/g, "");

        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)

        element.target.value = value;
    }, 1)
})