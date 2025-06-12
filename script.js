document.getElementById('petForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const petType = document.getElementById('petType').value
  let weight = parseFloat(document.getElementById('weight').value)
const unit = document.getElementById('weightUnit').value
if (unit === 'lbs') {
  weight = weight / 2.20462  // convert to kg
}

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

  <h3>Hydration Recommendation</h3>
  <p><strong>Water per day:</strong> ${Math.round(weight * 55)} ml (~${(weight * 55 / 1000).toFixed(2)} L)</p>

  <h3>Essential Micronutrients</h3>
  <ul>
    <li>Calcium: 1.0–2.5 g per 1000 kcal</li>
    <li>Phosphorus: 0.75–1.6 g per 1000 kcal</li>
    <li>Omega-6: ~5.0 g / 1000 kcal (dogs)</li>
    <li>Taurine (cats only): 0.1–0.2% of dry matter</li>
    <li>Vitamin A: ~5000–7500 IU / 1000 kcal</li>
    <li>Vitamin E: ~50 IU / 1000 kcal</li>
  </ul>
`

})
