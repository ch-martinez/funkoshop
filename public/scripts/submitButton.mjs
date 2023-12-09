const submit = (frontImgSelector, backImgSelector, formSelector) => {
    const frontImage = document.querySelector(frontImgSelector);
    const backImage = document.querySelector(backImgSelector);
    const form = document.querySelector(formSelector);
    const alertDiv = document.querySelector(".error-alert");
    const alertFront = document.querySelector(".front-alert");
    const alertBack = document.querySelector(".back-alert");

    form.addEventListener("submit", (event) => {
        const frontImg = frontImage.src;
        const backImg = backImage.src;
        if (frontImg.includes("/img/placeholder.webp")) {
            alertDiv.style.display = "block";
            alertFront.style.display = "block";
            alertDiv.focus();
        }
        else {
            alertDiv.style.display = "none";
            alertFront.style.display = "none";
        }

        if (backImg.includes("/img/placeholder.webp")) {
            alertDiv.style.display = "block";
            alertBack.style.display = "block";
            alertDiv.focus();
        }
        else {
            alertDiv.style.display = "none";
            alertBack.style.display = "none";
        }

        if (alertDiv.style.display === "block") {
            event.preventDefault();
        }
    });
}

export default submit;
