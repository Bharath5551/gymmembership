const API_BASE = (window.API_BASE) || (localStorage.getItem('API_BASE') || 'http://localhost:5000/api');

const msgEl = document.getElementById('msg');
const purposeEl = document.getElementById('purpose');
const emailEl = document.getElementById('email');
const fullnameEl = document.getElementById('fullname');
const passwordEl = document.getElementById('password');
const codeEl = document.getElementById('code');

function setMsg(t) { msgEl.textContent = t; }

document.getElementById('sendBtn').onclick = async () => {
  const email = emailEl.value.trim();
  const purpose = purposeEl.value;
  if (!email) return setMsg('Email required');
  try {
    const res = await fetch(`${API_BASE}/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, purpose })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');
    setMsg('OTP sent. Check email.');
  } catch (e) {
    setMsg(e.message);
  }
};

document.getElementById('verifyBtn').onclick = async () => {
  const email = emailEl.value.trim();
  const purpose = purposeEl.value;
  const code = codeEl.value.trim();
  const fullname = fullnameEl.value.trim();
  const password = passwordEl.value;
  if (!email || !code) return setMsg('Email and OTP required');
  try {
    const body = { email, code, purpose };
    if (purpose === 'signup') {
      if (!fullname || !password) return setMsg('Fullname and password required for signup');
      body.fullname = fullname;
      body.password = password;
    }
    const res = await fetch(`${API_BASE}/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');
    localStorage.setItem('token', data.token);
    setMsg('Verified. Token stored.');
    // redirect to home if needed
    // window.location.href = 'home.html';
  } catch (e) {
    setMsg(e.message);
  }
};
