document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://gymmembership-1n9g.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Registration successful! Redirecting to login...");
      window.location.href = "login.html";
    } else {
      alert("❌ Registration failed: " + data.message);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
