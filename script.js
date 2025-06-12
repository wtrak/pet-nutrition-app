document.getElementById('petForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const petType = document.getElementById('petType').value
  const weight = parseFloat(document.getElementById('weight').value)
  const neutered = document.getElementById('neutered').value
  const activity = document.getElementById('activity').value
  const goal = document.getElementById('goal').value

  // RER = 70 × (weight^0.75)
  const rer = 70 * Math.pow(weight, 0.75)

  // MER multiplier logic
  let multiplier = 1.0
  if (petType === 'dog') {
    if (goal === 'lose') multiplier = 1.0
    else if (goal === 'gain') multiplier = 2.0
    else {
      multiplier = neutered === 'yes' ? 1.6 : 1.8
      if (activity === 'low') multiplier -= 0.2
      if (activity === 'high') multiplier += 0.2
    }
  } else if (petType === 'cat') {
    if (goal === 'lose') multiplier = 1.0
    else if (goal === 'gain') multiplier = 2.0
    else {
      multiplier = neutered === 'yes' ? 1.2 : 1.4
      if (activity === 'low') multiplier -= 0.1
      if (activity === 'high') multiplier += 0.2
    }
  }

  const mer = rer * multiplier
  const proteinPercent = petType === 'dog' ? '18–25%' : '26–30%'
  const fatPercent = petType === 'dog' ? '5.5–15%' : '9–20%'

  document.getElementById('results').innerHTML = `
    <h3>Daily Nutrition Estimate</h3>
    <p><strong>Calories per day:</strong> ${Math.round(mer)} kcal</p>
    <p><strong>Protein:</strong> ${proteinPercent} of dry matter</p>
    <p><strong>Fat:</strong> ${fatPercent} of dry matter</p>
    <p><strong>Feeding Goal:</strong> ${goal.charAt(0).toUpperCase() + goal.slice(1)}</p>
    <p>This is a general estimate. Always consult your veterinarian for medical advice.</p>
  `
})
