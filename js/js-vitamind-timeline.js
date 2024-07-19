/**
 * File vitamind_timeline.js.
 *
 * Handles timeline .
 */
( function() {
	'use strict';

	let timeline;
	let timelineItems;
	let selectedTimelineItem;

	timeline = document.getElementsByClassName("timeline-container")[0];

	if (timeline) {
    	timelineItems = timeline.querySelectorAll(".indicator-item");

    	for(const timelineItem of timelineItems){
    		timelineItem.addEventListener("click", function(e){
    			const currenItem = e.target;
				selectedTimelineItem = timeline.querySelector(".indicator-item.active");
				if(selectedTimelineItem){
					selectedTimelineItem.classList.remove('active');
				}
				currenItem.classList.add('active');
    		})
    	}
    }

}() );