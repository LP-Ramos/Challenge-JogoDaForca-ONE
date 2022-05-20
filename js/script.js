const btnJogar = document.getElementById('btnJogar');
let palavras = ['BANANA', 'CARACOL', 'FORNO', 'PEIXE', 'PESO', 'TEMPO', 'TRABALHO', 'VACA', 'XADREZ', 'ZUMBI', 'DEMOCRACIA', 'RAIZ', 'FLOR'];
// let palavras = ['BANANA'];

function loading(time) {
    return new Promise((resolve) => {
        const main = document.querySelector('main');
        main.innerHTML = '';
        
        const div = document.createElement('div');
        div.classList.add('loading');
    
        const p = document.createElement('p');
        p.innerHTML = 'Carregando...';
    
        const span = document.createElement('span');
        span.classList.add('loading__span');
    
        const hr = document.createElement('hr');
        hr.classList.add('loading__hr')
    
        div.appendChild(p);
    
        let i = 0
    
        const timer = setInterval(function() {
        if (i >= 100) {
            hr.style.backgroundColor = 'var(--main-color)';
            setInterval(function() {
                clearInterval(timer);
                resolve();
            }, 500);
        }
    
        i++;
        hr.style.width = i + '%';
        span.appendChild(hr);
        div.appendChild(span);
        main.appendChild(div);
        }, time);  
    });
}

function criarInterface() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const divJogo = document.createElement('div');
    divJogo.classList.add('jogo');

    // const tela = document.createElement('canvas');
    // tela.classList.add('jogo__tela');
    // tela.id = 'tela';
    
    const divInfo = document.createElement('div');
    divInfo.classList.add('jogo__info');

    const titulo = document.createElement('div');
    titulo.classList.add('jogo__titulo');
    titulo.innerHTML = '<p>Digite uma letra</p>';

    const divLetras = document.createElement('div');
    divLetras.classList.add('jogo__letras');
    divLetras.id = 'letras';

    const palavra = palavras[Math.floor(Math.random() * palavras.length)];
    for (let i = 0; i < palavra.length; i++) {
        divLetras.innerHTML += '<div><p class="invisivel">' + palavra[i] + '</p><span class="espaco"></span></div>';
    }

    const letrasDigitadas = document.createElement('div');
    letrasDigitadas.classList.add('jogo__letrasDigitadas');
    letrasDigitadas.innerHTML = '<p>Letras digitadas:</p>';
    letrasDigitadas.id = 'letrasDigitadas';

    const divBtn = document.createElement('div');
    divBtn.classList.add('jogo__btn');

    const btnNovoJogo = document.createElement('button');
    btnNovoJogo.classList.add('btnJogo');
    btnNovoJogo.id = 'btnNovoJogo';
    btnNovoJogo.innerHTML = 'Novo Jogo';
    divBtn.appendChild(btnNovoJogo);

    const btnDesistir = document.createElement('button');
    btnDesistir.classList.add('btnJogo');
    btnDesistir.id = 'btnDesistir';
    btnDesistir.innerHTML = 'Desistir';
    divBtn.appendChild(btnDesistir);

    divInfo.appendChild(titulo);
    divInfo.appendChild(divLetras);
    divInfo.appendChild(letrasDigitadas);
    divInfo.appendChild(divBtn);

    // divJogo.appendChild(tela);
    divJogo.innerHTML += '<canvas id="tela" class="jogo__tela" width="400" height="400"></canvas>';
    divJogo.appendChild(divInfo);

    main.appendChild(divJogo);

    const tela = document.getElementById('tela');
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#000';

    ctx.fillRect(100, 350, 200, 4);
    ctx.fillRect(130, 50, 4, 300);
    ctx.fillRect(130, 50, 100, 4);
    ctx.fillRect(230, 50, 4, 50);

    return palavra;
}

function erro(e){
    const tela = document.getElementById('tela');
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#000';

    if(e == 1){
        ctx.beginPath();
        ctx.arc(232, 96, 30, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#c4fcb4';
        ctx.arc(232, 96, 26, 0, 2 * Math.PI);
        ctx.fill();
    } else if (e == 2){
        ctx.fillStyle = '#000';
        ctx.fillRect(230, 125, 4, 125);    
    } else if (e == 3){
        ctx.beginPath();
        ctx.moveTo(230,125);
        ctx.lineTo(234,125);
        ctx.lineTo(280,190);
        ctx.lineTo(276,190);
        ctx.fill();
    } else if (e == 4){
        ctx.beginPath();
        ctx.moveTo(230,125);
        ctx.lineTo(234,125);
        ctx.lineTo(180,190);
        ctx.lineTo(176,190);
        ctx.fill();       
    } else if (e == 5){
        ctx.beginPath();
        ctx.moveTo(230,250);
        ctx.lineTo(234,250);
        ctx.lineTo(280,320);
        ctx.lineTo(276,320);
        ctx.fill();
    } else if (e == 6){
        ctx.beginPath();
        ctx.moveTo(230,250);
        ctx.lineTo(234,250);
        ctx.lineTo(180,320);
        ctx.lineTo(176,320);
        ctx.fill(); 
    }
}

async function jogar() {
    // await loading(10);

    const palavra = criarInterface();
    const letras = document.getElementById('letras');
    const letrasDigitadas = document.getElementById('letrasDigitadas');
    const btnNovoJogo = document.getElementById('btnNovoJogo');
    const btnDesistir = document.getElementById('btnDesistir');

    let acertos = 0;
    let erros = 0;

    let digitadas = [];

    document.addEventListener('keypress', function(evento) {
        const letra = evento.key.toUpperCase();

        reg = new RegExp('[A-Z]', 'gs');

        if(reg.test(letra) && !digitadas.includes(letra)) {
            digitadas.push(letra);
            letrasDigitadas.innerHTML += '<p>' + letra + '-</p>';

            if(palavra.includes(letra)) {
                for (let i = 0; i < palavra.length; i++) {
                    if(palavra[i] == letra) {
                        letras.children[i].children[0].classList.remove('invisivel');
                        acertos += 1;
                        if(palavra.length == acertos) {
                            alert('Você ganhou!');
                        }
                    }
                }

            } else {
                erros += 1;
                erro(erros);
                if(erros == 6) {
                    alert('Você perdeu!');
                }
            }
        } else if(digitadas.includes(letra)) {
            alert('Letra já digitada!');
        } else {
            alert('Digite uma letra válida!');
        }
    });
    btnNovoJogo.addEventListener('click', jogar);
    btnDesistir.addEventListener('click', jogar);
}

btnJogar.addEventListener('click', jogar);