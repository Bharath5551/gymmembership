document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://gymmembership-1n9g.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Login successful!");
      // Redirect or store token
      // localStorage.setItem("token", data.token);
      // window.location.href = "dashboard.html";
    } else {
      alert("❌ Login failed: " + data.message);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
