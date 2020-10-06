const Mask = {
    apply(input, func) {
        input.value = input.value.replace(/\D/g, "")
        setTimeout(function () {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatPercent(value) {
        value = value.replace(/\D/g, "");

        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }).format(value / 10000)
    },
    formatCPF(value) {
        value = value.replace(/\D/g, "");
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    },
}