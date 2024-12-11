document.addEventListener('DOMContentLoaded', () => {
    const registeredAccountsContainer = document.getElementById('registeredAccounts');
    const feedbackListContainer = document.getElementById('feedbackList');
    const totalAccountsContainer = document.getElementById('totalAccounts');
    const totalFeedbacksContainer = document.getElementById('totalFeedbacks');

    // Ambil data akun dan feedback dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Hitung jumlah akun dan feedback
    const totalAccounts = Object.keys(users).length;
    const totalFeedbacks = feedbacks.length;

    // Tampilkan jumlah akun terdaftar
    if (totalAccountsContainer) {
        totalAccountsContainer.textContent = totalAccounts;
    }

    // Tampilkan jumlah feedback masuk
    if (totalFeedbacksContainer) {
        totalFeedbacksContainer.textContent = totalFeedbacks;
    }

    // Tampilkan daftar akun yang terdaftar
    if (registeredAccountsContainer) {
        if (totalAccounts === 0) {
            registeredAccountsContainer.textContent = 'Belum ada akun yang terdaftar.';
        } else {
            registeredAccountsContainer.innerHTML = '<ul>' + 
                Object.keys(users)
                .map((username, index) => `<li>${index + 1}. ${username}</li>`)
                .join('') + 
                '</ul>';
        }
    }

    // Tampilkan daftar feedback
    if (feedbackListContainer) {
        if (totalFeedbacks === 0) {
            feedbackListContainer.textContent = 'Belum ada feedback yang diberikan.';
        } else {
            feedbackListContainer.innerHTML = '<ul>' +
                feedbacks
                .map((feedback, index) => 
                    `<li>${index + 1}. <strong>${feedback.username}</strong>: ${feedback.message}</li>`)
                .join('') +
                '</ul>';
        }
    }
        // Tambahkan event listener untuk tombol hapus semua data
        if (deleteAllButton) {
            deleteAllButton.addEventListener('click', () => {
                const confirmDelete = confirm('Apakah Anda yakin ingin menghapus semua akun dan feedback?');
                if (confirmDelete) {
                    localStorage.removeItem('users'); // Hapus semua akun
                    localStorage.removeItem('feedbacks'); // Hapus semua feedback
                    alert('Semua akun dan feedback telah dihapus.');
                    location.reload(); // Muat ulang halaman untuk memperbarui tampilan
                }
            });
        }
});
