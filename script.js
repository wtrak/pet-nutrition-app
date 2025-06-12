// Register datalabel plugin globally
Chart.register(ChartDataLabels);

// Your existing breedData and populateBreeds code here (not repeated for brevity)

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
    if (window.macroChart && typeof window.macroChart.destroy === 'function') {
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
