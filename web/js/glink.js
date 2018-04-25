
//Used to dynamically generate search links of a FaceBook user's interests
var amazon_link = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=';
var ebay_link = 'https://www.ebay.com/sch/';

//Enable or disable output to console.log()
const DEBUG_MODE =  1;

//Used to determine whether or the loading overlay should be displayed
var hasWebStorage = typeof(Storage) !== "undefined";

/**
 ** Extends animateCss to jQuery.
 ** Allows for easily applying animations to elements
 ** and can specify a function to execute when animation completes
 **/
$.fn.extend({
  animateCss: function(animationName, callback, duration) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));
	
	if(duration){
		this.css('-webkit-animation-duration', duration+'s')
			.css('animation-duration', duration+'s');
	}
	
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

/**
 ** Log user in to Facebook and begin reading data in
 **/
function appLogin(){
	FB.login(function(response) {

		if(response.status === 'connected'){
			if(DEBUG_MODE) console.log('Logged in and authenticated');
			postLoginSetup();
		}
		else {
			if(DEBUG_MODE) console.log('Not authenticated');
			removeOverlay();
		}
	}, {scope:'email,user_birthday,user_likes,user_friends', return_scopes:true});
	   /* Above are the permissions to request from the user logging in
		  Only pops up with a FaceBook login dialog if they haven't given access before
		  or there are new permissions that they haven't granted access to
	   */
}

function postLoginSetup(){
	removeOverlay();
  /* Setting up the HTML/sections for each block of output after a successful login
	 introBlock for displaying announcements/instructions and contains an input field (textbox)
	 for searching/filtering friends
  */
	$('#introBlock').addClass('hidden');
	$('#outputBlock').removeClass('hidden')
					 .empty()
					 .append('<br>Click on a friend to see their interests<br><br>')
	$('#friendSearch').removeClass('hidden');
	$('#searchTools').removeClass('hidden');
	$('#friendBlock').removeClass('hidden');
	$('#loginPanel').addClass('hidden');
	$('#logoutPanel').removeClass('hidden');
	
	$('#sortName').on('click', toggleSortName);
	$('#sortBirthday').on('click', toggleSortBirthday);
	$('#filterVerified').on('click', toggleFilterVerified);
	
	//Setting the top bar to display the the logged in user's profile picture and name
	FB.api('/me', {fields: 'id,name,birthday'}, function(response) {
		$('#profilePic').attr('src', 'http://graph.facebook.com/' + response.id + '/picture?type=normal');
		$('#nameBadge').text(response.name);
	});
	
	//Grab and list the user's friends in the #friendBlock HTML element
	loadCalendar();
	listFriends();


	//Dynamically filter friends as you type by attaching an event listener to the #friendSearch input field
	$('#friendSearch').on("keyup", function() {
		if(DEBUG_MODE) console.log('keypress handler triggered');
		var inputText = $('#friendSearch').val();

		$(".fb-user").each(function(){
			var found = strCmp($(this).attr("data-block-id"),inputText);
			if(found){
				if(DEBUG_MODE) console.log('found');
				$(this).removeClass('hidden');
			}
			else {
				if(DEBUG_MODE) console.log('not found');
				$(this).addClass('hidden');
			}
		});
	});
}

/**
 ** Fills up the friendBlock with collapsible panels of the user's friends
 **/
function listFriends() {
	FB.api('/me/friends', {fields: 'id,name,birthday'}, 
		function (response) {
			if(DEBUG_MODE) console.log(response);
			
			$('#friendBlock').empty();
			var friend;
			var friends = response.data.sort(sortFriends);
			
			for(friend in friends){
				var user_id = friends[friend].id;
				var name = friends[friend].name;
				var birthday = friends[friend].birthday;
				
				//Wrapping each user in a unique div to make the search filtering easier
				$('#friendBlock').append('<div class = "fb-user" data-block-id = "' + name + '"></div>');
				
				//jQuery unique to the current friend's block 
				var query = "[data-block-id = '" + name + "']";
				$(query).append(''
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-interests">'
								 + '<div class="friend-panel fluid-panel" id="' + user_id + '-panel">'
								 + '<span><img class="friend-pic" src="http://graph.facebook.com/' + user_id + '/picture?type=normal"></img>'
								 + '<span class="friend-name">' + name + '</span></span><span class="friend-birthday">' + birthday + '</span></div></a>'
								 
								 + '<div class="collapse" id="' + user_id + '-interests">'
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-musicList">'
								 + '<div class="interest-panel">Music</div></a>'
								 + '<div class="collapse" id="' + user_id + '-musicList"></div>'
								 
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-moviesList">'
								 + '<div class="interest-panel">Movies</div></a>'
								 + '<div class="collapse" id="' + user_id + '-moviesList"></div>'
								 
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-televisionList">'
								 + '<div class="interest-panel">Television</div></a>'
								 + '<div class="collapse" id="' + user_id + '-televisionList"></div></div>'
								);

				$('#' + user_id + '-panel').on('click', {id: user_id}, listInterests);
			}
		}
	);
}

