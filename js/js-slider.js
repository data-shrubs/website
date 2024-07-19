/**
 * File slider.js.
 */
jQuery(function(){

   	let orientationMediaQuery = window.matchMedia("(orientation: portrait)");

   	// First get the viewport height and multiply it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

   	let loadSliderImages = function() {
   		let carouselDivs = document.getElementsByClassName("carousel-item-image");

   		//Set viewport height on resize.
   		let vh = window.innerHeight * 0.01;
  		document.documentElement.style.setProperty('--vh', `${vh}px`);

   		//extra Small screen and portrait orientation.
		if ((window.matchMedia("(max-width: 575px)").matches) && (window.matchMedia("(orientation: portrait)").matches)) {
	        $(carouselDivs).each(function(key, carouselDiv){	        	
	            
	            let image_url_xs_portrait = carouselDiv.getAttribute("data-src-xs-portrait");
	            //console.log("image_url_xs_portrait--" + image_url_xs_portrait);
	            carouselDiv.style.backgroundImage = "url("+image_url_xs_portrait+")";

	        });
	    }

	    //Small screen and portrait orientation.
		if ((window.matchMedia("(max-width: 767px)").matches) && (window.matchMedia("(orientation: portrait)").matches)) {
	        $(carouselDivs).each(function(key, carouselDiv){	        	
	            
	            let image_url_sm_portrait = carouselDiv.getAttribute("data-src-sm-portrait");
	            //console.log("image_url_sm_portrait--" + image_url_sm_portrait);
	            carouselDiv.style.backgroundImage = "url("+image_url_sm_portrait+")";

	        });
	    }
	    //Medium, Large screen and portrait orientation.
		if ((window.matchMedia("(min-width: 768px)").matches) && (window.matchMedia("(orientation: portrait)").matches)) {
	        $(carouselDivs).each(function(key, carouselDiv){	        	
	            
	            let image_url_md_portrait = carouselDiv.getAttribute("data-src-md-portrait");
	            //console.log("image_url_sm_portrait--" + image_url_sm_portrait);
	            carouselDiv.style.backgroundImage = "url("+image_url_md_portrait+")";

	        });
	    }

	    //Extra Small and landscape orientation.
	    else if ((window.matchMedia("(max-width: 575px)").matches) && (window.matchMedia("(orientation: landscape)").matches)) {
	        $(carouselDivs).each(function(key, carouselDiv){
	       
	            let image_url_xs_landscape = carouselDiv.getAttribute("data-src-xs-landscape");
	            //console.log("image_url_xs_landscape--" + image_url_xs_landscape);
	            carouselDiv.style.backgroundImage = "url("+image_url_xs_landscape+")";

	        });
	    } 

	    //Small, Medium, Large, Extra large screen and landscape orientation.
	    else if ( (window.matchMedia("(min-width: 576px)").matches) && (window.matchMedia("(orientation: landscape)").matches)) {
	        $(carouselDivs).each(function(key, carouselDiv){

	            let image_url_md_landscape = carouselDiv.getAttribute("data-src-md-landscape");
	            //console.log("image_url_md_landscape--" + image_url_md_landscape);
	            carouselDiv.style.backgroundImage = "url("+image_url_md_landscape+")";

	        });
	    } 
   	}
   	

	let carouselItems = document.getElementsByClassName('carousel-item');
	let heroSlider = document.getElementById("heroSlider");
	let slideAnimationList = [];


	if(carouselItems && (carouselItems.length > 0)){

		const firstSlide = carouselItems[0];
		const firstSlideAnimationDIV = firstSlide.getElementsByClassName('carousel-item-animation')[0];

		if(firstSlideAnimationDIV && slideAnimationList[0] == null){
			const firstSlideAnimationPath = firstSlideAnimationDIV.getAttribute("data-src");
			
			slideAnimationList[0] = bodymovin.loadAnimation({
				container: firstSlideAnimationDIV, // Required
				path: firstSlideAnimationPath, // Required
				renderer: 'svg/canvas/html', // Required
				loop: true, // Optional
				autoplay: true, // Optional
			  	name: "First Slide Aniamtion", // Name for future reference. Optional.
			});
		}
	}
	

	$('#heroSlider').on('slid.bs.carousel', function (event) {

		const slider = event.target;
		if(slider){
			const activeSlide = slider.getElementsByClassName('active')[0];
			const slideAnimationDIV = activeSlide.getElementsByClassName('carousel-item-animation')[0];
			if(slideAnimationDIV ) {
				const slideIndex = activeSlide.getAttribute("data-index");
				if(slideAnimationList[slideIndex] == null){
					const slideAnimationPath = slideAnimationDIV.getAttribute("data-src");
					slideAnimationList[slideIndex] = bodymovin.loadAnimation({
						container: slideAnimationDIV, 
						path: slideAnimationPath, 
						renderer: 'svg/canvas/html', 
						loop: true, 
						autoplay: true,
						//name: "Slide animation-", // Name for future reference. Optional.
					});
				}
			}
		}
	});


	orientationMediaQuery.addListener(loadSliderImages);
    window.addEventListener("resize", loadSliderImages, false);
    loadSliderImages();

});