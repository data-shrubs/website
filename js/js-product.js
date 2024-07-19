/**
 * File product.js.
 *
 * Handles pagination for products archive page.
 */
( function() {

	'use strict';

	let productsGrid;
	let filterMenu;
	let productsCards = [];
	let filterMenuItems = [];
	let filterMenuToggle;
	let productView;

	let paginator = {
        page: 1,
        nextPage: 1,
        max_num_pages: 1,
    }

    let termId;

    let waypoint;

	function filterMenuHandler(e){
		let targetElement = event.target ;
		if ( targetElement.tagName === 'BUTTON') {
			let filterMenuItem = targetElement;		
			filterList(filterMenuItem);
		}
	}

	function filterList(filterItem){
		let selectedItems = filterMenu.getElementsByClassName('selected-filter');
		if( selectedItems.length > 0  && selectedItems[0] != filterItem){
			selectedItems[0].classList.remove('selected-filter');
			filterItem.classList.add("selected-filter");
			
			const filterTerm = filterItem.getAttribute("data-term");
			termId = filterItem.getAttribute("data-term");

			$('#productsGrid').find( 'div' ).remove();

			paginator.page = 1;
			paginator.nextPage = 1;
			$('.spinner').show();
			getProducts(1, termId);
    	}
   }

	window.addEventListener('load', (event) => {

	   	paginator.max_num_pages = product_obj.max_num_pages;
		if(paginator.max_num_pages > paginator.nextPage ){
			paginator.nextPage++;
		}

		initWayPoint();  
   		
		productView = document.getElementById("productView");
		productsGrid = document.getElementById("productsGrid");
		filterMenu = document.getElementById("filterMenu");
		filterMenuToggle = document.getElementById("filterMenuToggle");
		
		if(filterMenu){
			filterMenu.classList.remove	('invisible');
			filterMenu.addEventListener('click', filterMenuHandler, true);
			filterMenuItems = filterMenu.querySelectorAll('button');	
		}

		if(filterMenuToggle && productView){
			filterMenuToggle.addEventListener("click", function(e){
				productView.classList.toggle( 'toggled' );
			});
		}
    });

    function getProducts(page, termId){
		$.post(
			product_obj.url, 
			{
       			action: 'products_pagination',
       			query_vars: product_obj.query_vars,
				page: page,
				termId: termId,
   			}, 
   			function (data) {
   				$('.spinner').hide();

   				data = JSON.parse(data);
   				let html = data.products_html;
   				$('#productsGrid').append( html );
   				paginator.page = page;

   				paginator.max_num_pages = data.max_num_pages;
				if(paginator.max_num_pages > paginator.nextPage ){
					paginator.nextPage++;
				}
   				if(waypoint){
                    waypoint.destroy();
                }
    			if(paginator.nextPage > paginator.page){	
                	initWayPoint();
            	}
   			}
		)
		.fail(function() {
			console.log( "Error: getProducts: Unable to get products" );
		})
		.always(function() {
			//console.log( "finished" );
		});
	}

	function initWayPoint() {
    	waypoint = new Waypoint({
        	element: document.getElementById('productsGrid'),
            handler: function(direction) {
                if(paginator.nextPage > paginator.page){
                    $('.spinner').show();
                    getProducts(paginator.nextPage, termId);
                }
            },
            offset: 'bottom-in-view',
            onBeforePageLoad: function () {
                $('.spinner').show();
            },
            onAfterPageLoad: function () {
            	$('.spinner').hide();
            }
    	});
	}

   function updateFilterMenuUI() {
		if (window.matchMedia("(min-width: 768px)").matches){
			if(productView){
				productView.classList.remove( 'toggled' );
			}
		}
	}
	window.addEventListener("resize", updateFilterMenuUI, false);

}());
