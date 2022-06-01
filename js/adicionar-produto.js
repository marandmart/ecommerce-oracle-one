document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.corpo__adicionar-produto__container__form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        salvarNoCache();
    });

})

const salvarNoCache = () => {

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // elementos
    const urlLinkEl = document.getElementById('url-imagem');
    const categoriaEl = document.getElementById('categoria');
    const nomeProdutoEl = document.getElementById('nome-produto');
    const precoProdutoEl = document.getElementById('preco-produto');
    const descricaoProdutoEl = document.getElementById('descricao-produto');

    // valores
    const urlValue = urlLinkEl.value;
    const categoriaValue = categoriaEl.value;
    const nomeValue = nomeProdutoEl.value;
    const precoValue = precoProdutoEl.value;
    const descricaoValue = descricaoProdutoEl.value;

    // dados a serem salvos no local storage
    const dadosProduto = {
        urlValue,
        categoriaValue,
        nomeValue,
        precoValue,
        descricaoValue,
    };

    const produtosAtualizados = [...produtos, dadosProduto];

    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));

    alert('Produto adicionado com sucesso!');

    // deixa os valores no formulario vazios
    urlLinkEl.value = '';
    categoriaEl.value = '';
    nomeProdutoEl.value = '';
    precoProdutoEl.value = '';
    descricaoProdutoEl.value = '';

}