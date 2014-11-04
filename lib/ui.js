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

const notification = require("notification");

/*
http://cl.ly/image/0t2X2r1h431t
Is Firefox acting up?   Yes.   No, I just want chrome too.

*/

let phonehome = () => {};

const tabs = require("sdk/tabs");

// needs to handle vote and page open!
let metanotification = function (overrides) {
  let isBottom  = overrides.bottom == true;
  console.log("is bottom?", isBottom);
  let fn = (Q, flowid) => {
    // make buttons.
    let buttons= [];

    Q.buttons.split("|").map(function(x) {return x.trim();}).map(
      function (x) {
        console.log(x);
        let b = notification.nbButtons[x]({
          callback: function(nb, b) {
            console.log("clicked", x);
            tabs.open({
              url: Q.outlink,
              inBackground: true
            });
          }
        });
        buttons.push(b);
      }
    );
    //
    //buttons.push(notification.nbButtons["Yes"]({
    //}));
    //
    //buttons.push(notification.nbButtons["No, I just want Chrome too."]({
    //}));

    /*
    for (let ii=1; ii <= Q.outof; ii++) {
      let jj = ii;
      let b = notification.nbButtons[jj]({
        callback: function(nb, b) {
          console.log('nb rated', jj);
          let info = extend({},
            Q,
            {
              rating: jj,
              flowid: flowid,
              msg: 'flow-ui-closed'
            });
          phonehome(info);
          uiutils.openAfterPage(info);
        }
      });
      buttons.push(b);
    }

    let bad_msg = "no thanks";
    buttons.push(notification.nbButtons[bad_msg]({
      callback: function(nb, b) {
        console.log(bad_msg);
        let info = extend({},
          Q,
          {
            flowid: flowid,
            msg: 'flow-ui-refused'
          });
        phonehome(info);
      }
    }));
    */

    let nb = notification.notificationbox(null,isBottom); // bottom!
    // make banner
    let P = notification.banner({
      msg: Q.question,
      id: null,
      icon: Q.icon,
      priority: overrides.priority || Q.priority || 1,
      buttons: buttons,
      callback: function () {  // cb on close!
          let info = extend({},
            Q,
            {
              flowid: flowid,
              msg: 'flow-ui-closed'
            });
          phonehome(info);
      },
      nb: nb
    });

    return {
      widget: P,
      go: () => {} // empty!
    };
  };
  return fn;
};


let bar1 = exports.bar1 = function(Q, flowid) {
  return metanotification(Q)(Q, flowid);
};


