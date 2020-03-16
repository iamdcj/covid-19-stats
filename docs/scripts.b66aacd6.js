parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZqGU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.request=void 0;var e="https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100",r=fetch(e);exports.request=r;
},{}],"NVKF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.returnDate=void 0;var e=function(e){var r=new Date(e);if(!isNaN(r)){return r.toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric"})}};exports.returnDate=e;
},{}],"K94L":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.statisticsui=void 0;var t=require("./date-time"),n=function(t,n){var e=Math.round(100*t/n);return e<1?"&lt; 1%":"".concat(e,"%")},e=function(t){return t.sort(function(t,n){return t.confirmed>n.confirmed?-1:1}).map(function(t,n){return r(t,n)}).join("")};exports.statisticsui=e;var r=function(e,r){var c=e.country,o=e.lastUpdate,a=e.confirmed,i=e.deaths;return" <tr>\n        <td>".concat(c,'</td>\n        <td class="bg--orange-light text--center">').concat(a,'</td>\n        <td class="bg--red-light text--center text--strong">').concat(i,'</td>\n        <td class="text--center">\n          ').concat(i?n(i,a):"N/A","\n        </td>\n        <td>").concat((0,t.returnDate)(o),"</td>\n    </tr>\n  ")};
},{"./date-time":"NVKF"}],"mr91":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports._Loader=exports.searchInput=exports.totalCases=exports.container=void 0;var e=document.querySelector(".root");exports.container=e;var t=document.querySelector(".total");exports.totalCases=t;var r=document.getElementById("query");exports.searchInput=r;var o=document.querySelector(".Loader");exports._Loader=o;
},{}],"XtQe":[function(require,module,exports) {
"use strict";function t(t){return s(t)||e(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function s(t){if(Array.isArray(t)){for(var r=0,e=new Array(t.length);r<t.length;r++)e[r]=t[r];return e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setStatistics=exports.statistics=void 0;var i=[];exports.statistics=i;var n=function(r){exports.statistics=i=t(r)};exports.setStatistics=n;
},{}],"e1ol":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderStatistics=void 0;var r=require("./ui"),t=require("./DOM"),e=require("./data");function n(r){return a(r)||o(r)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}function a(r){if(Array.isArray(r)){for(var t=0,e=new Array(r.length);t<r.length;t++)e[t]=r[t];return e}}var s=function(i){var o=n(e.statistics).reduce(function(r,t){return r+t.confirmed},0);t.totalCases.innerText=o,t.container.innerHTML=(0,r.statisticsui)(i)};exports.renderStatistics=s;
},{"./ui":"K94L","./DOM":"mr91","./data":"XtQe"}],"ubXD":[function(require,module,exports) {
"use strict";var e=require("./DOM"),r=require("./data"),t=require("./rendering");function i(e){var i=r.statistics.filter(function(r){return r.country.toLowerCase().includes(e.target.value.toLowerCase())});(0,t.renderStatistics)(i)}e.searchInput.addEventListener("keyup",i,!0);
},{"./DOM":"mr91","./data":"XtQe","./rendering":"e1ol"}],"imtx":[function(require,module,exports) {
"use strict";var e=require("./modules/requests"),r=require("./modules/rendering"),t=require("./modules/data");require("./modules/events");var n=require("./modules/DOM");function o(e){return c(e)||u(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}e.request.then(function(e){return e.json()}).then(function(e){var r=e.features.map(function(e){var r=e.attributes;return{lastUpdate:r.Last_Update,confirmed:r.Confirmed,recovered:r.Recovered,deaths:r.Deaths,active:r.Active,country:r.Country_Region}}).filter(function(e){return e.confirmed}).reduce(function(e,r){var t=r.country,n=e.find(function(e){return e.country===t});return n&&(n.confirmed+=r.confirmed,n.deaths+=r.deaths,n.recovered+=r.recovered),n?o(e):[].concat(o(e),[r])},[]);return(0,t.setStatistics)(r),r}).then(function(e){return(0,r.renderStatistics)(e)}).catch(function(e){return console.error(e.message)}).finally(function(){n._Loader.classList.remove("is--active")});
},{"./modules/requests":"ZqGU","./modules/rendering":"e1ol","./modules/data":"XtQe","./modules/events":"ubXD","./modules/DOM":"mr91"}]},{},["imtx"], null)
//# sourceMappingURL=scripts.b66aacd6.js.map