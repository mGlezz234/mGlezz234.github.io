// Kosongkan form saat halaman dimuat
window.addEventListener('load', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
// Logika Register
if (window.location.pathname.includes('register.html')) {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah reload halaman

        // Ambil data dari form
        const username = document.getElementById('regUsername').value;
        const gmail = document.getElementById('regGmail').value;
        const gender = document.getElementById('regGender').value;
        const password = document.getElementById('regPassword').value;

        // Simpan data ke localStorage (simulasi database sementara)
        const userData = {
            username,
            gmail,
            gender,
            password // Simpan username dan password untuk login
        };

        localStorage.setItem('user', JSON.stringify(userData));

        // Arahkan ke halaman login
        alert('Registrasi berhasil! Silakan login.');
        document.getElementById("registerForm").reset(); // Kosongkan form
        window.location.href = 'login.html';
    });
}

// Logika Login
if (window.location.pathname.includes('login.html')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah reload halaman

        // Ambil data login dari form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Ambil data user dari localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        // Validasi username dan password
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            // Tandai pengguna sebagai sudah login
            localStorage.setItem('isLoggedIn', 'true');

            alert('Login berhasil!');
            window.location.href = 'index.html'; // Arahkan ke halaman index
        } else {
            alert('Username atau password salah!');
        }
    });
}
});


// Validasi akses halaman Index
if (window.location.pathname.includes('index.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Pastikan membaca sebagai boolean
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        alert('Anda belum mendaftar. Silakan register terlebih dahulu.');
        window.location.href = 'register.html';
    } else if (!isLoggedIn) {
        alert('Anda belum login. Silakan login terlebih dahulu.');
        window.location.href = 'login.html';
    }
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'false');
    alert('Anda telah logout.');
    window.location.href = 'login.html'; // Redirect ke halaman login
});
