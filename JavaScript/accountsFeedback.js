document.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxR1HEYVK4cFluGq0DP_rzxdQaIb9di7k6H7itkqcKhBMjfMbJZB0l5ss9DxN152D9fPg/exec';
    const form = document.forms['submit-to-google-sheet'];
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '20px';
    alertBox.style.right = '20px';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.display = 'none';
    alertBox.style.color = '#fff';
    alertBox.style.fontSize = '16px';
    document.body.appendChild(alertBox);

    const showAlert = (message, isSuccess = true) => {
        alertBox.textContent = message;
        alertBox.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
        alertBox.style.display = 'block';

        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                showAlert('feedback berhasil terkirim.');
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                showAlert('feedback gagal terkirim coba sekali lagi!.', false);
            })
            .finally(() => {
                submitButton.disabled = false;
            });
    });
});
