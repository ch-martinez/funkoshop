const confirmDelete = (event) => {
        event.preventDefault();

        const alert = document.querySelector(".alert-delet");
        const url = event.currentTarget.getAttribute("href");

        const alertCancel = document.querySelector(".btn--admin-delet");
        alertCancel.addEventListener("click", () => {
            const alert = document.querySelector(".alert-delet");
            alert.close();
        })
        
        const confirmButton = document.querySelector(".btn--admin-confirm");
        confirmButton.addEventListener("click", () => {
            alert.close();
            window.location.href = url;
        });

        const item = event.target.parentNode.parentNode.parentNode 
        const name = item.querySelector('.table-admin__data:nth-child(3)').textContent
        alert.querySelector('.alert-delet__text span').textContent = name
        alert.showModal();
}
