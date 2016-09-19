$(function() {
	var table = {
		init: function(submissions) {
			this.cacheDOM();
			this.setSubmissions(submissions);
		},
		cacheDOM: function() {
			this.$table = $("#leaderTable")
		},
		setSubmissions: function(submissions) {
			this.submissions = submissions;

			this.render();
		},
		render: function() {
			this.$table.find("tbody").remove();
			this.submissions.sort(function(a, b) {
				return parseInt(a.rank) - parseInt(b.rank);
			});
			console.log(this.submissions)
			for(var a = 0; a < this.submissions.length; a++) {
				var user = this.submissions[a];
				var score = Math.round((this.submissions[a].mu-(3*this.submissions[a].sigma))*100)/100;
				this.$table.append("<tbody id='user" + user.userID + "'><tr><th scope='row'>"+(a+1)+"</th><td><a href='user.php?userID="+user.userID+"'>"+user.username+"</a></td><td><a href='leaderboard.php?field=language&value="+user.language+"&heading="+user.language+"'>"+user.language+"</a></td><td>"+user.numSubmissions+"</td><td>"+user.numGames+"</td><td>"+score+"</td></tr></tbody>");
			}
		},
		getUserWithID: function(userID) {
			for(var a = 0; a < this.submissions.length; a++) if(this.submissions[a].userID == userID) return this.submissions[a];
			return getUser(userID);
		}
	};

	var field = getGET("field");
	var value = getGET("value");
	var heading = getGET("heading");
	var $heading = $("#leaderHeading");

	if(field != null && value != null && heading != null) {
		$heading.html(heading + " Rankings");

		var filters = {};
		filters["isRunning"] = 1;
		filters[field] = value;
		console.log(filters)
		table.init(getFilteredUsers(filters, "rank"));
	} else {
		$heading.html("Current Rankings");
		table.init(getActiveUsers());
	}
})