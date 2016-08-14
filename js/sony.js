document.addEventListener('DOMContentLoaded',function(){
	
	sonyWebApp.init();

});

var sonyWebApp = (function () {
	
	var	userVal,
		currPage = 1,
		sectionDynaScript,
		pages,
		resultsHtml,
		streamNextURL,
		streamPrevURL,
		responseDiv,
		once = false,
		elemNext,
		elemPrev,
		elemBtn,
		elemInput,
		elemNavs,
		streamSelfURL;

	var _initialize = function(){
		elemBtn = document.getElementById('s-btn'),
	    elemInput = document.getElementById('search-input'),
	    elemNavs = document.getElementById('navs'),
		elemNext = document.getElementById('next'),
		elemPrev = document.getElementById('prev'),
		sectionDynaScript = document.getElementById('dyna-scripts'),
		responseDiv = document.getElementById('response-container'),
		resultsHtml = document.getElementById('results');
 	
		elemBtn.addEventListener('click',function(){
			var baseUrl;
			userVal = elemInput.value;
			baseUrl = 'https://api.twitch.tv/kraken/search/streams?q='+userVal+'&callback=sonyWebApp.handleStream';
			_apiCall(baseUrl);
			
			if(!once){
				_fadeIn(responseDiv,1000);
				once = true;
			}	

		});

		elemNext.addEventListener('click',function(){
			var nextUrl;
			_hide(resultsHtml);
			currPage +=1;
			if(currPage == pages){
				_hide(elemNext);
				//return false;
				
			}else if(currPage > 1){
				_show(elemPrev);
			}
			
			nextUrl = streamNextURL + '&callback=sonyWebApp.handleStream';
			_apiCall(nextUrl);
		});

		elemPrev.addEventListener('click',function(){
			var prevUrl;
			_hide(resultsHtml);
			currPage -=1;
			if(currPage == 1){
				_hide(elemPrev);
				
			}else if(currPage < pages ){
				_show(elemNext);
			}
			
			prevUrl = streamPrevURL + '&callback=sonyWebApp.handleStream';
			_apiCall(prevUrl);
		});

		document.addEventListener('keydown',function(e){
			
			if(e.keyCode == 13){
				e.preventDefault();
				elemBtn.click();	
			}
		});

		_hide(elemPrev);
		
	};

	var _apiCall = function(url){
		
		if(url){
			var script = document.createElement('script');
			script.src = url;
			script.type = "text/javascript";
			sectionDynaScript.appendChild(script);
			
		}
	};

	var _fadeIn = function (el, duration, display) {
	    var s = el.style, step = 25/(duration || 300);
	    s.opacity = s.opacity || 0;
	    s.display = display || "block";
	    (function fade() { (s.opacity = parseFloat(s.opacity)+step) > 1 ? s.opacity = 1 : setTimeout(fade, 25); })();
	};

	var _hide = function(element){

		element.style.display = "none";
		element.style.opacity = 0;
	};

	var _show = function(element){

		element.style.display = "block";
		element.style.opacity = 1;
	};
	var _handleStream = function(data){
		
		    var channel,
		    	streamImg,
		    	streamDisplayName,
		    	streamlGameName,
		    	streamViewers,
		    	streamDescr,
		    	streamTotal,
		    	totalPages,
		    	wrapperHtml='',
		    	imgHtml,
		    	divInner,
		    	errorHtml,
		    	totalStreams = document.getElementById('total-streams'),
		    	pageIndex = document.getElementById('page-index'),
		    	res = data.streams;

		    if(res){
		    	streamTotal = data._total;
		    	streamNextURL = data._links.next;
		    	streamSelfURL = data._links.self;
		    	streamPrevURL = data._links.prev;
		    	
		    	totalPages = /limit=([^&]+)/.exec(streamNextURL)[1];
		    	pages = Math.ceil(streamTotal / totalPages);
		    	
		    	res.forEach(function(stream,index){

		    		imgHtml='',divInner= '';
			    	channel = stream.channel;
			    	
			    	streamImg = channel.logo;
			    	streamDisplayName = channel.display_name;
			    	streamlGameName = stream.game;
			    	streamViewers = stream.viewers;
			    	streamDescr = channel.status;
			    	
			    	imgHtml = "<img src="+streamImg+" alt='Stream Preview Image' tabindex='0'>";
			    	divInner += '<div class="col left"> ';
			    	divInner += '<h2> '+ streamDisplayName+'</h2>';
			    	divInner += '<p class="gname">'+streamlGameName+' - '+streamViewers+' viewers</p>';
			    	divInner += '<p class="">'+streamDescr+' </p>';
			    	divInner += '</div> ';
			    	wrapperHtml += '<div class="row stream-'+index+'"> ';
			    	wrapperHtml += imgHtml + divInner;
			    	wrapperHtml += '</div> ';

		    	});
		    	resultsHtml.innerHTML = wrapperHtml;
		    	totalStreams.innerHTML = "Total results: " + streamTotal;
		    	pageIndex.innerHTML = currPage+"/"+pages;
		    	sectionDynaScript.innerHTML = '';
		    	_show(elemNavs);
		    	_fadeIn(resultsHtml,1000);

		    }else{
		    	
		    	//_hide(elemNext);
		    	_hide(elemNavs);
		    	totalStreams.innerHTML = '';
		    	errorHtml = '<p class="error">'+data.message+', please enter a valid stream.</p>';
		    	resultsHtml.innerHTML = errorHtml;
		    }
		    
	};
	return {
		handleStream: _handleStream,
		init: _initialize
	};
})();



		