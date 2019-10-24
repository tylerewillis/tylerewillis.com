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

//========================================
// Links - Adding Target_blank and External Link Tooltips
//========================================

function getTargetCallback(link) {
  return function() {
    link.className += ' new-tab'
  }
}

var links = document.getElementsByTagName('a')
for (var link of links) {
  var href = link.getAttribute('href')
  var target = link.getAttribute('target')
  if (target && target === '_blank') {
    link.addEventListener('mouseover', getTargetCallback(link))
  }
}

//========================================
//= Light/Dark Toggle
//========================================

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var mode = getCookie("mode")
  if (mode !== '') {
    if (mode == 'dark') { $('body').addClass('dark') }
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      $('body').addClass('dark')
      setCookie('mode', 'dark', 365)
      console.log('browser')
    }
  }
}
checkCookie()

$('.light-dark-toggle').click(function() {
	if ($('body').hasClass('dark')) {
		$('body').removeClass('dark')
		setCookie('mode', 'light', 365)
	} else {
		$('body').addClass('dark')
		setCookie('mode', 'dark', 365)
	}
})

})