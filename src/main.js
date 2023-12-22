const availableBikes = [...document.getElementById('gear_bike')]
  .filter(bikeOption => bikeOption.value !== '')
  .map(bike => ({ id: bike.value, name: bike.innerHTML }))

function observeActivites(callback) {
  const observer = new MutationObserver(() => {
    const pendingActivities = [
      ...document.querySelectorAll('.training-activity-row'),
    ].filter(activity => !activity.classList.contains('has-bike-switcher'))

    if (pendingActivities.length > 0) {
      pendingActivities.forEach(activity => activity.classList.add('has-bike-switcher'))

      callback(pendingActivities)
    }
  })

  observer.observe(document.querySelector('#search-results'), { childList: true, subtree: true })
}

function addBulkEditAction(element) {
  const bikeSelect = element.querySelector('select[name="bike_id"]')
  const actionList = element.querySelector('.col-actions > ul')
  const button = document.createElement('button')
  const newBike = availableBikes.find(availableBike => availableBike.id !== bikeSelect.value)

  button.classList.add('btn', 'btn-link', 'btn-xs')
  button.innerHTML = `Switch to "${newBike.name}"`
  button.onclick = event => switchBike(element, event.target, newBike)

  actionList.insertBefore(button, actionList.firstChild)
}

function switchBike(activityRow, button, newBike) {
  const form = activityRow.querySelector('.edit-col form')
  const submitButton = form.querySelector('button[type="submit"]')
  const bikeSelect = activityRow.querySelector('select[name="bike_id"]')
  const currentBike = availableBikes.find(availableBike => availableBike.id === bikeSelect.value)

  bikeSelect.value = newBike.id

  submitButton.click()

  button.innerHTML = `Switch to "${currentBike.name}"`
}

observeActivites((activities) => {
  // Premium feature that is taking up a lot of space, be gone
  document.querySelector('#search-results > thead > tr > .col-suffer-score')?.remove()

  activities.forEach((activity) => {
    activity.querySelector('.col-suffer-score').remove()

    if (activity.querySelector('.col-type').innerHTML.toLowerCase().includes('ride'))
      addBulkEditAction(activity)
  })
})
