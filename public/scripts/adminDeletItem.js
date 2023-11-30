const table = document.querySelector('.table-admin')
const alert = document.querySelector('.alert-delet');
const alertCancel = document.querySelector('.btn--admin-delet');

table.addEventListener('click', (e) => {
    if (e.target.classList.contains('alert-delet__btn')){
        eliminar(e)
    }
})

/* Cierra la ventana modal */
alertCancel.addEventListener('click',() => {
    alert.close()
});

/* Detecta el item a eleminar y dispara una alerta de confirmacion */
const eliminar = (e) => {
    const item = e.target.parentNode.parentNode.parentNode 
    const name = item.querySelector('.table-admin__data:nth-child(3)').textContent
    alert.querySelector('.alert-delet__text span').textContent = name
    alert.showModal();
}