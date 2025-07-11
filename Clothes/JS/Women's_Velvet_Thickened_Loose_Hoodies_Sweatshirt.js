function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function changeQuantity(change) {
    const input = document.querySelector('.quantity-input');
    const currentValue = parseInt(input.value);
    const newValue = currentValue + change;

    if (newValue >= 1 && newValue <= 10) {
        input.value = newValue;
    }
}

document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});


const mainImage = document.querySelector('.main-image');
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');

        const bg = window.getComputedStyle(thumbnail).backgroundImage;
        mainImage.style.backgroundImage = bg;
        mainImage.style.backgroundSize = 'cover';
        mainImage.style.backgroundPosition = 'center';
        mainImage.style.backgroundRepeat = 'no-repeat';
    });
});