/**
 ** Logs user out of Facebook and removes associated data
 **/
function appLogout(response){
	$('#introBlock').removeClass('hidden');
	$('#outputBlock').addClass('hidden')
					 .empty();
	$('#friendSearch').addClass('hidden');
	$('#searchTools').addClass('hidden');
	$('#friendBlock').addClass('hidden');
	$('#logoutPanel').addClass('hidden');
	$('#loginPanel').removeClass('hidden');
	$('#nameBadge').text('');
	$('#profilePic').attr('src', '');
}

/**
 ** Determines whether string b is a substring of a
 ** @param {string} a The string to inspect
 ** @param {string} b The substring for which to search
 ** @return {bool} Whether the substring b was found in a
 **/
function strCmp(a, b) {
	return (a.toLowerCase().indexOf(b.toLowerCase()) >= 0); 
}

/**
 ** Toggles friends-sorting by name, ascending or descending
 **/
function toggleSortName() {
	if ($('#friendBlock').attr('data-sort') != 'name-ascend')
		$('#friendBlock').attr('data-sort', 'name-ascend');
	else
		$('#friendBlock').attr('data-sort', 'name-descend');
	
	listFriends();
}

/**
 ** Toggles friends-sorting by birthday, ascending or descending
 **/
function toggleSortBirthday() {
	if ($('#friendBlock').attr('data-sort') != 'bday-ascend')
		$('#friendBlock').attr('data-sort', 'bday-ascend');
	else
		$('#friendBlock').attr('data-sort', 'bday-descend');
	
	listFriends();
}

/**
 ** Compares two friend objects by name or by birthday
 ** @param {object} a First user to compare
 ** @param {object} b Second user to compare
 ** @returns {int} The result of comparison (i.e. 1, 0, or -1)
 **/
function sortFriends(a, b) {
	var sortby = $('#friendBlock').attr('data-sort');
	
	if (sortby == 'name-ascend') return a.name.localeCompare(b.name);
	if (sortby == 'name-descend') return b.name.localeCompare(a.name);
	if (sortby == 'bday-ascend') return (Date.parse(b.birthday) <= Date.parse(a.birthday) ? 1 : -1);
	if (sortby == 'bday-descend') return (Date.parse(a.birthday) <= Date.parse(b.birthday) ? 1 : -1);
}

/**
 ** Toggles filtering of friends' interests by page verification
 **/
function toggleFilterVerified() {
	if ($('#friendBlock').attr('data-filter') != 'verified') {
		$('#friendBlock').attr('data-filter', 'verified');
		$('#filterVerified').text('Show Unverified');
	}
	
	else {
		$('#friendBlock').attr('data-filter', 'all');
		$('#filterVerified').text('Hide Unverified');
	}
	
	listFriends();
}

/**
 ** Updates all user interests (wrapper for updateInterest)
 ** @param {object} event JQuery event handler data object
 **/
function listInterests(event) {
	updateInterest(event.data.id, 'music');
	updateInterest(event.data.id, 'movies');
	updateInterest(event.data.id, 'television');
}


/** 
 ** Customizable function to get and update a user's interests from the appropriate endpoint
 ** @param {int} user_id Graph API ID of user node
 ** @param {string} interest Interest category to list
 **/
function updateInterest(user_id, interest) {
	var endpoint = '/' + user_id + '/' + interest + '?fields=name,verification_status,website';
	if(DEBUG_MODE) console.log(endpoint);
	
	var target;
	if(interest == 'music'){ target = ('' + user_id + '-musicList'); }
	else if(interest == 'television'){ target = ('' + user_id + '-televisionList'); }
	else if(interest == 'movies'){ target = ('' + user_id + '-moviesList'); }

	FB.api(endpoint, function(response){
		if(response && !response.error){
			listInterest(response, target);
		}
	});
}


/**
 ** Iterates over data from a Graph API response, generates search urls, and
 ** places links to each in the target element
 ** @param {object} response Graph API edge, containing an array of user interests
 ** @param {string} target ID of element to store list of interests
 **/
