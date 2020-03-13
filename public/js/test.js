// Get inline HTML location
var scriptTag = document.scripts[document.scripts.length - 1]

//=================
// Text
//=================

const html = "<a href='/privacy-policy' class='open-privacy-page'>Privacy Policy</a>"
scriptTag.insertAdjacentHTML('afterend', html)

$('.open-privacy-page').click((e) => {
	e.preventDefault()
	loadPrivacyPolicy()
})

$('.open-privacy-page').keydown((e) => {
	e.preventDefault()
	if (e.keyCode === 13 || e.keyCode === 32) loadPrivacyPolicy()
})

const privacyContent = `
	<div class='container' style='background-color: #fff;'>
		<div class='content'>
			<h1>Privacy Policy</h1>
		</div>
	</div>
`

const loadPrivacyPolicy = () => {
	history.replaceState('data to be passed', 'Privacy Policy', '/privacy-policy')
	$('title').text('Privacy Policy')
	$('body').html(privacyContent)
}

//=================
// Popup
//=================

// const block = `
// 	<div id='123' style='display: none;z-index: 100; position: fixed;top: 0;, left: 0; width: 100vw; height: 100vh;background-color: rgba(0,0,0,.5);'>
// 		<div style='width: 300px;height: 400px;margin: auto;background-color: #fff;'>
// 			<p>This is a test call to action</p>
// 		</div>
// 	</div>
// `

// $('body').append(block)

// setTimeout(function() {
// 	$('#123').fadeToggle()
// }, 3000)

//=================
// Form
//=================

// const form = `
// 	<form id='123'>
// 		<input type='text' placeholder='First name'>
// 		<input type='submit'>
// 	</form>
// `

// scriptTag.insertAdjacentHTML('afterend', form)

// $('#123').submit(function(e) {
// 	var first = $(this).find('input[type=text]').val()
// 	$(this).html('<p>Thanks, ' + first + '!')
// 	e.preventDefault()
// })

//=================
// Titles to links
//=================

// $(document).ready(function() {
// 	$('a').each(function(){
// 		if(!$(this).attr('title')) $(this).attr('title', $(this).text())
// 	})
// })

//=================
// SEO
//=================

$('title').text('New Title')

//=================
// Verification of user's key and website match
// Example of checking for valid user
//=================

async function isValidUser(id, website) {
  const response = await fetch('http://localhost:3002/user/' + id + '/' + website);
  const body = await response.json();
  return body.success
}

if (scriptTag.getAttribute('data-id')) {
	const success = isValidUser(scriptTag.getAttribute('data-id'), window.location.hostname)
}

//============================
//= 1.1.1
//============================

const imageAlt = image => {
	if (!image.getAttribute('alt')) {
		let path = image.getAttribute('src').split('/')
		image.setAttribute('alt', path[path.length - 1].split('.')[0])
	}
}

const backgroundImageLabel = element => {

}

//============================
//= 2.4.4
//============================

const WCAG244 = () => {

}

//============================
//= Utils
//============================

function makeId(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const getLabelText = element => {
	var text
	if (element.getAttribute('placeholder')) text = element.getAttribute('placeholder')
	else if (element.getAttribute('name')) {
		let name = element.getAttribute('name')
		if (name.indexOf('-') !== -1) {
			let temp = name.split('-')
			temp[0] = temp[0].charAt(0).toUpperCase() + temp[0].substr(1)
			text = temp.join(' ')
		} else if (name.indexOf('_') !== -1) {
			let temp = name.split('_')
			temp[0] = temp[0].charAt(0).toUpperCase() + temp[0].substr(1)
			text = temp.join(' ')
		} else {
			text = element.getAttribute('name')
		}
	}
	return text
}

const createNewLabel = (element, id, labelText) => {
	let temp = $(element)
	$(element).replaceWith("<label for='" + id + "'>" + labelText + "</label>")
	$(temp).appendTo('label[for=' + id + ']')
	$(temp).attr('id', id)
}

//============================
//= Misc
//============================

const checkIfLabel = element => {
	let type = element.getAttribute('type')
	if (type !== 'hidden' && type !== 'submit') {
		let id = element.getAttribute('id')
		if ((id && !$('label[for=' + id + ']').length) || !id) {
			let newId = (id) ? id : makeId(5)
			if (element.parentElement.nodeName == 'LABEL') {
				element.parentElement.setAttribute('for', newId)
				element.setAttribute('id', newId)
			} else if (element.previousSibling && element.previousSibling.nodeName == 'LABEL') {
				element.previousSibling.setAttribute('for', newId)
				element.setAttribute('id', newId)
			} else {
				const labelText = getLabelText(element)
				createNewLabel(element, newId, labelText)
			}
		}
	}
}

//============================
//= Default page algorithm
//============================

$(document).ready(function() {
	var elements = document.querySelectorAll('*')
	Array.from(elements).forEach(element => {
		// Check for background image
		let styles = window.getComputedStyle(element)
		if (styles.getPropertyValue('background-image') !== 'none') {
			let path = styles.getPropertyValue('background-image').split('/')
			element.setAttribute('aria-label', path[path.length - 1].split('.')[0])
		}
		// Image
		if (element.tagName == 'IMG') {
			imageAlt(element)
		}
		// Link
		if (element.tagName == 'A') {
			//console.log(element)
		}
		// Inputs
		if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' || element.tagName == 'SELECT') {
			checkIfLabel(element)
		}
		// JS onclick
		if ($._data(element, "events")) {
			let events = $._data(element, "events")
			if (events.hasOwnProperty('click') && !events.hasOwnProperty('focus')) {
				let clickEvent = events.click[0]
				$(element).keydown(clickEvent)
				element.setAttribute('tabindex', "0")
				element.setAttribute('role', 'button')
				element.setAttribute('aria-pressed', false)
				// also need to make it highlighted/focused when tabbed
			}
		}
	})
})



