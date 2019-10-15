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

})