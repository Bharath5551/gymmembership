// script.js
const API_BASE = "https://gymmembership-1n9g.onrender.com/api";

async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Login Response:", data);
    alert(data.message || "Login success");
  } catch (err) {
    console.error("Login failed:", err);
    alert("Something went wrong");
  }
}
