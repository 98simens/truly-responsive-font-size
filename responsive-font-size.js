function responsiveFontSize(selector, minFont, maxFont){
		var elems = [];
		document.querySelectorAll(selector).forEach(function(elem){
		//Get value for how much width changes when font size changes
	    elem.style.display = "inline";
	    elem.style.fontSize = "1px";
	    var smaller_width = elem.offsetWidth;
	    elem.style.fontSize = "2px"
	    var bigger_width = elem.offsetWidth;
	    var pixel_change = bigger_width - smaller_width;
	  
	    //Set element display value
	    elem.style.display = "inline-block";
		
		//Add element data to object, add object to array
		elems.push({
			"pixel-change": pixel_change,
			"elem": elem,
			"parent": elem.parentElement
		});
		
		//Set initial size
        var container_width = parseInt(window.getComputedStyle(elem.parentElement, null).getPropertyValue('width'));
        var fontSize = container_width / pixel_change;
		if(fontSize <= minFont){
			elem.style.fontSize = minFont.toString() + "px";
		}else if(fontSize >= maxFont){
			elem.style.fontSize = maxFont.toString() + "px";
		}else{
			elem.style.fontSize = fontSize.toString() + "px";
		}
        
		});
		
		window.addEventListener(
		'resize',
		function(event){
			elems.forEach(function(elem){
				//Set correct size
				var container_width = parseInt(window.getComputedStyle(elem["parent"], null).getPropertyValue('width'));
				var fontSize = container_width / elem["pixel-change"];
				if(fontSize <= minFont){
					elem["elem"].style.fontSize = minFont.toString() + "px";
				}else if(fontSize >= maxFont){
					elem["elem"].style.fontSize = maxFont.toString() + "px";
				}else{
					elem["elem"].style.fontSize = fontSize.toString() + "px";
				}
			});
		});
	}