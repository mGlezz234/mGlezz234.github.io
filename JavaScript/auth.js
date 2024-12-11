document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Proses Registrasi
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;

            if (users[username]) {
                alert('Username sudah terdaftar!');
            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users)); // Simpan ke localStorage
                alert('Registrasi berhasil! Silakan login.');
                window.location.href = 'login.html'; // Redirect ke halaman login
            }
            
        });
    }

    // Proses Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (users[username] && users[username] === password) {
                localStorage.setItem('isLoggedIn', 'true'); // Tandai user sebagai login
                localStorage.setItem('currentUser', username); // Simpan username yang login
                alert('Login berhasil!');
                window.location.href = 'index.html'; // Redirect ke halaman utama
            } else {
                alert('Username atau password salah!');
            }
        });
    }

    // Cek Akses Halaman Index
    if (window.location.pathname.includes('index.html')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn !== 'true') {
            alert('Anda harus login terlebih dahulu!');
            window.location.href = 'login.html'; // Redirect ke halaman login
        } else {
            const currentUser = localStorage.getItem('currentUser');
            alert(`Selamat datang, ${currentUser}!`);
        }
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            alert('Anda telah logout.');
            window.location.href = 'login.html'; // Redirect ke halaman login
        });
    }
});