function listInterest(response, target) {
	var query = '#' + target;
	
	if(DEBUG_MODE){
		console.log(target);
		console.log(query);
		console.log(response);
	}
	
	var filter = $('#friendBlock').attr('data-filter') == 'verified';
	
	$(query).empty();
	for(item in response.data) {
		// Filter verification
		var verif = response.data[item].verification_status;
		if (filter && verif == 'not_verified') continue;
		
		var name = response.data[item].name;
		var amazon_sname = name.replace(/ /g, '+');
		var ebay_sname = name.replace(/ /g, '%20');
		
		var website = response.data[item].website;
		
		$(query).append('<div class="interest-item-panel fluid-panel">'
						+ '<a class="pageLink"></a>'
						+ '<span>'
						+ '<a class="amazonLink" target="_blank" href="">Amazon</a> / '
						+ '<a class="ebayLink" target="_blank" href="">Ebay</a>'
						+ '</span>'
						+ '</div>');
						
		$('.pageLink').html(name);
		if (website != undefined) {
			website = website.replace('http://', '');
			website = website.replace(/[ ,].*/g, '');
			website = 'http://' + website;
			
			$('.pageLink').attr('href', website);
			$('.pageLink').attr('target', '_blank');
		}
		$('.pageLink').removeClass('pageLink');
		
		$('.amazonLink').attr('href', amazon_link + amazon_sname);
		$('.amazonLink').removeClass('amazonLink');
		
		$('.ebayLink').attr('href', ebay_link + ebay_sname);
		$('.ebayLink').removeClass('ebayLink');
	}
}

/**
 ** Toggles visibility of non-dynamic element
 ** @param {int} target ID of element
 **/
function toggleVisibility(target){
	query = '#' + target;
	var updateCalendar = false;
	var btnQuery = '#calendarToggle';
	if(query == '#myCalendar'){updateCalendar = true;}
	
	
	if($(query).hasClass('hidden')){
		$(query).removeClass('hidden');
		if(updateCalendar){
			$(btnQuery).text('Hide Calendar');
		}
	}
	else {
		$(query).animateCss('fadeOut', function(){
			$(query).addClass('hidden');
		},.3);
		if(updateCalendar){
			$(btnQuery).text('Show Calendar');
		}
	}
}

/** 
 ** Used with zabuto calendar
 ** Checks if an event exists on the date that
 ** a user clicks and shows an alert with the
 **	date and description of the event.
 **/
function eventAlert(eventId){
	var day = $("#" + eventId);
	var date = $("#" + eventId).data("date");
	var hasEvent = day.data("hasEvent");
	if(hasEvent){
		var newDate = new Date(date);
		console.log(day);
		bootbox.alert({message:"<center><h1>" + newDate.toDateString() + "<br><br>" + day[0].title + "</h1></center>", backdrop:true});
	}
}

/**
 ** Loads zabuto_calendar with events stored in a local .js file 
 ** (in this case holiday.js is imported before glink.js in index.html)
 **/
function loadCalendar(){
	$('#outputBlock').append('<br><a id = "calendarToggle" class = "btn btn-primary" href = "#" onclick = "toggleVisibility(\'myCalendar\')">Show Calendar</a><br><br>');
	$('#outputBlock').append('<div class = "hidden animated fadeIn" id = "myCalendar" style = "padding: 5% 7% 5% 7%;"><div id = "usr_calendar"></div></div>');


	$('#usr_calendar').ready(function(){$('#usr_calendar').zabuto_calendar(
		{
			language: "en", 
			show_previous:true, 
			show_next:true,
			data: holidayEvents,
			today:true,
			modal: true,
			action: function(){ eventAlert(this.id); },
			nav_icon:{prev:'<', next:'>'}
		}
	)});
}

/**
 ** Fades out the loading overlay and removes it when animation finishes
 **/
function removeOverlay(){
	if($('.overlay').length){
		$('.overlay').animateCss('fadeOut', function(){
			$('.overlay').remove();
			if(DEBUG_MODE) console.log('Overlay removed');
		});
		setTimeout(function(){$('#giftBox').animateCss('tada')},1500);
	} else {
		if(DEBUG_MODE) console.log('Overlay already removed');
	}
}

/**
 ** Display loading overlay
 **/
function showOverlay(){
	$("body").append(''
	 + '<div class="overlay">'
	 + '<h1 class="text-center animated fadeInDown" id="overlayHeader">Gift<span style="color:#3b5998">Link</span>'
	 + '<div class="loader text-center"></div></h1></div>');
}
