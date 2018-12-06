import carouselData from './../../data/copy.json'
import { select, selectAll, findAll, addClass, removeClass } from './utils/dom'
import { find, some } from 'lodash'

// Get json data organizer data from Google Doc
const { organizers } = carouselData

// Initialize scroll position for caching
let scrollPosition = 0

/**
 * Handle opening and closing of popup
 * @method popup
 */
const popup = () => {
  // Cache HTML variables; these will all be either DOM Elements
  // or arrays of DOM Elements
  const $popup = select('[data-popup]')
  const $popupThumbText = findAll($popup, '[data-popup-thumb-text]')[0]
  const $popupText = findAll($popup, '[data-popup-text]')[0]
  const open = selectAll('[data-open]')
  const $close = select('[data-close]')
  const $popupThumbContainer = select('[data-popup-thumb]')
  const $popupImageContainer = select('[data-popup-images]')
  const $html = document.getElementsByTagName('HTML')[0]
  const $body =  document.getElementsByTagName('BODY')[0]
  const { hash } = window.location
  const allIDs = organizers.map(organizer => organizer.id)


  // Open functionality
  const openPopup = (id) => {
    // Find organizer in organizers json data
    const matchedOrganizer = find(organizers, org => id === org.id)

    // If we have a match, run functionality to open the popup
    if(matchedOrganizer) {
      // Loop over the full text from the matched results and map
      // html to them
      // const fullText = matchedOrganizer['full-text'].map(textObj => {
      //   const { value, type } = textObj
      //   const html = type === 'text' ? `<p class="popup__p">${value}</p>`: ''
      //
      //   return html
      // }).join('')

     // Set thumb image html
      const firstImageHTML = `
        <div class="popup__photo-thumb">
          <h3 class = "popup__title">${matchedOrganizer['event']}</h3>
          <p class = "popup__year">${matchedOrganizer['year']}</p>
          <img src="assets/thumb_images/yoThumb_${matchedOrganizer['thumb-image']}.jpg" class="popup__image"/>
           <p class="popup__credit">Courtesy of ${matchedOrganizer['thumb-credit']}</p>
          <p class="popup__thumb-caption">${matchedOrganizer['intro-text']}</p>

        </div>
      `

      // If popup image array, attach images
      if(matchedOrganizer['image-id']) {
        const popupImagesHTML = matchedOrganizer['image-id'].map(imageObj => {
          const { image, caption, credit } = imageObj
          return `
            <div class="popup__photo-essay">
              <img src="assets/popup/popup_${id}/archive_${image}--placeholder.jpg" data-src="assets/popup/popup_${id}/archive_${image}.jpg" class="popup__image" data-popup-image/>
              <p class = "popup__credit">Courtesy of ${credit}</p>
              <p class="popup__caption">${caption}</p>

            </div>
          `
        })

        const popImagesHTML = popupImagesHTML.join('')
        // const allImagesHTML = [firstImageHTML, ...popupImagesHTML].join('')

        $popupThumbContainer.innerHTML = firstImageHTML
        $popupImageContainer.innerHTML = popImagesHTML

        const popupImages = findAll($popupImageContainer, '[data-popup-image]')

        popupImages.forEach($image => {
          const src = $image.getAttribute('data-src')
          $image.src = src
        })

      } else {
        $popupThumbContainer.innerHTML = firstImageHTML
      }

      // Cache current scroll position before adding our 'no-scroll'
      // class to the html and body
      scrollPosition = window.scrollY

      // Set the innerHTML of the text container in the popup to
      // the fullText string
      // $popupText.innerHTML = fullText

      // Add 'show' class which will open the popup
      addClass($popup, 'show')

      // Add 'no-scroll' class to html and body to prevent user from
      // scrolling on the background while popup is open
      addClass($html, 'no-scroll')
      addClass($body, 'no-scroll')
    }
  }

  // Check if hash in url, open popup if hash matches an organizer
  if(some(organizers, { id: hash.replace('#', '') })) {
    openPopup(hash.replace('#', ''))
  }

  // Loop through all the "Read More" buttons
  open.forEach($open => {
    // Attach click handler to the button
    $open.addEventListener('click', e => {
      // Grab organizer id from button
      const id = $open.getAttribute('data-open')
      openPopup(id)
    })
  })

  // Attach click handler to close button in popup
  $close.addEventListener('click', e => {
    // Enable scrolling by removing 'no-scroll' class
    removeClass($html, 'no-scroll')
    removeClass($body, 'no-scroll')

    // removeClass($popup, 'show')
    // Set scroll position to position before the popup was open
    window.scrollTo(0, scrollPosition)

    // Hide the popup
    removeClass($popup, 'show')

    // Remove hash from url
    history.pushState('', document.title, window.location.pathname + window.location.search)
  })
}

export default popup
