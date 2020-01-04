"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(r){var o={};function n(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=r,n.c=o,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==_typeof(t)&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,r){r.r(t),new(function(){function e(){_classCallCheck(this,e),this.$nav=$("[data-nav]"),this.$hamburger=$("[data-hamburger]"),this._bindEvents()}return _createClass(e,[{key:"_bindEvents",value:function(){this.$hamburger.on("click",this._toggleNav.bind(this))}},{key:"_toggleNav",value:function(){this.$hamburger.toggleClass("is-active"),this.$nav.toggleClass("is-open")}}]),e}()),new(function(){function e(){_classCallCheck(this,e),this.$contactForm=$("[data-contact-form]"),this.$contactFormResponse=$("[data-contact-form-response]"),this._bindEvents()}return _createClass(e,[{key:"_bindEvents",value:function(){var t=this;this.$contactForm.on("submit",function(e){e.preventDefault(),t._submitForm()})}},{key:"_submitForm",value:function(){var o=this;this._clearErrors();var e=$.post({url:"/",dataType:"json",data:o.$contactForm.serialize()});e.done(function(e){e.success?(o.$contactFormResponse.html("<p class='c-form__response--success'>Your message has been sent!</p>").fadeIn(),o._resetForm(),$("html,body").animate({scrollTop:o.$contactFormResponse.offset().top})):(o.$contactFormResponse.html("<p class='c-form__response--error'>An error occurred. Please try again.</p>").fadeIn(),o._setErrors(e.errors),$("html,body").animate({scrollTop:o.$contactForm.offset().top-$("[data-header]").outerHeight()-30}))}),e.fail(function(e,t){var r=e.responseJSON;o.$contactFormResponse.html("<p>"+r.error+"</p>").fadeIn()})}},{key:"_clearErrors",value:function(){this.$contactForm.find("input, textarea").removeAttr("data-error"),this.$contactFormResponse.empty()}},{key:"_setErrors",value:function(e){e.firstName&&$("[name='message[firstName]']").attr("data-error",""),e.lastName&&$("[name='message[lastName]']").attr("data-error",""),e.fromName&&$("[name='fromName']").attr("data-error",""),e.fromEmail&&$("[name='fromEmail']").attr("data-error",""),e.message&&($("[name='message']").attr("data-error",""),$("[name='message[body]']").attr("data-error",""))}},{key:"_resetForm",value:function(){this.$contactForm.find("input, textarea").val("")}}]),e}()),console.log("app.js is loaded with webpack!")}]);