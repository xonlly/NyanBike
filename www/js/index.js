/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function clickSearch() {
  document.querySelector(".okstate").innerHTML += "ok";
  app.list();
}


function trySend(a) {
  app.send(a);
}

function tryrgb() {
  app.sendRGB(0, 255, 0);
}

function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}

var macAddr = "30:14:12:24:07:67";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.querySelector(".status").innerHTML = '<div class="alert alert-danger" role="alert">Wait device</div>';
        document.addEventListener('deviceready', this.onDeviceReady, false);
        var colorSelector = document.getElementById("colorSelector");
        colorSelector.addEventListener("change", function () {
          app.sendRGBViaHex(colorSelector.value);
        });

        var colorSelector2 = document.getElementById("colorSelector2");
        colorSelector2.addEventListener("change", function () {
          app.sendRGBViaHex(colorSelector2.value);
        });
    },

    sendRGBViaHex : function (hex) {
      // app.log("ok hex !!!"+hexToR(hex));
      app.sendRGB(
        hexToR(hex),
        hexToG(hex),
        hexToB(hex),
        function () { }
      );
    },

    strpad : function (v) {
      var x = "" + v;
      var pad = "000";
      return pad.substring(0, pad.length - x.length) + x;
    },

    log : function (msg) {
      document.querySelector(".log").innerHTML += msg+"<br />";
    },

    sendRGB: function (r, g, b, callback) {

      // document.querySelector(".log").innerHTML += app.strpad(r)+","+app.strpad(g)+","+app.strpad(b)+"<br >";
      bluetoothSerial.write(r+","+g+","+b+"\n", function () {
        callback(true);
      }, function () {

      });
    },

    send: function (a) {
      bluetoothSerial.write(a, function () {

      }, function () {

      });
    },

    listenBleutooth : function () {
      bluetoothSerial.read(function (data) {
          app.log("Received: " + data);
      }, function () {

      });
    },

    connect: function () {
      document.querySelector(".connected").innerHTML = '<div class="alert alert-info" role="alert">Connect ...</div>';
      bluetoothSerial.connect(macAddr, function () {
        document.querySelector(".connected").innerHTML = '<div class="alert alert-success" role="alert">Connnected</div>';
        app.listenBleutooth();
      }, function () {
        document.querySelector(".connected").innerHTML = '<div class="alert alert-danger" role="alert">Try again ...</div>';
        setTimeout(function () {
          app.connect();
        }, 2000);
      });
    },

    list: function () {


    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

      app.receivedEvent('deviceready');
      app.connect();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      document.querySelector(".status").innerHTML = '<div class="alert alert-success" role="alert">Ready !</div>';
      setTimeout(function () {
        document.querySelector(".status").remove();
      }, 1000);
    }
};

app.initialize();
