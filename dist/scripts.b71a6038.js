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
})({"modules/date-time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnDate = void 0;

var returnDate = function returnDate(date) {
  var _Date = new Date(date);

  if (isNaN(_Date)) return;
  return _Date.toLocaleDateString("en-us");
};

exports.returnDate = returnDate;
},{}],"modules/DOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortControls = exports.searchInput = exports.totalDeaths = exports.totalCases = exports.responsive = exports.main = void 0;
var main = document.querySelector(".root-main");
exports.main = main;
var responsive = document.querySelector(".root-responsive");
exports.responsive = responsive;
var totalCases = document.querySelector(".total-cases");
exports.totalCases = totalCases;
var totalDeaths = document.querySelector(".total-deaths");
exports.totalDeaths = totalDeaths;
var searchInput = document.getElementById("query");
exports.searchInput = searchInput;
var sortControls = document.querySelectorAll(".btn--sort");
exports.sortControls = sortControls;
},{}],"modules/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statisticsUI = exports.numberFormatter = void 0;

var _dateTime = require("./date-time");

var _DOM = require("./DOM");

var numberFormatter = Intl.NumberFormat('en-Us', {
  maximumSignificantDigits: 3
});
exports.numberFormatter = numberFormatter;

var statisticsUI = function statisticsUI(stats) {
  _DOM.main.innerHTML = stats.map(function (_ref, index) {
    var country = _ref.country;
    return statisticsMain(country, index);
  }).join('');
  _DOM.responsive.innerHTML = stats.map(function (statistic, index) {
    return statisticsResponsive(statistic, index);
  }).join('');
};

exports.statisticsUI = statisticsUI;

var handleRate = function handleRate(deaths, rate) {
  if (!deaths) {
    return "N/A";
  }

  return rate < 1 ? "< 1%" : "".concat(rate, "%");
};

var statisticsMain = function statisticsMain(country) {
  return " <tr>\n      <td>".concat(country === 'US' ? 'USA' : country, "</td>\n    </tr>\n  ");
};

var statisticsResponsive = function statisticsResponsive(_ref2) {
  var lastUpdate = _ref2.lastUpdate,
      confirmed = _ref2.confirmed,
      deaths = _ref2.deaths,
      rate = _ref2.rate;
  var formattedDeaths = numberFormatter.format(deaths);
  var formattedConfirmed = numberFormatter.format(confirmed);
  return " <tr>\n        <td  colspan=\"2\" class=\"color--orange text--center text--strong\">".concat(formattedConfirmed, "</td>\n        <td  colspan=\"2\" class=\"color--red text--center text--strong\">").concat(formattedDeaths, "</td>\n        <td class=\"text--center\">\n            ").concat(handleRate(deaths, rate), "\n        </td>\n        <td class=\"text--right text--small\">").concat((0, _dateTime.returnDate)(lastUpdate), "</td>\n      </tr>\n    ");
};
},{"./date-time":"modules/date-time.js","./DOM":"modules/DOM.js"}],"modules/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRenderedStatistics = exports.setStatistics = exports.renderedStatistics = exports.statistics = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var statistics = [];
exports.statistics = statistics;
var renderedStatistics = [];
exports.renderedStatistics = renderedStatistics;

var setStatistics = function setStatistics(data) {
  exports.statistics = statistics = _toConsumableArray(data);
};

exports.setStatistics = setStatistics;

var setRenderedStatistics = function setRenderedStatistics(data) {
  exports.renderedStatistics = renderedStatistics = _toConsumableArray(data);
};

exports.setRenderedStatistics = setRenderedStatistics;
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
  var deathCount = _toConsumableArray(_data.statistics).reduce(function (total, _ref) {
    var _ref$deaths = _ref.deaths,
        deaths = _ref$deaths === void 0 ? 0 : _ref$deaths;
    return total + deaths;
  }, 0);

  var caseCount = _toConsumableArray(_data.statistics).reduce(function (total, _ref2) {
    var _ref2$confirmed = _ref2.confirmed,
        confirmed = _ref2$confirmed === void 0 ? 0 : _ref2$confirmed;
    return total + confirmed;
  }, 0);

  _DOM.totalDeaths.innerText = _ui.numberFormatter.format(deathCount);
  _DOM.totalCases.innerText = _ui.numberFormatter.format(caseCount);

  if (stats.length < 1) {
    container.innerHTML = "<tr><td colspan=\"5\"><p>Sorry, no results for that search. Please adjust your query.<p></td></tr>";
  } else {
    (0, _data.setRenderedStatistics)(stats);
    (0, _ui.statisticsUI)(stats);
  }
};

