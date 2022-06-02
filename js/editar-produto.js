
document.addEventListener('DOMContentLoaded', () => {
    let editItem = JSON.parse(sessionStorage.getItem('produto-edit'));
    let currentLocalStorage = JSON.parse(localStorage.getItem('produtos'));

    let itemInfo = [];

    // acha o item certo
    currentLocalStorage.map(item => {
        if (item.nomeValue === editItem.nome && item.descricaoValue === editItem.descricao && item.precoValue === editItem.preco) {
            itemInfo.push(item);
        }
    });


    placeItem(itemInfo);

    let form = document.querySelector('.corpo__adicionar-produto__container__form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        update(currentLocalStorage, itemInfo);
    });

})

const update = (currentLocalStorage, itemInfo) => {

    let url = document.getElementById('url-imagem').value;
    let categoria = document.getElementById('categoria').value;
    let nome = document.getElementById('nome-produto').value;
    let preco = document.getElementById('preco-produto').value;
    let descricao = document.getElementById('descricao-produto').value;

    let updatedItem = { urlValue: url, categoriaValue: categoria, nomeValue: nome, precoValue: preco, descricaoValue: descricao };


    let newLocalStorage = currentLocalStorage.filter(item => {
        return item.nomeValue !== itemInfo[0].nomeValue && item.urlValue !== itemInfo[0].urlValue && item.categoriaValue !== itemInfo[0].categoriaValue && item.precoValue !== itemInfo[0].precoValue && item.descricaoValue !== itemInfo[0].descricaoValue;
    });

    newLocalStorage.push(updatedItem);

    localStorage.setItem('produtos', JSON.stringify(newLocalStorage));
    sessionStorage.clear();

    alert('Item atualizado!');

    window.location.replace('http://127.0.0.1:5500/todos-produtos.html');
}


const placeItem = (itemInfo) => {

    document.getElementById('url-imagem').value = itemInfo[0].urlValue;
    document.getElementById('categoria').value = itemInfo[0].categoriaValue;
    document.getElementById('nome-produto').value = itemInfo[0].nomeValue;
    document.getElementById('preco-produto').value = itemInfo[0].precoValue;
    document.getElementById('descricao-produto').value = itemInfo[0].descricaoValue;

}