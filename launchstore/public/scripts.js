// Função para Criar a Máscara de formatação de preço
const Mask = {
    apply(input, func) {
        input.value = input.value.replace(/\D/g, "")
        setTimeout(function () {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "");

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    }
}

// Função utilizada para solicitar confirmação no delete form;
function handleDeleteConfirmation() {
    const confirmation = confirm("Confirmar?")
    if (!confirmation) {
        Event.preventDefault()
    }
}