$(document).ready(function(){

	//===============================
	// Flashcards - Turn card over
	//===============================

	$(document).on('click', '.turn', function(){
		var card = $(this).closest('.card')
		var currentText = card.find('.answer .text').text()
		var flipped = card.attr('data-flipped')
		if(flipped == 0) {
			var answer = card.attr('data-answer')
			card.find('.answer .text').text(answer)
			card.attr('data-flipped', 1)
		} else {
			card.find('.answer .text').text('?')
			card.attr('data-flipped', 0)
		}
	})

	//===============================
	// Flashcards - Next card
	//===============================

	$(document).on('click', '.next', function(){
		var card = $(this).closest('.card')
		card.removeClass('active')
		var next = card.next()
		if(next.length){
			next.addClass('active')
		} else {
			$('.card').first().addClass('active')
		}
	})

	//===============================
	// Flashcards - Previous card
	//===============================

	$(document).on('click', '.previous', function(){
		var card = $(this).closest('.card')
		card.removeClass('active')
		var prev = card.prev()
		if(prev.length) {
			prev.addClass('active')
		} else {
			$('.card').last().addClass('active')
		}
	})

	//===============================
	// Flashcards - Random card
	//===============================

	$(document).on('click', '.random', function(){
		var card = $(this).closest('.card')
		card.removeClass('active')
		var totalCards = $('.cards').attr('data-items')
		var random = Math.floor((Math.random() * totalCards))
		$(`.card:nth-child(${random})`).addClass('active')
	})

	//===============================
	// Flashcards - Arrow navigation
	//===============================

	$(document).keydown(function(e) {
    if(e.which == 39) { // Right - next
    	var card = $('.active')
			card.removeClass('active')
			var next = card.next()
			if(next.length){
				next.addClass('active')
			} else {
				$('.card').first().addClass('active')
			}
    } else if(e.which == 37) { // Left - previous
    	var card = $('.active')
			card.removeClass('active')
			var prev = card.prev()
			if(prev.length) {
				prev.addClass('active')
			} else {
				$('.card').last().addClass('active')
			}
    } else if(e.which == 38) { // Up - random
    	var card = $('.active')
			card.removeClass('active')
			var totalCards = $('.cards').attr('data-items')
			var random = Math.floor((Math.random() * totalCards))
			$(`.card:nth-child(${random})`).addClass('active')
    } else if(e.which == 40) { // Down - flip
    	var card = $('.active')
			var currentText = card.find('.answer .text').text()
			var flipped = card.attr('data-flipped')
			if(flipped == 0) {
				var answer = card.attr('data-answer')
				card.find('.answer .text').text(answer)
				card.attr('data-flipped', 1)
			} else {
				card.find('.answer .text').text('?')
				card.attr('data-flipped', 0)
			}
    }
	})

	// =====================================================
	// Array Shuffle via Durstenfeld algorithm.
	// =====================================================

	function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
	}

	// =====================================================
	// Sorting Animations - Generating numbers
	// =====================================================

	var homeNumbers = $('.numbers')
	if (homeNumbers) {
		var windowWidth = $(window).width()
		var windowHeight = $(window).height()

		var rows = Math.floor(windowHeight / 40)//20
		var columns = Math.floor(windowWidth / 70)//40
		var totalNumbers = rows * columns

		var numbers= []
		for (i = 0; i < totalNumbers; i++) {
			numbers.push(i)
		}

		shuffleArray(numbers)
		for (i = 0; i < numbers.length; i++) {
			$('.numbers').append(`<p class="number">${numbers[i]}</p>`)
		}
	}

})