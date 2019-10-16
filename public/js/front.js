$(document).ready(function(){

	//=============================
	//= Dynamic skills graph labels
	//=============================

	function getYears(start, end) {
    var diff = Math.abs(end - start)
    var days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    var years = (days / 365).toFixed(1)
    return years
  }

  var today = new Date()
	var skills = $('.skills')
	var javascript = 0

	if (skills.length) {
		$('.skill').each(function() {

			//- Update time label
			var start = Date.parse($(this).attr('data-start'))
			var string = getYears(start,today)
			$(this).find('.s-time').text(string + ' yrs')

		})
	}

	//=============================
	//= Dynamic skills graph height
	//=============================

	var windowHeight = $(window).height()
	if (skills.length) {
		var skillsTop = skills.offset().top
		$(window).on( 'scroll', function(){
			var st = $(window).scrollTop()
			
			if (st > (skillsTop - windowHeight) + windowHeight * .65) {
				$('.s-bar').removeClass('s-bar-zero')
			}
		})
	}

	//=============================
	//= Home - Posts fade in
	//=============================

	var pages = $('#pages')
	if (pages.length) {
		$(window).on( 'scroll', function(){
			var st = $(window).scrollTop()
			$('.post').each(function() {
				if (st > $(this).offset().top - windowHeight + 100) {
					$(this).css('opacity', '1')
				}
			})
		})
	}

	//=============================
	//= Pages - Posts Fade In
	//=============================

	var pages = $('.page-pages')
	if (pages.length) {
		$('.page-single').each(function() {
			if ($(this).offset().top < windowHeight) {
				$(this).css('opacity', '1')
			}
		})
	}

	if (pages.length) {
		$(window).on( 'scroll', function(){
			var st = $(window).scrollTop()
			$('.page-single').each(function() {
				if (st > $(this).offset().top - windowHeight + 200) {
					$(this).css('opacity', '1')
				}
			})
		})
	}

	//=============================
	//= Pages - Search
	//=============================

	if (pages.length) {
		var posts = document.getElementsByClassName('page-single')
		document.getElementsByClassName('pages-search')[0].onkeyup = function() {
			var keyword = this.value.toLowerCase()
			var found = 0

			//- Loop through posts
			for (i = 0; i < posts.length; i++) {
				posts[i].style.opacity = 1 // show all
				var html = posts[i].innerHTML.toLowerCase()
				if (!html.includes(keyword)) {
					posts[i].style.display = 'none'
				} else {
					posts[i].style.display = 'flex'
					found++
				}
			}

			//- Show count
			if (found == posts.length) {
				document.getElementsByClassName('pages-search-container')[0].getElementsByTagName('p')[0].innerHTML = ''
			} else {
				document.getElementsByClassName('pages-search-container')[0].getElementsByTagName('p')[0].innerHTML = found + ' of ' + posts.length
			}

			//- If no posts
			if (found < 1) {
				document.getElementsByClassName('pages-search-no-results')[0].innerHTML = "Sorry, I haven't written anything about <strong>" + keyword + "</strong> yet. Tweet me <a href='https://twitter.com/TylerEWillis' target='_blank'>@tylerewillis</a> if you think I should!"
			} else {
				document.getElementsByClassName('pages-search-no-results')[0].innerHTML = ''
			}
		}
	}

	// Initial Keyword Set
	if (pages.length) {
		if (document.getElementsByClassName('pages-search')[0].classList.contains('pages-search-init')) {
			var keyword = document.getElementsByClassName('pages-search')[0].value.toLowerCase()
			var posts = document.getElementsByClassName('page-single')
			var found = 0
			
			for (i = 0; i < posts.length; i++) {
				posts[i].style.opacity = 1 // show all
				var html = posts[i].innerHTML.toLowerCase()
				if (!html.includes(keyword)) {
					posts[i].style.display = 'none'
				} else {
					posts[i].style.display = 'flex'
					found++
				}
			}

			//- Show count
			if (found == posts.length) {
				document.getElementsByClassName('pages-search-container')[0].getElementsByTagName('p')[0].innerHTML = ''
			} else {
				document.getElementsByClassName('pages-search-container')[0].getElementsByTagName('p')[0].innerHTML = found + ' of ' + posts.length
			}

			//- If no posts
			if (found < 1) {
				document.getElementsByClassName('pages-search-no-results')[0].innerHTML = "Sorry, I haven't written anything about <strong>" + keyword + "</strong> yet. Tweet me <a href='https://twitter.com/TylerEWillis' target='_blank'>@tylerewillis</a> if you think I should!"
			} else {
				document.getElementsByClassName('pages-search-no-results')[0].innerHTML = ''
			}
		}
	}

})