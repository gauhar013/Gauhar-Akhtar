(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// Code Rain Animation
	var codeRain = function() {
		const canvas = document.getElementById('code-rain');
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
		const charArray = chars.split('');
		const fontSize = 14;
		const columns = canvas.width / fontSize;
		const drops = [];
		
		for (let i = 0; i < columns; i++) {
			drops[i] = 1;
		}
		
		function draw() {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			ctx.fillStyle = '#00ff99';
			ctx.font = fontSize + 'px monospace';
			
			for (let i = 0; i < drops.length; i++) {
				const text = charArray[Math.floor(Math.random() * charArray.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);
				
				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		}
		
		setInterval(draw, 33);
		
		window.addEventListener('resize', function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
	};

	// Typewriter Effect
	var typewriter = function() {
		const element = document.getElementById('typing');
		if (!element) return;
		
		const words = JSON.parse(element.getAttribute('data-words'));
		let wordIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
		
		function type() {
			const currentWord = words[wordIndex];
			
			if (isDeleting) {
				element.textContent = currentWord.substring(0, charIndex - 1);
				charIndex--;
			} else {
				element.textContent = currentWord.substring(0, charIndex + 1);
				charIndex++;
			}
			
			let typeSpeed = 100;
			
			if (isDeleting) {
				typeSpeed /= 2;
			}
			
			if (!isDeleting && charIndex === currentWord.length) {
				typeSpeed = 2000;
				isDeleting = true;
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				wordIndex = (wordIndex + 1) % words.length;
				typeSpeed = 500;
			}
			
			setTimeout(type, typeSpeed);
		}
		
		type();
	};

	// 3D Tilt Effect for Portfolio Items
	var tiltEffect = function() {
		const cards = document.querySelectorAll('.single-portfolio');
		
		cards.forEach(card => {
			card.addEventListener('mousemove', function(e) {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				
				const rotateX = (y - centerY) / 10;
				const rotateY = (centerX - x) / 10;
				
				card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
			});
			
			card.addEventListener('mouseleave', function() {
				card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
			});
		});
	};

	// Threat Console Simulation
	var threatConsole = function() {
		const console = document.getElementById('threat-console');
		const consoleLog = document.getElementById('console-log');
		const consoleClose = document.getElementById('console-close');
		
		if (!console || !consoleLog) return;
		
		const threats = [
			'[INFO] Scanning network for vulnerabilities...',
			'[WARN] Potential SQL injection detected on port 80',
			'[ERROR] Unauthorized access attempt from 192.168.1.100',
			'[INFO] Firewall rules updated successfully',
			'[WARN] Suspicious activity detected in log files',
			'[INFO] Security patch applied to system',
			'[ERROR] Failed login attempt from unknown IP',
			'[INFO] Threat database updated',
			'[WARN] Port scan detected from external source',
			'[INFO] System integrity check completed'
		];
		
		let logIndex = 0;
		
		function addLogEntry() {
			const timestamp = new Date().toLocaleTimeString();
			const threat = threats[logIndex % threats.length];
			const entry = `[${timestamp}] ${threat}\n`;
			
			consoleLog.textContent += entry;
			consoleLog.scrollTop = consoleLog.scrollHeight;
			
			logIndex++;
		}
		
		// Show console after 3 seconds
		setTimeout(() => {
			console.style.display = 'block';
			addLogEntry();
			
			// Add new entries every 2-5 seconds
			setInterval(addLogEntry, Math.random() * 3000 + 2000);
		}, 3000);
		
		// Close console
		if (consoleClose) {
			consoleClose.addEventListener('click', function() {
				console.style.display = 'none';
			});
		}
	};

	// Enhanced Filter Functionality
	var enhancedFilters = function() {
		$('.filters ul li').click(function(){
			var filterValue = $(this).attr('data-filter');

			// Remove 'active' class from all filter buttons
			$('.filters ul li').removeClass('active');
			// Add 'active' class to the current clicked button
			$(this).addClass('active');

			// If 'All' is clicked, show all items
			if(filterValue == '*') {
				$('.grid .single-portfolio').show();
			} else {
				// Else, hide all items that don't match the filter
				$('.grid .single-portfolio').not(filterValue).hide();
				// And show the ones that match the filter
				$('.grid .single-portfolio').filter(filterValue).show();
			}
		});

		// Initially trigger 'Projects' to simulate a click
		$('.filters ul li[data-filter=".packaging"]').click();
	};

	// Glitch Effect for Headings
	var glitchEffect = function() {
		const glitchElements = document.querySelectorAll('.glitch');
		
		glitchElements.forEach(element => {
			setInterval(() => {
				element.style.textShadow = `
					${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 20}px rgba(255, 0, 255, 0.8),
					${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 20}px rgba(0, 255, 255, 0.8)
				`;
				
				setTimeout(() => {
					element.style.textShadow = '0 0 30px rgba(0, 255, 153, 0.8)';
				}, 100);
			}, 3000);
		});
	};

	// Particle Interaction Enhancement
	var particleInteraction = function() {
		// Add custom particle interaction
		if (typeof particlesJS !== 'undefined') {
			// Enhanced particle configuration
			particlesJS("particles-js", {
				"particles": {
					"number": { "value": 90, "density": { "enable": true, "value_area": 800 }},
					"color": { "value": "#00ff99" },
					"shape": { "type": "circle" },
					"opacity": { "value": 0.5, "random": true },
					"size": { "value": 5, "random": true },
					"move": { "speed": 1.2, "direction": "none", "out_mode": "out" },
					"line_linked": {
						"enable": true, "distance": 150, "color": "#00ff99",
						"opacity": 0.4, "width": 1
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
						"onhover": { "enable": true, "mode": "repulse" },
						"onclick": { "enable": true, "mode": "push" }
					},
					"modes": {
						"repulse": { "distance": 100, "duration": 0.1 },
						"push": { "particles_nb": 40 }
					}
				}
			});
		}
	};

	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();
		 	var hash = this.hash;
		 		
		 	$('html, body').animate({

		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });
		});
		$("#pb-navbar ul li a[href^='#']").on('click', function(e){
			if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});

		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	

	var offCanvasNav = function() {
		// var toggleNav = $('.js-pb_nav-toggle'),
		// 		offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		// if( toggleNav.length > 0 ) {
		// 	toggleNav.click(function(e){
		// 		$(this).toggleClass('active');
		// 		offcanvasNav.addClass('active');
		// 		e.preventDefault();
		// 	});
		// }
		// offcanvasNav.click(function(e){
		// 	if (offcanvasNav.hasClass('active')) {
		// 		offcanvasNav.removeClass('active');
		// 		toggleNav.removeClass('active');
		// 	}
		// 	e.preventDefault();
		// })
	};
	


	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.site-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .site-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn site-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft site-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight site-animated');
							} else {
								el.addClass('fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	var navbarState = function() {

		var lastScrollTop = 0;
		$(window).scroll(function(){

			var $this = $(this),
				 	st = $this.scrollTop(),
				 	navbar = $('.site-navbar');

			if ( st > 200 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if ( navbar.hasClass('scrolled') && st > 300 ) {
		   	if (st > lastScrollTop){
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.removeClass('awake');
		      	// navbar.addClass('sleep');
		      // }
		   	} else {
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.addClass('awake');
		      	// navbar.removeClass('sleep');
		      // }
		   	}
		   	lastScrollTop = st;
		  }

		});



		

	};

	
	
	
	
	var siteStellar = function() {
		$(window).stellar({
	    responsive: true,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	



	// Page Nav
	var clickMenu = function() {

		$('.navbar-nav a:not([class="external"])').click(function(event){

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
				if (isMobile.any()) {
					$('.navbar-toggle').click();
				}
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500, 'easeInOutExpo');
			   }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function() {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
	};
	
	var magnificPopupControl = function() {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
	};




	var portfolioMasonry = function() {
 $('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
        
        var data = $(this).attr('data-filter');
        $grid.isotope({
          filter: data
        })
      });


      if(document.getElementById("section-portfolio")){
            var $grid = $(".grid").isotope({
              itemSelector: ".all",
              percentPosition: true,
              masonry: {
                columnWidth: ".all"
              }
            })
      };


	};


	$(function(){

		OnePageNav();
		offCanvasNav();
		contentWayPoint();
		navbarState();
		clickMenu();
		smoothScroll();
		portfolioMasonry();
		
		// Initialize cyberpunk features
		codeRain();
		typewriter();
		tiltEffect();
		threatConsole();
		enhancedFilters();
		glitchEffect();
		particleInteraction();
	});

	

})();

