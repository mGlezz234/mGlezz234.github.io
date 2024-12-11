document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        alert('Anda harus login terlebih dahulu!');
        window.location.href = 'login.html'; // Redirect ke halaman login
    }
});
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Hapus status login
    alert('Anda telah logout.');
    window.location.href = 'login.html'; // Redirect ke halaman login
});
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const totalFeedbacksContainer = document.getElementById('totalFeedbacks');

    // Fungsi untuk memperbarui jumlah total feedback
    const updateTotalFeedbacks = () => {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        if (totalFeedbacksContainer) {
            totalFeedbacksContainer.textContent = feedbacks.length;
        }
    };

    // Perbarui jumlah total feedback saat halaman dimuat
    updateTotalFeedbacks();

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedbackMessage = document.getElementById('feedbackMessage').value;
            const currentUser = localStorage.getItem('currentUser');

            if (!currentUser) {
                alert('Anda harus login untuk mengirim feedback!');
                return;
            }

            // Simpan feedback
            const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            feedbacks.push({ username: currentUser, message: feedbackMessage });
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

            alert('Feedback berhasil dikirim!');
            feedbackForm.reset();

            // Perbarui jumlah total feedback setelah menambahkan feedback baru
            updateTotalFeedbacks();
        });
    }
});
