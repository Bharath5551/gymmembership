document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch('https://gymmembership-1n9g.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.location.href = 'home.html'; // Or your actual homepage
    } else {
      errorMessage.textContent = data.message || "Invalid user ID or password.";
    }
  } catch (err) {
    errorMessage.textContent = "Something went wrong. Please try again.";
    console.error(err);
  }
});
