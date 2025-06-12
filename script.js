const breedData = {
  dog: [
    { name: 'Airedale Terrier', idealMin: 18, idealMax: 29, activity: 'moderate', proneToObesity: false },
    { name: 'Akita', idealMin: 32, idealMax: 59, activity: 'moderate', proneToObesity: true },
    { name: 'Alaskan Malamute', idealMin: 34, idealMax: 43, activity: 'high', proneToObesity: false },
    { name: 'Australian Shepherd', idealMin: 16, idealMax: 32, activity: 'high', proneToObesity: false },
    { name: 'Beagle', idealMin: 9, idealMax: 14, activity: 'moderate', proneToObesity: true },
    { name: 'Bernese Mountain Dog', idealMin: 35, idealMax: 55, activity: 'moderate', proneToObesity: true },
    { name: 'Bichon Frise', idealMin: 5, idealMax: 10, activity: 'moderate', proneToObesity: true },
    { name: 'Border Collie', idealMin: 12, idealMax: 20, activity: 'high', proneToObesity: false },
    { name: 'Boston Terrier', idealMin: 6, idealMax: 11, activity: 'moderate', proneToObesity: true },
    { name: 'Boxer', idealMin: 25, idealMax: 32, activity: 'high', proneToObesity: false },
    { name: 'Bull Terrier', idealMin: 20, idealMax: 35, activity: 'moderate', proneToObesity: true },
    { name: 'Cavalier King Charles Spaniel', idealMin: 5.5, idealMax: 8.5, activity: 'moderate', proneToObesity: true },
    { name: 'Chihuahua', idealMin: 1.8, idealMax: 2.7, activity: 'moderate', proneToObesity: true },
    { name: 'Cocker Spaniel', idealMin: 10, idealMax: 15, activity: 'moderate', proneToObesity: true },
    { name: 'Dachshund', idealMin: 7, idealMax: 14, activity: 'low', proneToObesity: true },
    { name: 'Doberman Pinscher', idealMin: 27, idealMax: 45, activity: 'high', proneToObesity: false },
    { name: 'English Setter', idealMin: 25, idealMax: 36, activity: 'moderate', proneToObesity: false },
    { name: 'French Bulldog', idealMin: 9, idealMax: 13, activity: 'low', proneToObesity: true },
    { name: 'German Shepherd', idealMin: 22, idealMax: 40, activity: 'high', proneToObesity: false },
    { name: 'Golden Retriever', idealMin: 25, idealMax: 34, activity: 'moderate', proneToObesity: true },
    { name: 'Great Dane', idealMin: 50, idealMax: 80, activity: 'moderate', proneToObesity: false },
    { name: 'Great Pyrenees', idealMin: 45, idealMax: 60, activity: 'low', proneToObesity: true },
    { name: 'Greyhound', idealMin: 27, idealMax: 40, activity: 'high', proneToObesity: false },
    { name: 'Irish Setter', idealMin: 27, idealMax: 32, activity: 'high', proneToObesity: false },
    { name: 'Labrador Retriever', idealMin: 25, idealMax: 36, activity: 'moderate', proneToObesity: true },
    { name: 'Mastiff', idealMin: 55, idealMax: 100, activity: 'low', proneToObesity: true },
    { name: 'Miniature Schnauzer', idealMin: 5, idealMax: 9, activity: 'moderate', proneToObesity: true },
    { name: 'Newfoundland', idealMin: 45, idealMax: 70, activity: 'moderate', proneToObesity: true },
    { name: 'Pembroke Welsh Corgi', idealMin: 10, idealMax: 14, activity: 'moderate', proneToObesity: true },
    { name: 'Pomeranian', idealMin: 1.5, idealMax: 3.5, activity: 'moderate', proneToObesity: true },
    { name: 'Poodle (Standard)', idealMin: 20, idealMax: 32, activity: 'moderate', proneToObesity: false },
    { name: 'Rottweiler', idealMin: 35, idealMax: 60, activity: 'moderate', proneToObesity: true },
    { name: 'Scottish Terrier', idealMin: 8.5, idealMax: 10.5, activity: 'moderate', proneToObesity: true },
    { name: 'Shih Tzu', idealMin: 4.5, idealMax: 7.5, activity: 'low', proneToObesity: true },
    { name: 'Siberian Husky', idealMin: 16, idealMax: 27, activity: 'high', proneToObesity: false },
    { name: 'Staffordshire Bull Terrier', idealMin: 11, idealMax: 17, activity: 'moderate', proneToObesity: false },
    { name: 'Vizsla', idealMin: 20, idealMax: 30, activity: 'high', proneToObesity: false },
    { name: 'Weimaraner', idealMin: 25, idealMax: 41, activity: 'high', proneToObesity: false },
    { name: 'Whippet', idealMin: 9, idealMax: 18, activity: 'high', proneToObesity: false },
    { name: 'Yorkshire Terrier', idealMin: 2, idealMax: 3.5, activity: 'moderate', proneToObesity: false }
  ],
  cat: [
    { name: 'Bengal', idealMin: 3.5, idealMax: 7, activity: 'high', proneToObesity: false },
    { name: 'Domestic Shorthair', idealMin: 3, idealMax: 6, activity: 'moderate', proneToObesity: true },
    { name: 'Maine Coon', idealMin: 6, idealMax: 9, activity: 'moderate', proneToObesity: false },
    { name: 'Persian', idealMin: 3, idealMax: 5.5, activity: 'low', proneToObesity: true },
    { name: 'Siamese', idealMin: 2.5, idealMax: 5.5, activity: 'high', proneToObesity: false }
  ]
}

