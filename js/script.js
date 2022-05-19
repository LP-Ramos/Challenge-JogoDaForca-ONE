const btnJogar = document.getElementById('btnJogar');

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

async function jogar() {
    // await loading(10);

    const palavra = 'banana';

    const main = document.querySelector('main');
    main.innerHTML = '';

    const div = document.createElement('div');
    div.classList.add('jogo');

    const divEspacos = document.createElement('div');
    divEspacos.classList.add('jogo__espacos');

    for (let i = 0; i < palavra.length; i++) {
        divEspacos.innerHTML += '<span class="espaco"></span>';
    }

    div.appendChild(divEspacos);

    main.appendChild(div);
}

btnJogar.addEventListener('click', jogar);