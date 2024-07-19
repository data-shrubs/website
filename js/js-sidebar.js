/**
 * File navigation.js.
 *
 * Handles sidebar menu creation and navigation.
 */
( function() {
	'use strict';

	//Sidebar Menu
	const sidebar = document.getElementById("sidebar");
	const sidebarNavMenu = document.getElementById("sidebarNavMenu");

	const entryContent = document.getElementsByClassName("entry-content")[0];
	const contentItems = entryContent.getElementsByTagName("h2");

	let menuItems = [];

	let selectedItemIndex = -1;
	let selectedMenuItem;
	let selectedContentItem;
	let isClickSelect = false;

	let selectedItemScrollPosition = 0;

	function initSidebar(){	
		
		if (sidebar) {

			if( contentItems.length > 0){

				let sidebarMenu = document.createElement("ul");
				sidebarMenu.classList.add("sidebar-menu");

				for(let count = 0; count < contentItems.length; count++){
					
					let headingElement = contentItems[count];
					let heading =  headingElement.innerHTML;
					let headingID = heading.replace(/\s+/g, '-').toLowerCase();
					headingID = headingID.replace(/\?/g, '');

					headingElement.setAttribute("id", headingID);
					

					let anchor = document.createElement("a");
					let anchorLink = "#" + headingID;
					anchor.setAttribute("href", anchorLink);
					anchor.classList.add("siderbar-menu-link");
					anchor.text = heading;
					anchor.addEventListener( 'click', sidebarToggleSelect, true );

					let listItem = document.createElement("li");
					listItem.appendChild(anchor);

					sidebarMenu.appendChild(listItem);
					
				}

				if (sidebarNavMenu) {
					sidebarNavMenu.appendChild(sidebarMenu);
					sidebar.style.display = "block";
					menuItems = sidebarNavMenu.querySelectorAll("li");


					const contentItemStyle = getComputedStyle(contentItems[0]);
					if(contentItemStyle && contentItemStyle.scrollMarginTop){
						selectedItemScrollPosition = contentItemStyle.scrollMarginTop;
						selectedItemScrollPosition = selectedItemScrollPosition.replace(/px/g, '');
						selectedItemScrollPosition = parseInt(selectedItemScrollPosition);
					}
					/*selectedItemScrollPosition = contentItemStyle.scrollMarginTop;
					selectedItemScrollPosition = selectedItemScrollPosition.replace(/px/g, '');
					selectedItemScrollPosition = parseInt(selectedItemScrollPosition);*/

					sidebarSelectItem(0);
				}
			}
		}
	}



	function sidebarSelectItem(menuItemIndex){ 
		selectedItemIndex = menuItemIndex;
		selectedMenuItem = menuItems[selectedItemIndex];


		if(selectedMenuItem){

			const currentSelectedItem = sidebarNavMenu.querySelectorAll('.sidebar-menu-selected')[0];
			if(currentSelectedItem){
				currentSelectedItem.classList.remove( 'sidebar-menu-selected' );
			}

			selectedMenuItem.classList.add( 'sidebar-menu-selected' );

			selectedContentItem = contentItems[selectedItemIndex];

		}
	}

	function sidebarToggleSelect(){
		const menuItem = this.parentNode;

		for ( let count = 0; count < menuItems.length; count++) {
			if(menuItem === menuItems[count]){
				selectedItemIndex = count;
			}
		}
		sidebarSelectItem(selectedItemIndex);

		isClickSelect = true;
	}
	
	window.addEventListener('load', (event) => {  
		if (sidebar) {
        	initSidebar(); 
        }
    });



	let documentScrollPos = 0;

    window.addEventListener("scroll",function(e){

    	let documentRect = document.body.getBoundingClientRect ();
    	let scrollDirection = "DOWN"

    	if (documentRect.top > documentScrollPos){
			scrollDirection = 'UP';
    	}
		else{
			scrollDirection = 'DOWN';
		}

		// saves the new position for iteration.
		documentScrollPos = documentRect.top;

		if(selectedContentItem) {
    		
	    	if(isClickSelect){
	    		let maxScroll = selectedItemScrollPosition + 3;
	    		let minScroll = selectedItemScrollPosition - 3;

	    		let selectedItemPos = selectedContentItem.offsetTop + documentRect.top;
	    		if( maxScroll < selectedItemPos < minScroll ){
	    			isClickSelect = false;
	    		}

	    	} else{
	    		let prevItem;
    			let nextItem;


	    		if(selectedItemIndex > 0){
		    		prevItem = contentItems[selectedItemIndex - 1];
		    	}
		    	if(selectedItemIndex < (contentItems.length - 1)){
		    		nextItem = contentItems[selectedItemIndex + 1];
		    	}

		    	if(scrollDirection == 'UP' && prevItem){
		    		let maxScrollUp = selectedItemScrollPosition + 200;
		    		let selectedItemPos = selectedContentItem.offsetTop + documentRect.top;

		    		if( selectedItemPos > maxScrollUp ){
		    			sidebarSelectItem((selectedItemIndex - 1));
		    		}

		    	} else if(scrollDirection == 'DOWN' && nextItem){
		    		let maxScrollDown = selectedItemScrollPosition + 100;
		    		let nextItemPos = nextItem.offsetTop + documentRect.top;

		    		if( nextItemPos < maxScrollDown ){
		    			sidebarSelectItem((selectedItemIndex + 1));
		    		}
		    	}
		    }    	
	    }
    });

}() );
