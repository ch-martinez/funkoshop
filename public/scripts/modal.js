const modal = document.getElementById('modal');
const modalOpen = document.getElementById('modalOpen');
const modalClose = document.getElementById('modalClose');

modalOpen.addEventListener('click',() => {
    modal.showModal();
});

modalClose.addEventListener('click',() => {
    modal.close();
});