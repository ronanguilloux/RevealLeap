Reveal.js Leap motion Controller
================================

Author
------

* [Jean-François GARREAU](https://github.com/jefBinomed)

Usage
-----

edit the Reveal's `index.html` file & add a call to the provided `reveal.leap.js` file

``` html
		<script src="lib/js/head.min.js"></script>
		<script src="js/reveal.min.js"></script>
		<script src="js/reveal.leap.js"></script>
```

And then... swipe! swipe! swipe!


See also
--------

http://garage-interactive.com/leaprevealjs/ - Leap rvl.io (RevealJS) Controller as a bookmarklet:

``` js
javascript:(function(){if(typeof Leap=='undefined'){var jsCode=document.createElement('script');jsCode.setAttribute('src','http://garage-interactive.com/leaprevealjs/leap.min.js');jsCode.onload=runScript;document.body.appendChild(jsCode);}else{runScript();}function runScript(){var fingers={};var spheres={};var _html=document.body;var now;var lastSwipe=0;Leap.loop({enableGestures:true},function(frame){now=new Date().getTime();if(lastSwipe===0){lastSwipe=now;}if(now-lastSwipe>500){var gestures=frame.data.gestures;for(var i=0;i<gestures.length;i++){var gesture=gestures[i];if(gesture.type=='swipe'){var swipe=gesture;if(swipe.speed>1000&&Math.abs(swipe.direction[0])>Math.abs(swipe.direction[1])){if(swipe.direction[0]>0){console.log('left');Reveal.navigateLeft();}else if(swipe.direction[0]<0){console.log('right');Reveal.navigateRight();}lastSwipe=now;break;}else{if(swipe.direction[1]<0){console.log('up');Reveal.navigateUp();}else if(swipe.direction[1]>0){console.log('down');Reveal.navigateDown();}lastSwipe=now;break;}}}}});}})();
```
