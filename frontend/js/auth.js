  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://gymmembership-1n9g.onrender.com/api/auth/login', {
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
