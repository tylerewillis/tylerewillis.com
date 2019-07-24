$(document).ready(function(){

// Mobile navigation
$('.mn-button').click(function(){
	$(this).toggleClass('mn-button-open');
	$('.mobile-nav-container').toggleClass('mobile-nav-container-open');
})

// Prerender pages
document.querySelectorAll('a').forEach(link => {    
  link.addEventListener('mouseover', (e) => {
    let href = link.getAttribute('href');
    if (href.charAt(0) != '#' && href != window.location.href && href != window.location.pathname){
	    let prerenderLink = document.createElement("link")
	    prerenderLink.setAttribute("rel", "prerender")
	    prerenderLink.setAttribute("href", href)
	    document.head.appendChild(prerenderLink)
	  }
  })
})

// Close alerts
$('.alert-close').click(function(){
	$(this).closest('.alert').add('.alert-center-container').fadeOut()
	$.ajax({
		url:'/sessions/alerts',
    success: function(data){
    //success
    }
  })
})

// Close Privacy Statement
$('.pf-close').click(function(){
	$(this).closest('.privacy-footer').fadeOut()
	$.ajax({
		url:'/sessions/privacy',
    success: function(data){
    //success
    }
  })
})

// Animsition
$(".animsition").animsition({
	inClass: 'fade-in',
	outClass: 'fade-out',
	inDuration: 400,
	outDuration: 0,
	linkElement: '.animsition-link',
	loading: false,
	loadingParentElement: 'body',
	loadingClass: 'animsition-loading',
	loadingInner: '', // e.g '<img src="loading.svg" />'
	timeout: false,
	timeoutCountdown: 5000,
	onLoadEvent: true,
	browser: [ 'animation-duration', '-webkit-animation-duration'],
	overlay : false,
	overlayClass : 'animsition-overlay-slide',
	overlayParentElement : 'body',
	transition: function(url){ window.location.href = url; }
})

})