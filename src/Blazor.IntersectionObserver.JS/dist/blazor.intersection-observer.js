/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var BlazorIntersectionObserverJS;
(function (BlazorIntersectionObserverJS) {
    let OBSERVER_ID = 1;
    const observerInstances = new Map();
    function createObserverId() {
        return `blazor_plugin_observer__${OBSERVER_ID++}`;
    }
    function hasSameOptions(a, b) {
        return (a.root === b.root &&
            a.rootMargin === b.rootMargin &&
            a.threshold === b.threshold);
    }
    function getItemFromOptions(options) {
        let instanceFound = null;
        for (const [id, instance] of observerInstances) {
            if (hasSameOptions(options, instance.options)) {
                instanceFound = { id, instance };
                break;
            }
        }
        return instanceFound;
    }
    function observeInstanceElement(instance, element, observerId) {
        const { elements, observer } = instance;
        const observerElements = elements.get(observerId);
        if (observerElements != null) {
            observerElements.add(element);
        }
        else {
            elements.set(observerId, new Set([element]));
        }
        observer.observe(element);
        return instance;
    }
    function getObserverItem(dotnetRef, options) {
        if (options == null) {
            options = {};
        }
        const observerItem = getItemFromOptions(options);
        if (observerItem == null) {
            const id = createObserverId();
            const observer = new IntersectionObserver(onEntryChange(id), options);
            const elements = new Map();
            observerInstances.set(id, { dotnetRef, options, observer, elements });
            return {
                id,
                instance: observerInstances.get(id)
            };
        }
        return observerItem;
    }
    function create(dotnetRef, options) {
        return getObserverItem(dotnetRef, options);
    }
    BlazorIntersectionObserverJS.create = create;
    function observe(dotnetRef, id, node, options) {
        const { instance } = getObserverItem(dotnetRef, options);
        return observeInstanceElement(instance, node, id);
    }
    BlazorIntersectionObserverJS.observe = observe;
    function observeElement(id, element) {
        const observers = observerInstances.values();
        for (const instance of observers) {
            const elements = instance.elements.get(id);
            if (elements != null && !elements.has(element)) {
                instance.observer.observe(element);
                elements.add(element);
                break;
            }
        }
    }
    BlazorIntersectionObserverJS.observeElement = observeElement;
    function unobserve(id, element) {
        const observers = observerInstances.values();
        let removed = false;
        for (const instance of observers) {
            const elements = instance.elements.get(id);
            if (elements != null && elements.has(element)) {
                instance.observer.unobserve(element);
                elements.delete(element);
                removed = true;
                break;
            }
        }
        return removed;
    }
    BlazorIntersectionObserverJS.unobserve = unobserve;
    function disconnect(id) {
        const observers = observerInstances.entries();
        let disconnected = false;
        for (const [instanceId, instance] of observers) {
            if (instance.elements.get(id)) {
                instance.elements.delete(id);
                cleanupObserver(instanceId, instance);
                disconnected = true;
                break;
            }
        }
        return disconnected;
    }
    BlazorIntersectionObserverJS.disconnect = disconnect;
    function cleanupObserver(instanceId, instance) {
        let instanceRemoved = false;
        if (instance.elements.size === 0) {
            instance.observer.disconnect();
            observerInstances.delete(instanceId);
            instanceRemoved = true;
        }
        return instanceRemoved;
    }
    function onEntryChange(observerInstanceId) {
        return (entries) => {
            if (!observerInstances.has(observerInstanceId)) {
                return;
            }
            const { dotnetRef, elements } = observerInstances.get(observerInstanceId);
            const observerEntries = entries.reduce((batched, entry) => {
                for (const [id, item] of elements) {
                    if (item.has(entry.target)) {
                        batched[id] = (batched[id] || []).concat(entry);
                    }
                }
                return batched;
            }, {});
            Object.keys(observerEntries).forEach((observerId) => {
                const batch = observerEntries[observerId];
                dotnetRef.invokeMethodAsync("OnCallback", observerId, batch.map(toEntryObject));
            });
        };
    }
    function toEntryObject(entry) {
        function toRectReadOnlyObject(obj) {
            return {
                X: obj.x,
                Y: obj.y,
                Width: obj.width,
                Height: obj.height,
                Top: obj.top,
                Left: obj.left,
                Bottom: obj.bottom,
                Right: obj.right
            };
        }
        return {
            Target: entry.target,
            IsIntersecting: entry.isIntersecting,
            IntersectionRatio: entry.intersectionRatio,
            Time: entry.time,
            BoundingClientRect: toRectReadOnlyObject(entry.boundingClientRect),
            IntersectionRect: toRectReadOnlyObject(entry.intersectionRect),
            RootBounds: toRectReadOnlyObject(entry.rootBounds)
        };
    }
})(BlazorIntersectionObserverJS || (BlazorIntersectionObserverJS = {}));
if (typeof window !== "undefined") {
    window["BlazorIntersectionObserverJS"] = BlazorIntersectionObserverJS;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURBLElBQVUsNEJBQTRCLENBeVFyQztBQXpRRCxXQUFVLDRCQUE0QjtJQUVsQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFcEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBd0MsQ0FBQztJQUsxRSxTQUFTLGdCQUFnQjtRQUNyQixPQUFPLDJCQUEyQixXQUFXLEVBQUUsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFRRCxTQUFTLGNBQWMsQ0FBQyxDQUEyQixFQUFFLENBQTJCO1FBQzVFLE9BQU8sQ0FDSCxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJO1lBQ2pCLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FB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QkFBcUMsQ0FBQztZQUNyRixnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsZ0JBQW1DLENBQUM7WUFDakYsVUFBVSxFQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxVQUE2QixDQUFDO1NBQ3RFLENBQUM7SUFDUixDQUFDO0FBQ0wsQ0FBQyxFQXpRUyw0QkFBNEIsS0FBNUIsNEJBQTRCLFFBeVFyQztBQUVELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0lBQy9CLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLDRCQUE0QixDQUFDO0NBQ3pFIiwiZmlsZSI6ImJsYXpvci5pbnRlcnNlY3Rpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImludGVyZmFjZSBJRG90TmV0T2JqZWN0UmVmIHtcclxuICAgIGludm9rZU1ldGhvZEFzeW5jKG1ldGhvZE5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPGFueT47XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW0ge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGluc3RhbmNlOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZSB7XHJcbiAgICBkb3RuZXRSZWY6IElEb3ROZXRPYmplY3RSZWY7XHJcbiAgICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbiAgICBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQ7XHJcbiAgICBlbGVtZW50czogTWFwPHN0cmluZywgU2V0PEVsZW1lbnQ+PjtcclxufVxyXG5cclxuaW50ZXJmYWNlIEVsZW1lbnRJbnN0YW5jZSB7XHJcbiAgICBvYnNlcnZlcnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2VbXTtcclxufVxyXG5cclxudHlwZSBPbkludGVyc2VjdGlvblVwZGF0ZUZuID0gKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSkgPT4gYW55O1xyXG5cclxubmFtZXNwYWNlIEJsYXpvckludGVyc2VjdGlvbk9ic2VydmVySlMge1xyXG5cclxuICAgIGxldCBPQlNFUlZFUl9JRCA9IDE7XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXJJbnN0YW5jZXMgPSBuZXcgTWFwPHN0cmluZywgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciBhbiBvYnNlcnZlci4gXHJcbiAgICAgKiovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVPYnNlcnZlcklkKCkge1xyXG4gICAgICAgIHJldHVybiBgYmxhem9yX3BsdWdpbl9vYnNlcnZlcl9fJHtPQlNFUlZFUl9JRCsrfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSB0d28gb3B0aW9ucyBhcmUgdGhlIHNhbWUuXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVySW5pdH0gYSAtIEFuIG9ic2VydmVyJ3Mgb3B0aW9ucyB0byBjb21wYXJlIFxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluaXR9IGIgLSBBbiBvYnNlcnZlcidzIG9wdGlvbnMgdG8gY29tcGFyZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgdHdvIG9wdGlvbnMgYXJlIHRoZSBzYW1lXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhc1NhbWVPcHRpb25zKGE6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCwgYjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgYS5yb290ID09PSBiLnJvb3QgJiZcclxuICAgICAgICAgICAgYS5yb290TWFyZ2luID09PSBiLnJvb3RNYXJnaW4gJiZcclxuICAgICAgICAgICAgYS50aHJlc2hvbGQgPT09IGIudGhyZXNob2xkXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZXJlJ3MgYW4gZXhpc3Rpbmcgb2JzZXJ2ZXIgaXRlbSwgcmV0cmlldmUgaXQgZ2l2ZW4gdGhlIHNhbWUgb3B0aW9ucy5cclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0fSBvcHRpb25zIC0gVGhlIG9ic2VydmVyIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW0gfCBudWxsfSAtIFRoZSBvYnNlcnZlciBpdGVtIG9yIG5vdGhpbmcgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEl0ZW1Gcm9tT3B0aW9ucyhvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpOiBJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW0gfCBudWxsIHtcclxuICAgICAgICBsZXQgaW5zdGFuY2VGb3VuZDogKEludGVyc2VjdGlvbk9ic2VydmVySXRlbSB8IG51bGwpID0gbnVsbDtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIGluc3RhbmNlXSBvZiBvYnNlcnZlckluc3RhbmNlcykge1xyXG4gICAgICAgICAgICBpZiAoaGFzU2FtZU9wdGlvbnMob3B0aW9ucywgaW5zdGFuY2Uub3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlRm91bmQgPSB7IGlkLCBpbnN0YW5jZSB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZUZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFuIGVsZW1lbnQgdG8gdGhlIG9ic2VydmVyIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlfSBpbnN0YW5jZSAtIFRoZSBvYnNlcnZlciBpbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gYWRkIHRvIHRoZSBpbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9ic2VydmVySWQgLSBUaGUgb2JzZXJ2ZXIgaWRcclxuICAgICAqIEByZXR1cm5zIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlfSAtIFRoZSBvYnNlcnZlciBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBvYnNlcnZlSW5zdGFuY2VFbGVtZW50KGluc3RhbmNlOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlLCBlbGVtZW50OiBFbGVtZW50LCBvYnNlcnZlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB7IGVsZW1lbnRzLCBvYnNlcnZlciB9ID0gaW5zdGFuY2U7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJFbGVtZW50cyA9IGVsZW1lbnRzLmdldChvYnNlcnZlcklkKTtcclxuXHJcbiAgICAgICAgaWYgKG9ic2VydmVyRWxlbWVudHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlckVsZW1lbnRzLmFkZChlbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5zZXQob2JzZXJ2ZXJJZCwgbmV3IFNldDxFbGVtZW50PihbZWxlbWVudF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIG9yIHVzZSBhbiBleGlzdGluZyBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaXRlbS5cclxuICAgICAqIEBwYXJhbSB7RG90TmV0T2JqZWN0UmVmfSBkb3RuZXRSZWYgLSBUaGUgY3VycmVudCBkb3RuZXQgYmxhem9yIHJlZmVyZW5jZVxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5SW5pdH0gb3B0aW9ucyAtIFRoZSBvYnNlcnZlciBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJdGVtfSAtIFRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaXRlbVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRPYnNlcnZlckl0ZW0oZG90bmV0UmVmOiBJRG90TmV0T2JqZWN0UmVmLCBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpOiBJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW0ge1xyXG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJdGVtID0gZ2V0SXRlbUZyb21PcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAob2JzZXJ2ZXJJdGVtID09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVPYnNlcnZlcklkKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKG9uRW50cnlDaGFuZ2UoaWQpLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwPHN0cmluZywgU2V0PEVsZW1lbnQ+PigpO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXJJbnN0YW5jZXMuc2V0KGlkLCB7IGRvdG5ldFJlZiwgb3B0aW9ucywgb2JzZXJ2ZXIsIGVsZW1lbnRzIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IG9ic2VydmVySW5zdGFuY2VzLmdldChpZCkgYXMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmVySXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGludGVyc2VjdGlvbiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7SURvdE5ldE9iamVjdFJlZn0gZG90bmV0UmVmIC0gVGhlIGRvdG5ldCBpbnRlcm9wIHJlZmVyZW5jZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIGluc3RhbmNlIGlkIG9mIHRoZSBcIm9ic2VydmVyXCJcclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0fSBvcHRpb25zIC0gVGhlIGludGVyc2VjdGlvbiBvYnNldmVyIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW19IC0gVGhlIG9ic2VydmVyIGl0ZW1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShkb3RuZXRSZWY6IElEb3ROZXRPYmplY3RSZWYsIG9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCkge1xyXG4gICAgICAgIHJldHVybiBnZXRPYnNlcnZlckl0ZW0oZG90bmV0UmVmLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmUgdGhlIHRhcmdldCBub2RlIHVzaW5nIGEgbmV3IG9yIGV4aXN0aW5nIG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge0lEb3ROZXRPYmplY3RSZWZ9IGRvdG5ldFJlZiAtIFRoZSBkb3RuZXQgaW50ZXJvcCByZWZlcmVuY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpbnN0YW5jZSBpZCBvZiB0aGUgXCJvYnNlcnZlclwiXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGUgLSBUaGUgbm9kZSB0byBvYnNlcnZlXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVySW5pdH0gb3B0aW9ucyAtIFRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2V9IC0gVGhlIG9ic2VydmVyIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKGRvdG5ldFJlZjogSURvdE5ldE9iamVjdFJlZiwgaWQ6IHN0cmluZywgbm9kZTogRWxlbWVudCwgb3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KSB7XHJcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gZ2V0T2JzZXJ2ZXJJdGVtKGRvdG5ldFJlZiwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmVJbnN0YW5jZUVsZW1lbnQoaW5zdGFuY2UsIG5vZGUsIGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmUgYW4gZWxlbWVudCBmb3IgdGhlIG9ic2VydmVyIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIGlkIC0gVGhlIG9ic2VydmVyIGlkXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIG9ic2VydmVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50KGlkOiBzdHJpbmcsIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBvYnNlcnZlckluc3RhbmNlcy52YWx1ZXMoKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBpbnN0YW5jZS5lbGVtZW50cy5nZXQoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzICE9IG51bGwgJiYgIWVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uub2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmFkZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSBlbGVtZW50IGZyb20gdGhlIG9ic2VydmVyIGluc3RhbmNlIGFuZFxyXG4gICAgICogdW5vYnNlcnZlIHRoZSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIG9ic2VydmVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgbm9kZSB0byB1bm9ic2VydmVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAtIFdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIGJlZW4gdW5vYnNlcnZlZFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdW5vYnNlcnZlKGlkOiBzdHJpbmcsIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBvYnNlcnZlckluc3RhbmNlcy52YWx1ZXMoKTtcclxuICAgICAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIG9ic2VydmVycykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGluc3RhbmNlLmVsZW1lbnRzLmdldChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHMgIT0gbnVsbCAmJiBlbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLm9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50cyBmcm9tIHRoZSBvYnNlcnZlciBpbnN0YW5jZSBcclxuICAgICAqIGFuZCB0cmlnZ2VyIGNsZWFuaW5nIHVwIHRoZSBvYnNlcnZlcnMuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgb2JzZXJ2ZXIgaW5zdGFuY2UgaWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAtIFdoZXRoZXIgdGhlIGVsZW1lbnRzIGhhdmVcclxuICAgICAqIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBvYnNlcnZlciBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGlzY29ubmVjdChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gb2JzZXJ2ZXJJbnN0YW5jZXMuZW50cmllcygpO1xyXG4gICAgICAgIGxldCBkaXNjb25uZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBbaW5zdGFuY2VJZCwgaW5zdGFuY2VdIG9mIG9ic2VydmVycykge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudHMuZ2V0KGlkKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgICAgIGNsZWFudXBPYnNlcnZlcihpbnN0YW5jZUlkLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBkaXNjb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaXNjb25uZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGVyZSBhcmUgbm8gZWxlbWVudHMgaW4gdGhlIG9ic2VydmVyXHJcbiAgICAgKiBpbnN0YW5jZSwgZGlzY29ubmVjdCB0aGUgb2JzZXJ2ZXIgYW5kIHJlbW92ZVxyXG4gICAgICogaXQgZnJvbSB0aGUgb2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGluc3RhbmNlSWQgLSBUaGUgb2JzZXJ2ZXIgaW5zdGFuY2UgaWRcclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZX0gaW5zdGFuY2UgLSBUaGUgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRoZSBpbnN0YW5jZSBoYXMgYmVlbiByZW1vdmVkXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNsZWFudXBPYnNlcnZlcihpbnN0YW5jZUlkOiBzdHJpbmcsIGluc3RhbmNlOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlKSB7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlUmVtb3ZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudHMuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVySW5zdGFuY2VzLmRlbGV0ZShpbnN0YW5jZUlkKTtcclxuICAgICAgICAgICAgaW5zdGFuY2VSZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZVJlbW92ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCB3aGVuIGFuXHJcbiAgICAgKiBlbGVtZW50IGhhcyBhbiBpbnRlcnNlY3Rpb24gdXBkYXRlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9ic2VydmVySW5zdGFuY2VJZCAtIFRoZSBpbnN0YW5jZSBpZFxyXG4gICAgICogQHJldHVybnMge09uSW50ZXJzZWN0aW9uVXBkYXRlRm59IC0gVGhlIGZ1bmN0aW9uIHRyaWdnZXJlZCBieSBhbiBpbnRlcnNlY3Rpb24gdXBkYXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uRW50cnlDaGFuZ2Uob2JzZXJ2ZXJJbnN0YW5jZUlkOiBzdHJpbmcpOiBPbkludGVyc2VjdGlvblVwZGF0ZUZuIHtcclxuICAgICAgICByZXR1cm4gKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9ic2VydmVySW5zdGFuY2VzLmhhcyhvYnNlcnZlckluc3RhbmNlSWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZG90bmV0UmVmLCBlbGVtZW50cyB9ID0gb2JzZXJ2ZXJJbnN0YW5jZXMuZ2V0KG9ic2VydmVySW5zdGFuY2VJZCkgYXMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyRW50cmllcyA9IGVudHJpZXMucmVkdWNlKChiYXRjaGVkLCBlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbaWQsIGl0ZW1dIG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzKGVudHJ5LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hlZFtpZF0gPSAoYmF0Y2hlZFtpZF0gfHwgW10pLmNvbmNhdChlbnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhdGNoZWQ7XHJcbiAgICAgICAgICAgIH0sIHt9KTtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9ic2VydmVyRW50cmllcykuZm9yRWFjaCgob2JzZXJ2ZXJJZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmF0Y2ggPSBvYnNlcnZlckVudHJpZXNbb2JzZXJ2ZXJJZF0gYXMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdO1xyXG4gICAgICAgICAgICAgICAgZG90bmV0UmVmLmludm9rZU1ldGhvZEFzeW5jKFwiT25DYWxsYmFja1wiLCBvYnNlcnZlcklkLCBiYXRjaC5tYXAodG9FbnRyeU9iamVjdCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IHRoZSBvYnNlcnZlciBlbnRyeSB0byBhbiBvYmplY3QgdGhhdFxyXG4gICAgICogd2lsbCBiZSBwYXJzZWQgdG8gdGhlIGNhbGxiYWNrLlxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5fSBlbnRyeSAtIFRoZSBvYnNlcnZlciBlbnRyeVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b0VudHJ5T2JqZWN0KGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gdG9SZWN0UmVhZE9ubHlPYmplY3Qob2JqOiBET01SZWN0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFg6IG9iai54LFxyXG4gICAgICAgICAgICAgICAgWTogb2JqLnksXHJcbiAgICAgICAgICAgICAgICBXaWR0aDogb2JqLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgSGVpZ2h0OiBvYmouaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgVG9wOiBvYmoudG9wLFxyXG4gICAgICAgICAgICAgICAgTGVmdDogb2JqLmxlZnQsXHJcbiAgICAgICAgICAgICAgICBCb3R0b206IG9iai5ib3R0b20sXHJcbiAgICAgICAgICAgICAgICBSaWdodDogb2JqLnJpZ2h0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBUYXJnZXQ6IGVudHJ5LnRhcmdldCxcclxuICAgICAgICAgICAgSXNJbnRlcnNlY3Rpbmc6IGVudHJ5LmlzSW50ZXJzZWN0aW5nLFxyXG4gICAgICAgICAgICBJbnRlcnNlY3Rpb25SYXRpbzogZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8sXHJcbiAgICAgICAgICAgIFRpbWU6IGVudHJ5LnRpbWUsXHJcbiAgICAgICAgICAgIEJvdW5kaW5nQ2xpZW50UmVjdDogdG9SZWN0UmVhZE9ubHlPYmplY3QoZW50cnkuYm91bmRpbmdDbGllbnRSZWN0IGFzIERPTVJlY3RSZWFkT25seSksXHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvblJlY3Q6IHRvUmVjdFJlYWRPbmx5T2JqZWN0KGVudHJ5LmludGVyc2VjdGlvblJlY3QgYXMgRE9NUmVjdFJlYWRPbmx5KSxcclxuICAgICAgICAgICAgUm9vdEJvdW5kczogdG9SZWN0UmVhZE9ubHlPYmplY3QoZW50cnkucm9vdEJvdW5kcyBhcyBET01SZWN0UmVhZE9ubHkpXHJcbiAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgd2luZG93W1wiQmxhem9ySW50ZXJzZWN0aW9uT2JzZXJ2ZXJKU1wiXSA9IEJsYXpvckludGVyc2VjdGlvbk9ic2VydmVySlM7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==