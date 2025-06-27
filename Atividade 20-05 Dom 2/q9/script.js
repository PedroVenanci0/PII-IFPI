var texto = document.getElementById('texto');
var botaoMaisculo = document.getElementById('botaoMaisculo');
var botaoMinusculo = document.getElementById('botaoMinusculo');
botaoMaisculo.addEventListener('click', function () {
    var conteudo = texto.textContent || '';
    texto.textContent = conteudo.toUpperCase();
});
botaoMinusculo.addEventListener('click', function () {
    var conteudo = texto.textContent || '';
    texto.textContent = conteudo.toLowerCase();
});
