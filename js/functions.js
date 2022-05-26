async function jogar() {
    // await loading(10);

    acertos = 0;
    erros = 0;

    let palavra = criarInterface();
    const letras = document.getElementById('letras');
    const letrasDigitadas = document.getElementById('letrasDigitadas');
    const btnNovoJogo = document.getElementById('btnNovoJogo');
    const btnDesistir = document.getElementById('btnDesistir');

    document.addEventListener('keypress', function(evento) {

        verifica = true;

        let letra = evento.key.toUpperCase();

        for (let i = 0; i < digitadas.length; i++) {
            if (digitadas[i] == letra) {
                letrasDigitadas.innerHTML += letra + '- ';
                aviso('A letra "' + letra + '" já foi digitada!', 'ok');
                verifica = false;
            }
        }

        if (verifica) {
            digitadas.push(letra);
            letrasDigitadas.innerHTML += letra + '- ';

            if (!palavra.includes(letra)) {
                erros++;
                erro(erros);

                if (erros == palavra.length) {
                    aviso('Que pena, você perdeu!<br>A Palavra era: "' + palavra + '".<br><br>Deseja jogar novamente?');
                }
            }
    
            for (let i = 0; i < palavra.length; i++) {
                if (letra == palavra[i]) {
                    letras.children[i].children[0].classList.remove('invisivel');
                    acertos++;
    
                    if (acertos == palavra.length) {
                        aviso('Parabéns, você ganhou!<br>A Palavra era: "' + palavra + '".<br><br>Deseja jogar novamente?');
                    }
                }
            }
        }
    });

    btnNovoJogo.addEventListener('click', novoJogo);
    btnDesistir.addEventListener('click', desistir);
}

function addPalavra() {
    const main = document.querySelector('main');

    const popUp = document.createElement('div');
    popUp.classList.add('popUp');
    popUp.classList.add('opaco');

    main.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Digite uma palavra:</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'OK';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Voltar';

    const textArea = document.createElement('textarea');
    textArea.classList.add('textArea');
    textArea.id = 'textArea';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(textArea);
    popUp.appendChild(btn);

    btnSim.addEventListener('click', function() {
        if (textArea.value != '') {
            popUp.remove();
            textArea.value = textArea.value.toUpperCase();
            palavras.push(textArea.value);    
            aviso('Palavra adicionada com sucesso!', 'ok');
        } else {
            aviso('Digite uma palavra!', 'ok');
        }
    });

    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
}

function criarInterface() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const divJogo = document.createElement('div');
    divJogo.classList.add('jogo');
    divJogo.id = 'jogo';
    
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

function desistir(){
    const popUp = document.createElement('div');
    popUp.classList.add('popUp');

    const jogo = document.getElementById('jogo');
    jogo.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Tem Certeza que deseja desistir?</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'Sim';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Não';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(btn);

    btnSim.addEventListener('click', function() {
        popUp.remove();
        window.location.href = "index.html";
    });

    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
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

function novoJogo(){
    const popUp = document.createElement('div');
    popUp.classList.add('popUp');

    const jogo = document.getElementById('jogo');
    jogo.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Tem Certeza que deseja iniciar um novo jogo?</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'Sim';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Não';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(btn);

    btnSim.addEventListener('click', function() {
        popUp.remove();
        window.location.href = "index.html";
        // jogar();
    });

    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
}

function aviso(msg, btnType=0){
    const main = document.querySelector('main');
    const aviso = document.createElement('div');
    aviso.classList.add('aviso');

    main.appendChild(aviso);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            aviso.style.width = i + '%';
        }
    }, 10);

    aviso.innerHTML = '<p>' + msg + '</p>';

    const btn = document.createElement('div');
    btn.classList.add('aviso__btn');

    if (btnType == 'ok'){
        const btnOk = document.createElement('button');
        btnOk.classList.add('btnAviso');
        btnOk.innerHTML = 'OK';

        btn.appendChild(btnOk);

        btnOk.addEventListener('click', function() {
            aviso.remove();
        });
    
    } else {
        const btnSim = document.createElement('button');
        btnSim.classList.add('btnAviso');
        btnSim.innerHTML = 'Sim';
    
        const btnNao = document.createElement('button');
        btnNao.classList.add('btnAviso');
        btnNao.innerHTML = 'Não';  
        
        btn.appendChild(btnSim);
        btn.appendChild(btnNao);

        btnSim.addEventListener('click', function() {
            aviso.remove();
            // jogar();
            window.location.href = "index.html";
        });
    
        btnNao.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }

    aviso.appendChild(btn);
}