/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/header.js":
/*!*******************************!*\
  !*** ./src/scripts/header.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header__container');
const headerBurger = document.querySelector('.header__burger');
const headerLogo = document.querySelector('.header__logo');
const headerCart = document.querySelector('.header__cart');
const search = document.querySelector('.header__search');
const nav = document.querySelector('.nav');
const info = document.querySelector('.header__info');
const login = document.querySelector('.header__login');
const classes = {
  header: 'header--active',
  headerContainer: 'header__container--active',
  headerBurger: 'header__burger--active',
  headerLogo: 'header__logo--active',
  headerCart: 'header__cart--active',
  search: 'header__search--active',
  nav: 'nav--active',
  info: 'header__info--active',
  login: 'header__login--active'
};
const openMenu = () => {
  header.classList.toggle(classes.header);
  headerContainer.classList.toggle(classes.headerContainer);
  headerBurger.classList.toggle(classes.headerBurger);
  headerLogo.classList.toggle(classes.headerLogo);
  headerCart.classList.toggle(classes.headerCart);
  search.classList.toggle(classes.search);
  nav.classList.toggle(classes.nav);
  info.classList.toggle(classes.info);
  login.classList.toggle(classes.login);
};
const handleAria = () => {
  if (headerBurger.classList.contains(classes.headerBurger)) {
    headerBurger.setAttribute('aria-label', 'Close navigation.');
  } else {
    headerBurger.setAttribute('aria-label', 'Open navigation.');
  }
};
headerBurger.addEventListener('click', () => {
  openMenu();
  handleAria();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.js */ "./src/scripts/header.js");

})();

/******/ })()
;
//# sourceMappingURL=index.js.map