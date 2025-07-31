const workouts = {
  beginner: {
    Push: ['Bench Press','Dumbbell Shoulder Press','Incline Dumbbell Press','Lateral Raises','Tricep Dips (Bench)','Tricep Pushdowns'],
    Pull: ['Lat Pulldown or Assisted Pull-ups','Seated Row','Dumbbell Rows','Face Pulls','Barbell or Dumbbell Curl','Hammer Curl'],
    Legs: ['Bodyweight or Goblet Squats','Leg Press','Romanian Deadlifts','Walking Lunges','Standing Calf Raises','Seated Calf Raises']
  },
  intermediate: {
    Push: ['Incline Bench Press','Barbell Bench Press','Pec Flys','Decline Bench Press', 'Dumbbell Shoulder Press','Lateral Raises','Cable Pushdown', 'Skull Crushers'],
    Pull: ['Pull-ups','Barbell Rowing', 'Cable Pulldown', 'EZ Bar Curls','Hammer Curls','Shrugs','Reverse Pec flys'],
    Legs: ['Smith Machine Squats', 'Leg Press', 'Hammer Curls']
  },
  advanced: {
    Push: ['Incline Dumbbell Bench Press','Dumbbell Bench Press','Pec Flys','Bar Dips', 'Dumbbell Shoulder Press','Lateral Raises','Cable Pushdown', 'Overhead Cable Extentation'],
    Pull: ['Weighted Pull-ups','Barbell Rowing', 'Deadlifts', 'EZ Bar Curls','Hammer Curls','Shrugs','Reverse Pec flys'],
    Legs: ['Front Squats', 'Bulgarian Split Squats', 'Stiff-Leg Deadlifts','Calf Raises']
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