exports.renderStatistics = renderStatistics;
},{"./ui":"modules/ui.js","./DOM":"modules/DOM.js","./data":"modules/data.js"}],"modules/searching.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSearch = handleSearch;

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
},{"./DOM":"modules/DOM.js","./data":"modules/data.js","./rendering":"modules/rendering.js"}],"modules/sorting.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSorting = handleSorting;

var _DOM = require("./DOM");

var _data = require("./data");

var _rendering = require("./rendering");

var sortIcons = {
  asc: "↑",
  desc: "↓"
};

var setSortAction = function setSortAction(_El, order) {
  var sortIndicator = _El.querySelector("span");

  _El.setAttribute("data-sort-order", order);

  sortIndicator.innerText = sortIcons[order] || "↕";
};

function handleSorting() {
  var _El = this;

  if (!_El) {
    return;
  }

  var sortType = _El.dataset.sort;
  var sortOrder = _El.dataset.sortOrder;

  _DOM.sortControls.forEach(function (control) {
    setSortAction(control, "");
  });

  var sorted = _data.renderedStatistics.sort(function (a, b) {
    if (!sortOrder || sortOrder === "asc") {
      setSortAction(_El, "desc");

      if (sortType === "country") {
        return b[sortType] < a[sortType] ? -1 : 1;
      } else {
        return b[sortType] - a[sortType];
      }
    } else {
      setSortAction(_El, "asc");

      if (sortType === "country") {
        return a[sortType] > b[sortType] ? 1 : -1;
      } else {
        return a[sortType] - b[sortType];
      }
    }
  });

  (0, _rendering.renderStatistics)(sorted);
}
},{"./DOM":"modules/DOM.js","./data":"modules/data.js","./rendering":"modules/rendering.js"}],"modules/events.js":[function(require,module,exports) {
"use strict";

var _DOM = require("./DOM");

var _searching = require("./searching");

var _sorting = require("./sorting");

_DOM.searchInput.addEventListener("keyup", _searching.handleSearch, true);

_DOM.sortControls.forEach(function (control) {
  control.addEventListener("click", _sorting.handleSorting, false);
});
},{"./DOM":"modules/DOM.js","./searching":"modules/searching.js","./sorting":"modules/sorting.js"}],"scripts.js":[function(require,module,exports) {
"use strict";

var _rendering = require("./modules/rendering");

var _data = require("./modules/data");

require("./modules/events");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

{
  var returnMortalityRate = function returnMortalityRate(deaths, confirmed) {
    return Math.round(deaths * 100 / confirmed);
  };

  fetch("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc").then(function (response) {
    return response.json();
  }).then(function (_ref) {
    var features = _ref.features;

    if (!features) {
      throw Error("No data");
    }

    var statistics = features.map(function (_ref2) {
      var _ref2$attributes = _ref2.attributes,
          lastUpdate = _ref2$attributes.Last_Update,
          confirmed = _ref2$attributes.Confirmed,
          recovered = _ref2$attributes.Recovered,
          deaths = _ref2$attributes.Deaths,
          active = _ref2$attributes.Active,
          country = _ref2$attributes.Country_Region;
      return {
        lastUpdate: lastUpdate,
        confirmed: confirmed,
        recovered: recovered,
        deaths: deaths,
        active: active,
        country: country
      };
    }).filter(function (_ref3) {
      var confirmed = _ref3.confirmed;
      return confirmed;
    }).reduce(function (statistics, group) {
      var currentCountry = group.country;
      var existingGroup = statistics.find(function (_ref4) {
        var country = _ref4.country;
        return country === currentCountry;
      });

      if (existingGroup) {
        existingGroup.confirmed += group.confirmed;
        existingGroup.deaths += group.deaths;
        existingGroup.recovered += group.recovered;
      }

      return existingGroup ? _toConsumableArray(statistics) : [].concat(_toConsumableArray(statistics), [group]);
    }, []).map(function (data) {
      var rate = returnMortalityRate(data.deaths, data.confirmed);
      return _objectSpread({}, data, {
        rate: rate
      });
    }).sort(function (a, b) {
      return b.confirmed - a.confirmed;
    });
    (0, _data.setStatistics)(statistics);
    return statistics;
  }).then(function (statistics) {
    return (0, _rendering.renderStatistics)(statistics);
  }).catch(function (error) {
    return console.error(error.message);
  });
}
},{"./modules/rendering":"modules/rendering.js","./modules/data":"modules/data.js","./modules/events":"modules/events.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54079" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map