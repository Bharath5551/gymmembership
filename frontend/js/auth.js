document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevents form from refreshing the page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://your-backend-url.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    // Redirect on success
    window.location.href = 'home.html'; // change to your actual homepage
  } else {
    alert(data.message || 'Login failed');
  }
});
