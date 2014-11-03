/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/*jshint forin:true, noarg:false, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, curly:false, browser:true,
  unused:true,
  indent:2, maxerr:50, devel:true, node:true, boss:true, white:true,
  globalstrict:true, nomen:false, newcap:true, esnext: true, moz: true  */

/*global */

"use strict";

const { extend } = require("sdk/util/object");
const pageMod = require("sdk/page-mod");

const ui = require("ui");

let flowid = 11111;

let factory = exports.factory = function (cso) {
  cso = cso || extend({},Q, {flowid: flowid}); // fake
  let P = pageMod.PageMod({
    include: "https://www.google.com/chrome/?",
    //include: /.*uitest.html/,
    //contentScriptFile: data.url('packed-after.js'),
    //contentScriptOptions: cso,
    onAttach: function(worker) {
      ui.bar1(Q, flowid);
      worker.port.on("link", function (q) {
        //console.log("afterPage link clicked", q);
        //q.msg = "afterPage-link";
        //phonehome.phonehome(q);
      });
    },
    onDetach: function(worker) {
      P.destroy();
    }
  });
  return P;
};


let Q = {question:  "Is Firefox acting up?",
   // icon:  firefox icon?
   priority:  4
};

factory(Q);

