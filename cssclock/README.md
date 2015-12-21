Simple CSS Clock Icon
=====================

An analog-style clock icon that uses CSS classes to display a given time.

Usage
-----

To use the clock, get the JS, CSS and image files in this github repository, embed them in your page as shown in the *cssclock.html* example, then use the following HTML syntax:

	<div class="clock">
		<div class="m m-30"></div>
		<div class="h h-10"></div>
	</div>
	
The *m* stands for minute, the *h* stands for hour. If you want the minute to be 45, then add the class *m-45* to the *m* element. If you wan the hour to be 2, add the class *h-2* to the *h* element.

I've only added CSS rules to allow for every 5 minutes, but you can easily edit the CSS to account for every minute.

Example
-------

Check out the example page at http://iheart.harmonicnw.com/tools/cssclock/.