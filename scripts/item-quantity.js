const amount__input = document.querySelector('#amount__input')
const btn__add = document.querySelector('#btn__add')
const btn__substract = document.querySelector('#btn__substract')

btn__add.addEventListener('click', () => amount__input.value = Number(amount__input.value) + 1)
btn__substract.addEventListener('click', () => {
    if (amount__input.value > 1)  amount__input.value = Number(amount__input.value) - 1
})