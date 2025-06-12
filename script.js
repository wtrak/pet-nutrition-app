const breedData = {
  dog: [
    { name: 'Labrador Retriever', idealMin: 25, idealMax: 36, activity: 'moderate', proneToObesity: true },
    { name: 'German Shepherd', idealMin: 22, idealMax: 40, activity: 'high', proneToObesity: false },
    { name: 'Golden Retriever', idealMin: 25, idealMax: 34, activity: 'moderate', proneToObesity: true },
    { name: 'French Bulldog', idealMin: 9, idealMax: 13, activity: 'low', proneToObesity: true },
    { name: 'Poodle (Standard)', idealMin: 20, idealMax: 32, activity: 'moderate', proneToObesity: false }
  ],
  cat: [
    { name: 'Domestic Shorthair', idealMin: 3, idealMax: 6, activity: 'moderate', proneToObesity: true },
    { name: 'Maine Coon', idealMin: 6, idealMax: 9, activity: 'moderate', proneToObesity: false },
    { name: 'Siamese', idealMin: 2.5, idealMax: 5.5, activity: 'high', proneToObesity: false },
    { name: 'Persian', idealMin: 3, idealMax: 5.5, activity: 'low', proneToObesity: true },
    { name: 'Bengal', idealMin: 3.5, idealMax: 7, activity: 'high', proneToObesity: false }
  ]
}

const breedSelect = document.getElementById('breed')
const petTypeSelect = document.getElementById('petType')

function populateBreeds(petType) {
  breedSelect.innerHTML = ''
  breedData[petType].forEach(breed => {
    const opt = document.createElement('option')
    opt.value = breed.name
    opt.textContent = breed.name
    breedSelect.appendChild(opt)
  })
}

petTypeSelect.addEventListener('change', () => {
  populateBreeds(petTypeSelect.value)
})
populateBreeds(petTypeSelect.value)

document.getElementById('petForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const petType = document.getElementById('petType').value
  const weightUnit = document.getElementById('weightUnit').value
  let weight = parseFloat(document.getElementById('weight').value)
  const neutered = document.getElementById('neutered').value
  const activity = document.getElementById('activity').value
  const goal = document.getElementById('goal').value
  const breedName = document.getElementById('breed').value

  // Convert lbs to kg if necessary
  if (weightUnit === 'lbs') {
    weight = weight / 2.20462
  }

  // RER = 70 × (weight^0.75)
  const rer = 70 * Math.pow(weight, 0.75)

  // Default multiplier
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

  // Breed modifier
  const breedInfo = breedData[petType].find(b => b.name === breedName)
  if (breedInfo) {
    if (breedInfo.activity === 'low') multiplier -= 0.1
    if (breedInfo.activity === 'high') multiplier += 0.1
  }

  const mer = rer * multiplier

  const proteinPercent = petType === 'dog' ? '18–25%' : '26–30%'
  const fatPercent = petType === 'dog' ? '5.5–15%' : '9–20%'
  const waterMl = Math.round(weight * 55)

  document.getElementById('results').innerHTML = `
    <h3>Daily Nutrition Estimate</h3>
    <p><strong>Calories per day:</strong> ${Math.round(mer)} kcal</p>
    <p><strong>Protein:</strong> ${proteinPercent} of dry matter</p>
    <p><strong>Fat:</strong> ${fatPercent} of dry matter</p>
    <p><strong>Feeding Goal:</strong> ${goal.charAt(0).toUpperCase() + goal.slice(1)}</p>
    <p>This is a general estimate. Always consult your veterinarian for medical advice.</p>

    <h3>Hydration Recommendation</h3>
    <p><strong>Water per day:</strong> ${waterMl} ml (~${(waterMl / 1000).toFixed(2)} L)</p>

    <h3>Essential Micronutrients</h3>
    <ul>
      <li>Calcium: 1.0–2.5 g per 1000 kcal</li>
      <li>Phosphorus: 0.75–1.6 g per 1000 kcal</li>
      <li>Omega-6: ~5.0 g / 1000 kcal (dogs)</li>
      <li>Taurine (cats only): 0.1–0.2% of dry matter</li>
      <li>Vitamin A: ~5000–7500 IU / 1000 kcal</li>
      <li>Vitamin E: ~50 IU / 1000 kcal</li>
    </ul>

    <h3>Breed Info</h3>
    <p><strong>Breed:</strong> ${breedInfo.name}</p>
    <p><strong>Ideal Weight:</strong> ${breedInfo.idealMin}–${breedInfo.idealMax} kg</p>
    ${breedInfo.proneToObesity ? '<p style="color:red"><strong>Note:</strong> This breed is prone to obesity. Monitor weight closely.</p>' : ''}
  `
})
