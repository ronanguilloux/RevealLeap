/*
 * reveal.leap.js
 * Uses Reveal.js API
 * @author https://github.com/jefBinomed
 */

var RevealLeap = function() {
    "use strict";

    var threshold = 0.9;
    var frameRate = 0;
    var eventDispatched = false;

    // Support both the WebSocket and MozWebSocket objects
    window.WebSocket = window.WebSocket || window.MozWebSocket || function() {};

    var ws = new window.WebSocket("ws://localhost:6437/");
    ws.onopen = function(event) {
        console.log("ws opened!");
         var enableMessage = JSON.stringify({enableGestures: true});
         ws.send(enableMessage); // Enable gestures
    }

    ws.onmessage = function(event) {
        frameRate++;
        if (0 === frameRate % 5) {
            var obj = JSON.parse(event.data);
            if (obj.gestures && obj.gestures.length){
                var gesture = obj.gestures[0];
                if ("swipe" === gesture.type) {
                    if (!eventDispatched && gesture.direction[0] < -threshold) { // horizontal swipes only
                        eventDispatched = true;
                        Reveal.prev();
                    } else if (!eventDispatched && gesture.direction[0] > threshold) {
                        eventDispatched = true;
                        Reveal.next();
                    }

                    window.setTimeout(function() {
                        eventDispatched = false;
                    }, 300);
                }
            }
        }
    }

    ws.onclose = function(event) {
        ws = null;
    }

    ws.onerror = function(event) {
        console.log("ERROR: " + event);
    }
}();
