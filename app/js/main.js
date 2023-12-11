document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('menuButton');
    var optionsContainer = document.getElementById('optionsContainer');

    button.addEventListener('click', function () {
        if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    });
});