const cancel = (cancelButtonSelector) => {
    const cancelButton = document.querySelector(cancelButtonSelector);
    cancelButton.addEventListener("click", () => {
        window.location.href = "/admin";
    });
}

export default cancel;