// Sort breeds alphabetically
for (const type in breedData) {
  breedData[type].sort((a, b) => a.name.localeCompare(b.name))
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

// Main Form Logic
document.getElementById('petForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const petType = document.getElementById('petType').value
  const weightUnit = document.getElementById('weightUnit').value
  let weight = parseFloat(document.getElementById('weight').value)
  const neutered = document.getElementById('neutered').value
  const activity = document.getElementById('activity').value
  const goal = document.getElementById('goal').value
  const breedName = document.getElementById('breed').value

  if (weightUnit === 'lbs') weight /= 2.20462

  const rer = 70 * Math.pow(weight, 0.75)
  let multiplier = (goal === 'lose') ? 1.0 : (goal === 'gain') ? 2.0 : neutered === 'yes' ? (petType === 'dog' ? 1.6 : 1.2) : (petType === 'dog' ? 1.8 : 1.4)

  if (activity === 'low') multiplier -= 0.1
  if (activity === 'high') multiplier += 0.2

  const breedInfo = breedData[petType].find(b => b.name === breedName)
  if (breedInfo) {
    if (breedInfo.activity === 'low') multiplier -= 0.1
    if (breedInfo.activity === 'high') multiplier += 0.1
  }

  const mer = rer * multiplier
  const waterMl = Math.round(weight * 55)

  const proteinCals = mer * 0.25
  const fatCals = mer * 0.3
  const carbCals = mer * 0.45

  const proteinGrams = (proteinCals / 4).toFixed(1)
  const fatGrams = (fatCals / 9).toFixed(1)
  const carbGrams = (carbCals / 4).toFixed(1)

  let idealMin = breedInfo.idealMin
  let idealMax = breedInfo.idealMax
  let weightLabel = 'kg'
  if (weightUnit === 'lbs') {
    idealMin = (idealMin * 2.20462).toFixed(1)
    idealMax = (idealMax * 2.20462).toFixed(1)
    weightLabel = 'lbs'
  }

  document.getElementById('results').innerHTML = `
    <h3>Nutrition Estimate for ${breedName}</h3>
    <canvas id="macroChart" width="320" height="320"></canvas>
    <ul>
      <li><strong>Calories/day:</strong> ${Math.round(mer)} kcal</li>
      <li><strong>Protein:</strong> 25% – ${proteinGrams}g – ${Math.round(proteinCals)} kcal</li>
      <li><strong>Fat:</strong> 30% – ${fatGrams}g – ${Math.round(fatCals)} kcal</li>
      <li><strong>Carbs:</strong> 45% – ${carbGrams}g – ${Math.round(carbCals)} kcal</li>
    </ul>
    <p><strong>Water Needed:</strong> ${waterMl} ml (~${(waterMl / 1000).toFixed(2)} L)</p>
    <p><strong>Ideal Weight:</strong> ${idealMin}–${idealMax} ${weightLabel}</p>
    ${breedInfo.proneToObesity ? '<p style="color:red;"><strong>Note:</strong> This breed is prone to obesity. Monitor weight.</p>' : ''}
  `

  setTimeout(() => {
    const ctx = document.getElementById('macroChart').getContext('2d')
    if (window.macroChart instanceof Chart) {
  window.macroChart.destroy()
}

    window.macroChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
          data: [proteinCals, fatCals, carbCals],
          backgroundColor: ['#8BC34A', '#FF9800', '#03A9F4']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Macronutrient Breakdown'
          },
          datalabels: {
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex]
              const percent = ((value / mer) * 100).toFixed(1)
              let grams = label === 'Fat' ? (value / 9) : (value / 4)
              return `${label}\n${percent}%\n${grams.toFixed(1)}g`
            },
            color: '#000',
            font: {
              weight: 'bold'
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    })
  }, 100)
})
