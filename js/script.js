const btnJogar = document.getElementById('btnJogar');
const btnAddPalavra = document.getElementById('btnAddPalavra');

let palavras = ['BANANA', 'CARACOL', 'FORNO', 'PEIXE', 'PESO', 'TEMPO', 'TRABALHO', 'VACA', 'XADREZ', 'ZUMBI', 'DEMOCRACIA', 'RAIZ', 'FLOR'];
// let palavras = ['BANANA'];

let acertos = 0;
let erros = 0;
let digitadas = [];
let verifica = true;

btnJogar.addEventListener('click', jogar);
btnAddPalavra.addEventListener('click', addPalavra);