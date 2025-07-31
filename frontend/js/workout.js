const workouts = {
  beginner: {
    Push: ['Push-ups', 'Overhead Dumbbell Press', 'Tricep Dips'],
    Pull: ['Inverted Rows', 'Bicep Curls', 'Face Pulls'],
    Legs: ['Bodyweight Squats', 'Lunges', 'Calf Raises']
  },
  intermediate: {
    Push: ['Bench Press', 'Shoulder Press', 'Tricep Rope Pushdown'],
    Pull: ['Pull-ups', 'Barbell Rows', 'Hammer Curls'],
    Legs: ['Barbell Squats', 'Leg Press', 'Romanian Deadlift']
  },
  advanced: {
    Push: ['Incline Bench Press', 'Dumbbell Shoulder Press', 'Skull Crushers'],
    Pull: ['Weighted Pull-ups', 'Deadlifts', 'EZ Bar Curls'],
    Legs: ['Front Squats', 'Bulgarian Split Squats', 'Stiff-Leg Deadlifts']
  }
};

function generateWorkout() {
  const level = document.getElementById('level').value;
  const planDiv = document.getElementById('workout-plan');

  if (!level) {
    planDiv.innerHTML = '<p>Please select a fitness level.</p>';
    return;
  }

  const plan = workouts[level];
  let html = '';

  for (const day in plan) {
    html += `<h3>${day} Day</h3><ul>`;
    plan[day].forEach(ex => {
      html += `<li>${ex}</li>`;
    });
    html += `</ul>`;
  }

  planDiv.innerHTML = html;
}
