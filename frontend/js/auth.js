document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('message');

  try {
    const response = await fetch('https://gymmembership-1n9g.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.style.color = 'green';
      messageDiv.textContent = "Login successful! Redirecting...";

      localStorage.setItem('token', data.token);

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 100); // Delay for message to show
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = data.message || "Login failed";
    }
  } catch (err) {
    console.error('Login Error:', err);
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Server error. Try again later.';
  }
});
