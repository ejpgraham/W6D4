/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const queue = [];

window.$l = function(selector) {

  if (typeof selector === 'string'){
    const elementList = document.querySelectorAll(selector);
    const array = [];

    for (let i = 0; i < elementList.length; i++) {
      array.push(elementList[i]);
    }

    return new DOMNodeCollection(array);
  } else if (selector instanceof HTMLElement) {
    const result = [selector];
    return new DOMNodeCollection(result);
  } else if (typeof selector === 'function') {
    if (document.readyState === "complete") {
      selector();
    } else {
      queue.push(selector);
    }
  }
};
// running this outside of the loop prevents the $l function from potentially creating
// hundreds of event listeners

document.addEventListener("DOMContentLoaded", () => {
  queue.forEach((func) => {
    sleep(1000);
    func();
  });
});


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

debugger

sleep(3000)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
    this.listeners = [];

  }

  html(string) {

    if (string && string !== "") {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        el.innerHTML = string;
      }
      return null;
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      el.innerHTML = "";
    }
  }
  append(child){
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      if (child instanceof HTMLElement) {
        el.innerHTML += child.outerHTML;
      } else if (typeof child === 'string') {
        el.innerHTML += child;
      } else if (child instanceof DOMNodeCollection) {
        for (var j = 0; j < child.elements.length; j++) {
          el.innerHTML += child.elements[j].outerHTML;
        }
      }
    }
  }

  attr(attributeName, value){
    if (value) {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        el.setAttribute(attributeName, value);
      }
      return null;
    } else {
      return el.getAttribute(attributeName);
    }
  }

  addClass(className){
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      if (el.getAttribute('class')) {
        el.setAttribute('class', `${el.getAttribute('class')} ${className}`);
      } else {
        el.setAttribute('class', className);
      }
    }
  }

  removeClass(className){
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      if (el.getAttribute('class') === null) {
        continue;
      }
      if (el.getAttribute('class').split(" ").length > 1) {
        let classes = el.getAttribute('class').split(" ");
        classes = classes.filter((el) => {
          return el !== className;
        });
        el.setAttribute('class', classes.join(" "));
      } else if (el.getAttribute('class') === className) {
        el.removeAttribute('class');
      } else if (el.getAttribute('class') === "") {
        el.removeAttribute('class');
      }
    }
  }

  children() {
    const result = [];
    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      for (let j = 0; j < el.children.length; j++) {
        const child = el.children[j];
        result.push(child);
      }
    }
    return new DOMNodeCollection(result);
  }

  parent(){
    const result = [];
    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
        result.push(el.parentElement);
    }
    return new DOMNodeCollection(result);
  }

  find(selector) {
    const array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      const nodes = el.querySelectorAll(selector);
      for (var j = 0; j < nodes.length; j++) {
        array.push(nodes[j]);
      }
    }
    return new DOMNodeCollection(array);
  }

  remove() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].remove();
    }
    this.elements = [];
    this.listeners = [];
  }

  on(type, listener){
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(type, listener);
      this.elements[i].listener = listener;
    }
  }

  off(type){
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(type, this.elements[i].listener);
    }
  }

}


module.exports = DOMNodeCollection;


/***/ })
/******/ ]);