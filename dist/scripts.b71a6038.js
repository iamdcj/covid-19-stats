// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/requests.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;
var endpoint = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats";
var request = fetch(endpoint, {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    "x-rapidapi-key": "6355586673mshe6fe75562f6751dp1f288cjsn9deb12384837"
  }
});
exports.request = request;
},{}],"modules/date-time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnDate = void 0;

var returnDate = function returnDate(date) {
  var _Date = new Date(date);

  if (isNaN(_Date)) return;
  var settings = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return _Date.toLocaleDateString("en-us", settings);
};

exports.returnDate = returnDate;
},{}],"modules/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statisticsui = void 0;

var _dateTime = require("./date-time");

var statisticsui = function statisticsui(stats) {
  return "\n  <table>\n  <tr>\n    <th>#</th>\n    <th>\uD83C\uDF0D Country</th>\n    <th class=\"bg--orange text--center\">\u2714 Confirmed</th>\n    <th class=\"bg--red text--center\">\u2620\uFE0FDeaths</th>\n    <th class=\"text--center\">Mortality Rate</th>\n    <th>\uD83D\uDCC5 Last Updated</th>\n  </tr>\n    ".concat(stats.sort(function (a, b) {
    return a.confirmed > b.confirmed ? -1 : 1;
  }).map(function (statistic, index) {
    return statisticUI(statistic, index);
  }).join(""), "\n  </table>\n");
};

exports.statisticsui = statisticsui;

var statisticUI = function statisticUI(_ref, index) {
  var country = _ref.country,
      lastUpdate = _ref.lastUpdate,
      confirmed = _ref.confirmed,
      deaths = _ref.deaths;
  return " <tr>\n        <td>".concat(index + 1, "</td>\n        <td>").concat(country, "</td>\n        <td class=\"bg--orange-light text--center\">").concat(confirmed, "</td>\n        <td class=\"bg--red-light text--center text--strong\">").concat(deaths, "</td>\n        <td class=\"text--center\">").concat(deaths ? "".concat(Math.round(deaths * 100 / confirmed), "%") : "N/A", "</td>\n        <td>").concat((0, _dateTime.returnDate)(lastUpdate), "</td>\n    </tr>\n  ");
};
},{"./date-time":"modules/date-time.js"}],"modules/DOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchInput = exports.totalCases = exports.container = void 0;
var container = document.querySelector(".root");
exports.container = container;
var totalCases = document.querySelector(".total");
exports.totalCases = totalCases;
var searchInput = document.getElementById("query");
exports.searchInput = searchInput;
},{}],"modules/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStatistics = exports.statistics = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var statistics = [];
exports.statistics = statistics;

var setStatistics = function setStatistics(data) {
  exports.statistics = statistics = _toConsumableArray(data);
};

exports.setStatistics = setStatistics;
},{}],"modules/rendering.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStatistics = void 0;

var _ui = require("./ui");

var _DOM = require("./DOM");

var _data = require("./data");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var renderStatistics = function renderStatistics(stats) {
  var total = _toConsumableArray(_data.statistics).reduce(function (total, stat) {
    return total + stat.confirmed;
  }, 0);

  _DOM.totalCases.innerText = total;
  _DOM.container.innerHTML = (0, _ui.statisticsui)(stats);
};

exports.renderStatistics = renderStatistics;
},{"./ui":"modules/ui.js","./DOM":"modules/DOM.js","./data":"modules/data.js"}],"modules/events.js":[function(require,module,exports) {
"use strict";

var _DOM = require("./DOM");

var _data = require("./data");

var _rendering = require("./rendering");

function handleSearch(event) {
  var results = _data.statistics.filter(function (_ref) {
    var country = _ref.country;
    return country.toLowerCase().includes(event.target.value.toLowerCase());
  });

  (0, _rendering.renderStatistics)(results);
}

if (!_DOM.searchInput) {
  return;
}

_DOM.searchInput.addEventListener("keyup", handleSearch, true);
},{"./DOM":"modules/DOM.js","./data":"modules/data.js","./rendering":"modules/rendering.js"}],"scripts.js":[function(require,module,exports) {
"use strict";

var _requests = require("./modules/requests");

var _rendering = require("./modules/rendering");

var _data = require("./modules/data");

require("./modules/events");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

{
  _requests.request.then(function (response) {
    return response.json();
  }).then(function (_ref) {
    var data = _ref.data;
    var statistics = data.covid19Stats.filter(function (_ref2) {
      var confirmed = _ref2.confirmed;
      return confirmed > 0;
    }).reduce(function (statistics, group) {
      var currentCountry = group.country;
      var existingGroup = statistics.find(function (_ref3) {
        var country = _ref3.country;
        return country === currentCountry;
      });

      if (existingGroup) {
        existingGroup.confirmed += group.confirmed;
        existingGroup.deaths += group.deaths;
        existingGroup.recovered += group.recovered;
      }

      return existingGroup ? _toConsumableArray(statistics) : [].concat(_toConsumableArray(statistics), [group]);
    }, []);
    (0, _data.setStatistics)(statistics);
    return statistics;
  }).then(function (statistics) {
    return (0, _rendering.renderStatistics)(statistics);
  }).catch(function (error) {
    return console.error(error.message);
  });
}
},{"./modules/requests":"modules/requests.js","./modules/rendering":"modules/rendering.js","./modules/data":"modules/data.js","./modules/events":"modules/events.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52172" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map