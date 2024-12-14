document.addEventListener('DOMContentLoaded', () => {
    const registeredAccountsContainer = document.getElementById('registeredAccounts');
    const feedbackListContainer = document.getElementById('feedbackList');
    const totalAccountsContainer = document.getElementById('totalAccounts');
    const totalFeedbacksContainer = document.getElementById('totalFeedbacks');
    const deleteAllButton = document.getElementById('deleteAllButton'); // Tambahkan deklarasi deleteAllButton

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const totalAccounts = Object.keys(users).length;
    const totalFeedbacks = feedbacks.length;
    if (totalAccountsContainer) {
        totalAccountsContainer.textContent = totalAccounts;
    }
    if (totalFeedbacksContainer) {
        totalFeedbacksContainer.textContent = totalFeedbacks;
    }
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
    if (deleteAllButton) {
        deleteAllButton.addEventListener('click', () => {
            const confirmDelete = confirm('Apakah Anda yakin ingin menghapus semua akun dan feedback?');
            if (confirmDelete) {
                localStorage.removeItem('users');
                localStorage.removeItem('feedbacks');
                alert('Semua akun dan feedback telah dihapus.');
                location.reload();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;

            if (users[username]) {
                alert('Username sudah terdaftar!');
            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registrasi berhasil! Silakan login.');
                window.location.href = 'index.html';
            }
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (users[username] && users[username] === password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                alert('Login berhasil!');
                window.location.href = 'mainContent.html';
            } else {
                alert('Username atau password salah!');
            }
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            alert('Anda telah logout.');
            window.location.href = 'index.html';
        });
    }
});
