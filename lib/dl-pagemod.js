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
const sp = require("sdk/simple-prefs");
const prefs = sp.prefs;

const ui = require("ui");

let flowid = 11111;

let factory = exports.factory = function (cso) {
  cso = cso || extend({}, {flowid: flowid}); // fake
  console.log(cso);
  let P = pageMod.PageMod({
    include: cso.regex,
    //include: /.*uitest.html/,
    //contentScriptFile: data.url('packed-after.js'),
    //contentScriptOptions: cso,
    onAttach: function(worker) {
      ui.bar1(cso, flowid);
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


let configer = function () {
  return {question:  prefs.bannermessage,
      buttons: prefs.buttons,
      icon: prefs.icon,
      priority: prefs.priority,
      regex: prefs.regex,
      outlink: prefs.outlink,
      whichbar: "top-single"
    };
};


// setup and listen to all prefs
let c = configer();
console.log("60",c);
let F = factory(configer());

['bannermessage', 'priority', 'icon', 'regex', 'buttons'].forEach(
  function(t) {
    sp.on(t, function () {
      F.destroy();
      F = factory(configer());
    });
  }
);

let cur;

['showbanner'].forEach(
  function(t) {
    sp.on(t, function () {
      if (cur) {
        cur.widget.nb.removeAllNotifications();
      }
      cur = ui.bar1(configer(), flowid);
    });
  }
);

