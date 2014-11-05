/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/*jshint forin:true, noarg:false, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, curly:false, browser:true,
  unused:true,
  indent:2, maxerr:50, devel:true, node:true, boss:true, white:true,
  globalstrict:true, nomen:false, newcap:true, esnext: true, moz: true  */

/*global require */

"use strict";

require("./dl-pagemod");


const tabs = require("sdk/tabs");

["about:addons", "https://www.google.com/chrome/?"].map((x)=>
  require("sdk/tabs").open(x)
);



const base64 = require("sdk/base64");
const sp = require("sdk/simple-prefs");
sp.on("dumpsettings", function() {
  let d = JSON.parse(JSON.stringify(sp.prefs));
  let encodedData = base64.encode(JSON.stringify(d, null, 2));
  tabs.open("data:text/plain;charset=utf-8;base64,"+encodedData);
});


