document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faqs__list');

    faqItems.forEach(item => {
        const container = item.querySelector('.faqs__pregunta--container');
        const defaultChevron = item.querySelector(".faqs__icon")
        const activeChevron = item.querySelector(".faqs__icon--active");
        const respuesta = item.querySelector('.faqs__respuesta');

        container.addEventListener('click', function () {
            // Alternar la visibilidad de la respuesta al hacer clic en la pregunta
            respuesta.style.display = respuesta.style.display === 'block' ? 'none' : 'block';

            // Alternar color del borde 
            if (!container.style) {
                container.style.borderBottom = "4px solid var(--primary-solid)";
                activeChevron.style.display = "block";
                defaultChevron.style.display = "none";
            }
            else if (container.style.borderBottom === "4px solid var(--primary-solid)") {
                container.style.borderBottom = "4px solid var(--bg-dark-solid)";
                activeChevron.style.display = "none";
                defaultChevron.style.display = "block";
            }
            else {
                container.style.borderBottom = "4px solid var(--primary-solid)";
                activeChevron.style.display = "block";
                defaultChevron.style.display = "none";
            }
        });
    });
});
