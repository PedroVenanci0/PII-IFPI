var botao = document.getElementById('botao');
var body = document.getElementsByTagName('body')[0];
var modoAltoContrasteAtivo = false;
botao.addEventListener('click', function () {
    if (!modoAltoContrasteAtivo) {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        modoAltoContrasteAtivo = true;
    }
    else {
        body.style.backgroundColor = '';
        body.style.color = '';
        modoAltoContrasteAtivo = false;
    }
});
