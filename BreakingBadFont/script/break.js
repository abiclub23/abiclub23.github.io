//optimizing js code
// add.reomve hidden/show
 var ww; // for walter white
 var breakingBad = {

 	settings : {
 		
 		mutateInput: '',
 		elements: [],
 		singleMatch_inputIndex: [],
		lname_singleMatch_inputIndex: [],
 		lname_singleMatch_inputIndex: [],
 		doubleMatch_inputIndex: [],
 		doubleMatch_elemIndex: [],
   		singleMatch_elemIndex: [],
 		periodic: table
 	},

 	init: function(){

 		ww = this.settings;
 		$submitButton= $('#submit');
 		$result = $('#result'); // div id to print result
 		$first_name = $("#fname"); // first name
 		$last_name = $("#lname"); // last name
 		$alert = $('.alert-danger.custom');
 		$warning = $('.bg-success');
 		breakingBad.checkifIE();
 		breakingBad.bindUIActions();
 		
 		
 	},

 	bindUIActions: function() {
	    
	    $submitButton.on("click", function() {
	      
	      $result.empty();
	      breakingBad.processInput.call($first_name);
	      breakingBad.processInput.call($last_name);
	      $('[data-toggle="tooltip"]').tooltip();
	    });

	    $('[data-toggle="popover"]').popover(); // bootstrap popover init


		$.each(ww.periodic, function(i, symbol) { ww.elements.push(ww.periodic[i].symbol.toLowerCase()); }); // fetching periodic table data
		
		$(document).keydown(function(e) { if (e.keyCode == 13) { $submitButton.click(); } }); //checking enter key press
  	},

  	/* function to check IE - taken from css tricks */
  	checkifIE : function() {
  		var isMSIE = /*@cc_on!@*/1;
    	if (!isMSIE) {
            // do IE-specific things
            $("#ie-msg").removeClass("hidden");
        }
  	},

  	resetAll: function(){

  		ww.singleMatch_inputIndex.length = 0;
  		ww.doubleMatch_inputIndex.length = 0;
        ww.singleMatch_elemIndex.length = 0;
        ww.doubleMatch_elemIndex.length = 0;
        
        

  	},

  	processInput: function() {
  		
  		breakingBad.resetAll(); // resetting all arrays
  		var $curr = $(this);
  		var userInputName, userInputName_len;
  		var elem_len = ww.elements.length;
  		var regexp1 = new RegExp("[^a-z]");
  		if($curr.val().length == 0) { return;} //do nothing when input is empty
  		
  		userInputName = $curr.val().toLowerCase();
        userInputName = userInputName.replace(/\s+/g, '');
        userInputName_len = userInputName.length;
        
        if (regexp1.test(userInputName) ) {
            //alert("Only alphabets from a-z are allowed");
            $alert.removeClass('hidden').addClass('show');
            $warning.addClass('hidden').removeClass('show');
            return false;
        } else {
            $alert.addClass('hidden').removeClass('show');
        }
        outerloop: 
        for (var j = 0; j < userInputName_len; j++) {
        	
            for (var k = 0; k < elem_len; k++) {
                // Single Char Compare
               if(ww.doubleMatch_inputIndex == 0 && ww.singleMatch_inputIndex.length == 0){ // if a match is found dont search anymore
	                if (userInputName[j] == ww.elements[k]) {
	                    
	                    ww.singleMatch_inputIndex.push(j);
	                    ww.singleMatch_elemIndex.push(k); 

	                    
	                }
                }
               

                // Double Char Compare
                if (typeof(userInputName[j + 1]) !== "undefined") {
                    ww.mutateInput = userInputName[j] + userInputName[j + 1];
                   
                    if (ww.mutateInput == ww.elements[k]) {
                        
                        ww.doubleMatch_inputIndex.push(j);
                        ww.doubleMatch_elemIndex.push(k);
                        
                        break outerloop; // breaking loop when I find 1st match.
                    }

                }

            }
        }// end for
        
        if (ww.doubleMatch_elemIndex) { // if mutate text has a match
            ww.single_match_index = "";
            
            breakingBad.generateName(userInputName,ww.single_match_index, ww.doubleMatch_inputIndex,  ww.doubleMatch_elemIndex);
            
           
        } else { //only single char match
        	ww.doubleMatch_inputIndex = "";
        	
            breakingBad.generateName(userInputName, ww.single_match_index, ww.doubleMatch_inputIndex ,  ww.singleMatch_elemIndex);
            
            
        }

  	},

  	generateName: function(userName,singleIndex,doubleIndex,elementNameIndex){

  		var uname = userName;
  		
  		var uname_len = userName.length;
  		var ename = elementNameIndex;
  		
	    var ename_len = ename.length;
	    var resultHtml = "";
	    var name, atomic_num, molar;
	    var nochem = true;
	    

	    if (ename.length > 0) { // using ename[0] to display the 1st match , when there are multiple matches.
	        name = ww.periodic[ename[0]].name; console.log ( "name" , name);
	        atomic_num = ww.periodic[ename[0]].number; console.log ( "atomic_num" , atomic_num);
	        molar = ww.periodic[ename[0]].molar.toFixed(2); console.log ( "molar" , molar);
    	}
    	for (var j = 0; j < uname_len; j++) {
	        if (j == singleIndex[0]) {
	            nochem = false;
	            resultHtml += '<span class="font" data-toggle="tooltip" data-placement="top" data-original-title= "YO ,its ' + name + ' " >' + uname[j].toUpperCase() + '</span>';

	        } else if (j == doubleIndex[0]) {
	            nochem = false;
	            resultHtml += '<span class="font second" data-toggle="tooltip" data-placement="top" data-original-title="YO ,its ' + name + '  ">' + uname[j].toUpperCase() + '' + uname[j + 1] + '</span>';
	            console
	        } else {
	            if (doubleIndex) {
	                if (j == (doubleIndex[0] + 1)) {
	                    //console.log("im being skipped");
	                } else {
	                    resultHtml += '<span >' + uname[j] + '</span>';
	                }


	            } else {
	                resultHtml += '<span >' + uname[j] + '</span>';
	            }
	        }
    	}

    	if (ename.length > 0) {
	        resultHtml += '<span class="atomic">' + atomic_num + '</span> <span class="molar">' + molar + '</span>';
	    }
	    

	   

	    if (nochem && !($('.wrap').length)) {
	        $warning.removeClass('hidden').addClass('show');
	        $alert.addClass('hidden').removeClass('show');
	        return false;
	    } else {
	        $warning.addClass('hidden').removeClass('show');

	    }

	     $result.append('<span class="wrap"> ' + resultHtml + ' </span>');

	     // calculating position for atomic number placement
	    var leftPos1 = $(".font").position().left;
	    var topPos1 = $(".font:last").height();
	    var leftPos2 = $(".font:last").position().left;
	    var topPos2 = $(".font:last").position().top + $(".font:last").height() - 4;

	    leftPos1 = Math.round(leftPos1);
	    leftPos2 = Math.round(leftPos2);
	    $(".atomic").css({
	        'left': leftPos1,
	        'top': topPos1
	    });

	    $(".atomic:last").css({
	        'left': leftPos2,
	        'top': topPos2
	    });
	    $(".molar").css('left', leftPos1);
	    $(".molar:last").css('left', leftPos2);

	    if ($('.wrap:last .font').length == 0) {
	        $('.wrap:last').empty();
	    }



  	}// end GenerateName


 };

 $(document).ready(function(){
 	breakingBad.init();
   
 });

  
 

