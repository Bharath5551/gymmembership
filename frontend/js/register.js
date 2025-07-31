document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('https://gymmembership-1n9g.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      
      // Optionally redirect:
      window.location.href = '../login.html';
    } else {
      alert(`❌ Error: ${data.message || 'Something went wrong'}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Failed to connect to server');
  }
});
