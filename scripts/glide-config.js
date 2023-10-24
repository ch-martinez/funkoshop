/* JS de configuracion de la libreria Glide */
new Glide('.glide',
    {
        type: 'carousel',
        startAt: 1,
        perView: 4,
        breakpoints: {
            991: {
                perView: 2
            },
            768: {
                perView: 1
                }
        }
    }
).mount();