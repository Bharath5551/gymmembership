document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('error-message'); // ✅ Get div reference

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
      messageDiv.style.color = 'green';
      messageDiv.textContent = "Registered successfully! Login Back";
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = data.message || "Something went wrong...!";
    }
  } catch (err) {
    console.error(err);
    messageDiv.style.color = 'red';
    messageDiv.textContent = "Failed connecting to server...!";
  }
});
