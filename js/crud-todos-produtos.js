let searchBarText = [];

document.addEventListener('DOMContentLoaded', () => {

    let searchBar = document.getElementById('query');
    searchBar.addEventListener('keydown', (e) => search(e));

    let buttons = [...document.querySelectorAll('.corpo__lista__conteudo__item__botoes')];
    buttons.map(button => {
        button.addEventListener('click', e => removeLocalElement(e));
    })

    if (localStorage.getItem('produtos')) {
        addElements();
    }


})

//precisa terminar
const search = (e) => {
    let allItemTitles = [...document.querySelectorAll('.corpo__lista__conteudo__item__titulo')];
    if (e.keyCode == 8) {
        searchBarText.pop();
    } else if (e.keyCode >= 48 && e.keyCode <= 90) {
        searchBarText.push(e.key);
    }
    let currentSearchBarText = searchBarText.join('');
    allItemTitles.map(title => {
        if (!title.innerText.toLowerCase().includes(currentSearchBarText)) {
            console.log(title.innerText.toLowerCase(), currentSearchBarText);
            if (!title.parentElement.classList.contains('corpo__produto__container__info__titulo--hidden')) {
                title.parentElement.className = 'corpo__produto__container__info__titulo--hidden';
            }
        } else {
            if (title.parentElement.classList.contains('corpo__produto__container__info__titulo--hidden')) {
                title.parentElement.className = 'corpo__lista__conteudo__item corpo__lista__conteudo__item--todos';
            }
        }
    });

    console.log('break')

    if (currentSearchBarText.length == 0) {
        allItemTitles.map(title => {
            if (title.parentElement.classList.contains('corpo__produto__container__info__titulo--hidden'))
                title.parentElement.className = 'corpo__lista__conteudo__item corpo__lista__conteudo__item--todos';
        })
    }

}

const removeLocalElement = (e) => {

    const type = e.target.dataset.type;
    switch (type) {
        case "trash":
            let element = e.target.parentElement.parentElement;
            let elementName = element.querySelector('.corpo__lista__conteudo__item__titulo').innerText;

            // remove da página
            element.parentElement.removeChild(element);

            // remove do localStorage
            removeFromLocalStorage(elementName);
            break;
        case "edit":
            alert('Somente editável após a quarta fileira');
            break;
    }

}

const removeFromLocalStorage = (itemName) => {

    let storedItens = JSON.parse(localStorage.getItem('produtos'));
    let sendFile = storedItens.filter(item => item.nomeValue !== itemName);

    localStorage.setItem('produtos', JSON.stringify(sendFile));


}

const addElements = () => {

    if (lastSectionIsFull()) {
        createSectionAndAddToDOM();
    }

    let productList = [];

    let contentSections = document.querySelectorAll('.corpo__lista');
    let location = contentSections[contentSections.length - 1].querySelector('.corpo__lista__conteudo');

    let sessionItems = JSON.parse(localStorage.getItem('produtos'));

    sessionItems.map(item => {
        const url = item.urlValue;
        const nome = item.nomeValue;
        const preco = 'R$ ' + item.precoValue;
        const descricao = item.descricaoValue;

        let cardItem = createCard(url, nome, preco, descricao);
        productList.push(cardItem);
    })

    productList.map(product => {
        location.appendChild(product);
    })


}


const lastSectionIsFull = () => {
    let pageSections = [...document.querySelectorAll('.corpo__lista__conteudo')];
    return pageSections[pageSections.length - 1].childElementCount == 6;
}

const createSectionAndAddToDOM = () => {

    const placementLocation = document.querySelector('.corpo');
    const lastItem = document.querySelector('.corpo__contato');

    const section = document.createElement('section');
    section.className = 'corpo__lista';

    const divConteudo = document.createElement('div');
    divConteudo.className = 'corpo__lista__conteudo';

    section.appendChild(divConteudo);
    placementLocation.insertBefore(section, lastItem);

}


const createCard = (urlEnd, tituloProd, precoProd, descricaoProd) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'corpo__lista__conteudo__item corpo__lista__conteudo__item--todos';

    const mainImage = document.createElement('img');
    mainImage.className = 'corpo__lista__conteudo__item__imagem';
    mainImage.src = urlEnd;

    // cria os icones de lixeiro e edição
    const trashImageIcon = document.createElement('img');
    trashImageIcon.dataset.type = 'trash';
    trashImageIcon.alt = '';
    trashImageIcon.src = 'assets/icones/trash.svg';

    const trashIcon = document.createElement('a');
    trashIcon.className = 'corpo__lista__conteudo__item__botoes';
    trashIcon.append(trashImageIcon);

    const pencilImageIcon = document.createElement('img');
    pencilImageIcon.dataset.type = 'edit';
    pencilImageIcon.alt = '';
    pencilImageIcon.src = 'assets/icones/pencil.svg';

    const editIcon = document.createElement('a');
    editIcon.className = 'corpo__lista__conteudo__item__botoes';
    editIcon.append(pencilImageIcon);

    // adiciona os event listeners
    trashIcon.addEventListener('click', e => removeLocalElement(e));
    editIcon.addEventListener('click', e => alert('não é editável'));

    // cria os elemento com detalhes do item
    const titulo = document.createElement('p');
    titulo.className = 'corpo__lista__conteudo__item__titulo';
    titulo.innerText = tituloProd;

    const preco = document.createElement('p');
    preco.className = 'corpo__lista__conteudo__item__preco';
    preco.innerText = precoProd;

    const descricao = document.createElement('p');
    descricao.innerText = descricaoProd;

    // adiciona os itens do card
    cardDiv.appendChild(mainImage);
    cardDiv.appendChild(trashIcon);
    cardDiv.appendChild(editIcon);
    cardDiv.appendChild(titulo);
    cardDiv.appendChild(preco);
    cardDiv.appendChild(descricao);

    return cardDiv;

}