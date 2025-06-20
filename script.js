const breedData = {
  dog: [
    { name: 'Labrador Retriever', idealMin: 25, idealMax: 36, activity: 'moderate', proneToObesity: true },
    { name: 'German Shepherd', idealMin: 22, idealMax: 40, activity: 'high', proneToObesity: false },
    { name: 'Golden Retriever', idealMin: 25, idealMax: 34, activity: 'moderate', proneToObesity: true },
    { name: 'Pomeranian', idealMin: 1.5, idealMax: 3.5, activity: 'moderate', proneToObesity: true },
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

  if (weightUnit === 'lbs') {
    weight = weight / 2.20462
  }

  const rer = 70 * Math.pow(weight, 0.75)

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

  const breedInfo = breedData[petType].find(b => b.name === breedName)
  if (breedInfo) {
    if (breedInfo.activity === 'low') multiplier -= 0.1
    if (breedInfo.activity === 'high') multiplier += 0.1
  }

  const mer = rer * multiplier
  const waterMl = Math.round(weight * 55)

  // Macronutrient breakdown
  const proteinPct = 0.25
  const fatPct = 0.30
  const carbPct = 0.45

  const proteinCals = mer * proteinPct
  const fatCals = mer * fatPct
  const carbCals = mer * carbPct

  const proteinGrams = (proteinCals / 4).toFixed(1)
  const fatGrams = (fatCals / 9).toFixed(1)
  const carbGrams = (carbCals / 4).toFixed(1)

  document.getElementById('results').innerHTML = `
    <h3>Daily Nutrition Estimate</h3>
    <p><strong>Calories per day:</strong> ${Math.round(mer)} kcal</p>

    <div class="macro-summary">
      <div class="macro-info">
        <p><strong>Macronutrient Breakdown:</strong></p>
        <ul>
          <li>Protein: ${Math.round(proteinPct * 100)}% – ${Math.round(proteinCals)} kcal – ${proteinGrams} g</li>
          <li>Fat: ${Math.round(fatPct * 100)}% – ${Math.round(fatCals)} kcal – ${fatGrams} g</li>
          <li>Carbohydrates: ${Math.round(carbPct * 100)}% – ${Math.round(carbCals)} kcal – ${carbGrams} g</li>
        </ul>
      </div>
      <div class="macro-chart">
        <canvas id="macroChart" width="300" height="300"></canvas>
      </div>
    </div>

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

  setTimeout(() => {
    const canvas = document.getElementById('macroChart')
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (window.macroChart instanceof Chart) {
      window.macroChart.destroy()
    }

    window.macroChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
          data: [proteinCals, fatCals, carbCals],
          backgroundColor: ['#a088f7', '#8ad0f5', '#66bfa4']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Estimated Macronutrient Breakdown'
          },
          datalabels: {
            color: '#000',
            font: {
              weight: 'bold'
            },
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex]
              const percent = ((value / mer) * 100).toFixed(1)
              let grams
              if (label === 'Protein') grams = (value / 4).toFixed(1)
              else if (label === 'Fat') grams = (value / 9).toFixed(1)
              else grams = (value / 4).toFixed(1)
              return `${label}\n${percent}%\n${grams}g`
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    })
  }, 100)
})
