/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */



( function() {
	'use strict';

	AOS.init();

	const masthead = document.getElementById( 'masthead' );
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation don't exist.
	if ( ! siteNavigation ) {
		return;
	}

	//Primary Menu Toggle Btn
	const primaryMenuBtn = document.getElementById( 'primaryMenuBtn' );

	//Secondary Menu Toggle Btn
	const secondaryMenuBtn = document.getElementById( 'secondaryMenuBtn' );

	// Roote element of the document.
	const docElement = document.documentElement;

	// Return early if the button don't exist.
	if ( 'undefined' === typeof primaryMenuBtn ) {
		return;
	}

	const navbarMenu = document.getElementById( 'navigationPrimaryMenu' );

	const secondaryMenu = document.getElementById( 'navigationSecondaryMenu' );//navbar-secondary-menu

	const subMenuList = siteNavigation.getElementsByClassName( 'nav-menu__sub-menu' );

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof navbarMenu ) {
		primaryMenuBtn.style.display = 'none';
		return;
	}

	if ( 'undefined' === typeof secondaryMenu ) {
		secondaryMenuBtn.style.display = 'none';
	}

	// Toggle the primary-menu-toggled class and the aria-expanded value each time the button is clicked.
	primaryMenuBtn.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'primary-menu-toggled' );
		docElement.classList.toggle( 'primary-menu-open' );
		masthead.classList.remove( 'menu-closing' );

		if ( primaryMenuBtn.getAttribute( 'aria-expanded' ) === 'true' ) {
			primaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
		} else {
			primaryMenuBtn.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Toggle the secondary-menu-toggled class and the aria-expanded value each time the button is clicked.
	secondaryMenuBtn.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'secondary-menu-toggled' );
		docElement.classList.toggle( 'secondary-menu-open' );
		masthead.classList.remove( 'menu-closing' );

		if ( secondaryMenuBtn.getAttribute( 'aria-expanded' ) === 'true' ) {
			secondaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
		} else {
			secondaryMenuBtn.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	

	// Get all the link elements within the menu.
	const links = navbarMenu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = navbarMenu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
		link.addEventListener( 'click', toggleFocus, true );
		link.addEventListener( 'mouseenter', itemHover, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */

	let focusedMenuLink = null
	let focusedParentMenuItem = null;

	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur'  ) {
			let self = this;
			if (event.type === 'focus') {
				focusedMenuLink = this;
			}

			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( self.classList && ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					if (self !== focusedParentMenuItem && (self.classList) ) {
						if (event.type === 'focus') {
							self.classList.add( 'focus' );
						} else {
							self.classList.remove( 'focus' );
						}
					}
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' || event.type === 'click') {
			if(event.type === 'click' && ! docElement.classList.contains('primary-menu-open')) {
				return;
			}

			const menuItem = this.parentNode;
			if ( focusedParentMenuItem !== menuItem ){
				focusedParentMenuItem = menuItem;
				focusedMenuLink = this;
				event.preventDefault();
				for ( const link of menuItem.parentNode.children ) {
					if ( menuItem !== link ) {
						link.classList.remove( 'focus' );
					}
				}
				menuItem.classList.add( 'focus' );
			}
		}
	}

	
	function itemHover() {
		// On parent item hover, blur the item that was focused by keyboard, and
		// Remove menu-closing class. 
		let self = this;
		masthead.classList.remove( 'menu-closing' );
		if( focusedMenuLink && self !== focusedMenuLink) {
			focusedMenuLink.blur();
			focusedMenuLink = null;
		}
	}
	

	// Remove the primary-menu-toggled, secondary-menu-toggled classes and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInsideNavMenu = siteNavigation.contains( event.target );

		if ( ! isClickInsideNavMenu ) {
			siteNavigation.classList.remove( 'primary-menu-toggled' );
			siteNavigation.classList.remove( 'secondary-menu-toggled' );

			docElement.classList.remove( 'primary-menu-open' );
			docElement.classList.remove( 'secondary-menu-open' );

			primaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
			secondaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	function updateMenuUI() {
		// The burger menu is visible upto the breakpoint of 991.98px. Hence the menu should be reset at this breakpoint.
		if (window.matchMedia("(min-width: 991.98px)").matches){
			masthead.classList.add( 'menu-closing' );
			siteNavigation.classList.remove( 'primary-menu-toggled' );
			primaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
			docElement.classList.remove( 'primary-menu-open' );
		}

		siteNavigation.classList.remove( 'secondary-menu-toggled' );
		secondaryMenuBtn.setAttribute( 'aria-expanded', 'false' );
		docElement.classList.remove( 'secondary-menu-open' );

		if( focusedParentMenuItem ){
			focusedParentMenuItem.classList.remove( 'focus' );
			focusedParentMenuItem = null;
		}

		if( focusedMenuLink ){
			focusedMenuLink.classList.remove( 'focus' );
			focusedMenuLink = null;
		}

	}
	window.addEventListener("resize", updateMenuUI, false);


	const headerLogo = document.getElementsByClassName("navbar__branding_home-page")[0];
	const sliderLogo = document.getElementById("sliderLogo");

	window.addEventListener("scroll", function(e){
		if(headerLogo && sliderLogo) {
			let windowYOffet  = window.pageYOffset;
			if(windowYOffet > 10){
				headerLogo.classList.remove("logo-hide");
				sliderLogo.classList.add("logo-hide");
			} else {
				headerLogo.classList.add("logo-hide");
				sliderLogo.classList.remove("logo-hide");

			}
		}
	});


	// Sticky Form
	const stickyFormContainer = document.getElementById("stickyFormContainer");

	if(stickyFormContainer){
		stickyFormContainer.style.display = 'block';

		const stickyButton = document.getElementById("stickyButton");
		
		const stickyCloseBtn = document.getElementById("stickyCloseBtn");
		const stickyForm = document.getElementById("stickyForm");
		

		if(stickyButton && stickyFormContainer){
			stickyButton.addEventListener("click", function(e){
				stickyFormContainer.classList.add("toggled");
			});
		}

		if(stickyCloseBtn){
			stickyCloseBtn.addEventListener("click", function(e){
				stickyFormContainer.classList.remove("toggled");
			});
		}

		// Remove the .toggled class and set aria-expanded to false when the user clicks outside the sticky form.
		document.addEventListener( 'click', function( event ) {
			const isClickInsideStickyForm = stickyForm.contains( event.target );

			if ( ! isClickInsideStickyForm ) {
				stickyFormContainer.classList.remove("toggled");
			}
		} );
	}

}() );
