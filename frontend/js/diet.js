window.onload = () => {
  fetch("http://localhost:5000/api/diets")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("diet-list");
      data.forEach(plan => {
        const div = document.createElement("div");
        div.className = "diet-meal";
        div.innerHTML = `<h3>${plan.meal}</h3><p>${plan.items.join(", ")}</p>`;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Error fetching diet:", err));
};
