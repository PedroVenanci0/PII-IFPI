var calcular = document.getElementById('calcular');
var resultado = document.getElementById('resultado');
calcular.addEventListener('click', function () {
    var valor1 = parseFloat(document.getElementById('valor1').value);
    var valor2 = parseFloat(document.getElementById('valor2').value);
    var operacoes = document.getElementsByName('operacao');
    var operacaoSelecionada = 'soma'; // padrão
    operacoes.forEach(function (operacao) {
        if (operacao.checked) {
            operacaoSelecionada = operacao.value;
        }
    });
    var resultadoCalculado;
    switch (operacaoSelecionada) {
        case 'soma':
            resultadoCalculado = valor1 + valor2;
            break;
        case 'subtracao':
            resultadoCalculado = valor1 - valor2;
            break;
        case 'multiplicacao':
            resultadoCalculado = valor1 * valor2;
            break;
        case 'divisao':
            resultadoCalculado = valor2 !== 0 ? valor1 / valor2 : NaN;
            break;
        default:
            resultadoCalculado = NaN;
    }
    resultado.textContent = isNaN(resultadoCalculado) ? 'Erro' : resultadoCalculado.toString();
});
