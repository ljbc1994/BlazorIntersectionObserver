!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o;!function(e){let t=1;const n=new Map;function o(e,t){return e.root===t.root&&e.rootMargin===t.rootMargin&&e.threshold===t.threshold}function r(e,r){null==r&&(r={});const i=function(e){let t=null;for(const[r,i]of n)if(o(e,i.options)){t={id:r,instance:i};break}return t}(r);if(null==i){const o=`blazor_plugin_observer__${t++}`,i=new IntersectionObserver(function(e){return t=>{if(!n.has(e))return;const{dotnetRef:o,elements:r}=n.get(e),i=t.reduce((e,t)=>{for(const[n,o]of r)o.has(t.target)&&(e[n]=(e[n]||[]).concat(t));return e},{});Object.keys(i).forEach(e=>{const t=i[e];o.invokeMethodAsync("OnCallback",e,t.map(s))})}}(o),r),c=new Map;return n.set(o,{dotnetRef:e,options:r,observer:i,elements:c}),{id:o,instance:n.get(o)}}return i}function i(e,t){let o=!1;return 0===t.elements.size&&(t.observer.disconnect(),n.delete(e),o=!0),o}function s(e){function t(e){return{X:e.x,Y:e.y,Width:e.width,Height:e.height,Top:e.top,Left:e.left,Bottom:e.bottom,Right:e.right}}return{Target:e.target,IsIntersecting:e.isIntersecting,IntersectionRatio:e.intersectionRatio,Time:e.time,BoundingClientRect:t(e.boundingClientRect),IntersectionRect:t(e.intersectionRect),RootBounds:t(e.rootBounds)}}e.create=function(e,t,n){const o=r(e,n),{instance:i}=o;return i.elements.set(t,new Set([])),o},e.observe=function(e,t,n,o){const{instance:i}=r(e,o);return function(e,t,n){const{elements:o,observer:r}=e,i=o.get(t);return null!=i?i.add(n):o.set(t,new Set([n])),r.observe(n),e}(i,t,n)},e.observeElement=function(e,t){const o=n.values();for(const n of o){const o=n.elements.get(e);if(null!=o&&!o.has(t)){n.observer.observe(t),o.add(t);break}}},e.unobserve=function(e,t){const o=n.values();let r=!1;for(const n of o){const o=n.elements.get(e);if(null!=o&&o.has(t)){n.observer.unobserve(t),o.delete(t),r=!0;break}}return r},e.disconnect=function(e){const t=n.entries();let o=!1;for(const[n,r]of t)if(r.elements.get(e)){r.elements.delete(e),i(n,r),o=!0;break}return o}}(o||(o={})),"undefined"!=typeof window&&(window.BlazorIntersectionObserverJS=o)}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQmxhem9ySW50ZXJzZWN0aW9uT2JzZXJ2ZXJKUyIsIk9CU0VSVkVSX0lEIiwib2JzZXJ2ZXJJbnN0YW5jZXMiLCJNYXAiLCJoYXNTYW1lT3B0aW9ucyIsImEiLCJiIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJnZXRPYnNlcnZlckl0ZW0iLCJkb3RuZXRSZWYiLCJvcHRpb25zIiwib2JzZXJ2ZXJJdGVtIiwiaW5zdGFuY2VGb3VuZCIsImlkIiwiaW5zdGFuY2UiLCJnZXRJdGVtRnJvbU9wdGlvbnMiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZXJJbnN0YW5jZUlkIiwiZW50cmllcyIsImhhcyIsImVsZW1lbnRzIiwib2JzZXJ2ZXJFbnRyaWVzIiwicmVkdWNlIiwiYmF0Y2hlZCIsImVudHJ5IiwiaXRlbSIsInRhcmdldCIsImNvbmNhdCIsImtleXMiLCJmb3JFYWNoIiwib2JzZXJ2ZXJJZCIsImJhdGNoIiwiaW52b2tlTWV0aG9kQXN5bmMiLCJtYXAiLCJ0b0VudHJ5T2JqZWN0Iiwib25FbnRyeUNoYW5nZSIsInNldCIsImNsZWFudXBPYnNlcnZlciIsImluc3RhbmNlSWQiLCJpbnN0YW5jZVJlbW92ZWQiLCJzaXplIiwiZGlzY29ubmVjdCIsImRlbGV0ZSIsInRvUmVjdFJlYWRPbmx5T2JqZWN0Iiwib2JqIiwiWCIsIngiLCJZIiwieSIsIldpZHRoIiwid2lkdGgiLCJIZWlnaHQiLCJoZWlnaHQiLCJUb3AiLCJ0b3AiLCJMZWZ0IiwibGVmdCIsIkJvdHRvbSIsImJvdHRvbSIsIlJpZ2h0IiwicmlnaHQiLCJUYXJnZXQiLCJJc0ludGVyc2VjdGluZyIsImlzSW50ZXJzZWN0aW5nIiwiSW50ZXJzZWN0aW9uUmF0aW8iLCJpbnRlcnNlY3Rpb25SYXRpbyIsIlRpbWUiLCJ0aW1lIiwiQm91bmRpbmdDbGllbnRSZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwiSW50ZXJzZWN0aW9uUmVjdCIsImludGVyc2VjdGlvblJlY3QiLCJSb290Qm91bmRzIiwicm9vdEJvdW5kcyIsIlNldCIsIm9ic2VydmUiLCJub2RlIiwiZWxlbWVudCIsIm9ic2VydmVyRWxlbWVudHMiLCJhZGQiLCJvYnNlcnZlSW5zdGFuY2VFbGVtZW50Iiwib2JzZXJ2ZUVsZW1lbnQiLCJvYnNlcnZlcnMiLCJ2YWx1ZXMiLCJ1bm9ic2VydmUiLCJyZW1vdmVkIiwiZGlzY29ubmVjdGVkIiwid2luZG93Il0sIm1hcHBpbmdzIjoiYUFDQSxJQUFBQSxLQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLElBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsWUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBS0FGLEVBQUFRLEVBQUFGLEVBR0FOLEVBQUFTLEVBQUFWLEVBR0FDLEVBQUFVLEVBQUEsU0FBQVIsRUFBQVMsRUFBQUMsR0FDQVosRUFBQWEsRUFBQVgsRUFBQVMsSUFDQUcsT0FBQUMsZUFBQWIsRUFBQVMsR0FBMENLLFlBQUEsRUFBQUMsSUFBQUwsS0FLMUNaLEVBQUFrQixFQUFBLFNBQUFoQixHQUNBLG9CQUFBaUIsZUFBQUMsYUFDQU4sT0FBQUMsZUFBQWIsRUFBQWlCLE9BQUFDLGFBQXdEQyxNQUFBLFdBRXhEUCxPQUFBQyxlQUFBYixFQUFBLGNBQWlEbUIsT0FBQSxLQVFqRHJCLEVBQUFzQixFQUFBLFNBQUFELEVBQUFFLEdBRUEsR0FEQSxFQUFBQSxJQUFBRixFQUFBckIsRUFBQXFCLElBQ0EsRUFBQUUsRUFBQSxPQUFBRixFQUNBLEtBQUFFLEdBQUEsaUJBQUFGLFFBQUFHLFdBQUEsT0FBQUgsRUFDQSxJQUFBSSxFQUFBWCxPQUFBWSxPQUFBLE1BR0EsR0FGQTFCLEVBQUFrQixFQUFBTyxHQUNBWCxPQUFBQyxlQUFBVSxFQUFBLFdBQXlDVCxZQUFBLEVBQUFLLFVBQ3pDLEVBQUFFLEdBQUEsaUJBQUFGLEVBQUEsUUFBQU0sS0FBQU4sRUFBQXJCLEVBQUFVLEVBQUFlLEVBQUFFLEVBQUEsU0FBQUEsR0FBZ0gsT0FBQU4sRUFBQU0sSUFBcUJDLEtBQUEsS0FBQUQsSUFDckksT0FBQUYsR0FJQXpCLEVBQUE2QixFQUFBLFNBQUExQixHQUNBLElBQUFTLEVBQUFULEtBQUFxQixXQUNBLFdBQTJCLE9BQUFyQixFQUFBLFNBQzNCLFdBQWlDLE9BQUFBLEdBRWpDLE9BREFILEVBQUFVLEVBQUFFLEVBQUEsSUFBQUEsR0FDQUEsR0FJQVosRUFBQWEsRUFBQSxTQUFBaUIsRUFBQUMsR0FBc0QsT0FBQWpCLE9BQUFrQixVQUFBQyxlQUFBMUIsS0FBQXVCLEVBQUFDLElBR3REL0IsRUFBQWtDLEVBQUEsR0FJQWxDLElBQUFtQyxFQUFBLGtDQzVEQSxJQUFVQyxHQUFWLFNBQVVBLEdBRU4sSUFBSUMsRUFBYyxFQUVsQixNQUFNQyxFQUFvQixJQUFJQyxJQWU5QixTQUFTQyxFQUFlQyxFQUE2QkMsR0FDakQsT0FDSUQsRUFBRUUsT0FBU0QsRUFBRUMsTUFDYkYsRUFBRUcsYUFBZUYsRUFBRUUsWUFDbkJILEVBQUVJLFlBQWNILEVBQUVHLFVBaUQxQixTQUFTQyxFQUFnQkMsRUFBNkJDLEdBQ25DLE1BQVhBLElBQ0FBLE1BR0osTUFBTUMsRUE3Q1YsU0FBNEJELEdBQ3hCLElBQUlFLEVBQW1ELEtBRXZELElBQUssTUFBT0MsRUFBSUMsS0FBYWQsRUFDekIsR0FBSUUsRUFBZVEsRUFBU0ksRUFBU0osU0FBVSxDQUMzQ0UsR0FBa0JDLEtBQUlDLFlBQ3RCLE1BSVIsT0FBT0YsRUFtQ2NHLENBQW1CTCxHQUV4QyxHQUFvQixNQUFoQkMsRUFBc0IsQ0FDdEIsTUFBTUUsNkJBdEV3QmQsTUF1RXhCaUIsRUFBVyxJQUFJQyxxQkFzSTdCLFNBQXVCQyxHQUNuQixPQUFRQyxJQUNKLElBQUtuQixFQUFrQm9CLElBQUlGLEdBQ3ZCLE9BR0osTUFBTVQsVUFBRUEsRUFBU1ksU0FBRUEsR0FBYXJCLEVBQWtCckIsSUFBSXVDLEdBRWhESSxFQUFrQkgsRUFBUUksT0FBTyxDQUFDQyxFQUFTQyxLQUM3QyxJQUFLLE1BQU9aLEVBQUlhLEtBQVNMLEVBQ2pCSyxFQUFLTixJQUFJSyxFQUFNRSxVQUNmSCxFQUFRWCxJQUFPVyxFQUFRWCxRQUFXZSxPQUFPSCxJQUdqRCxPQUFPRCxPQUdYaEQsT0FBT3FELEtBQUtQLEdBQWlCUSxRQUFTQyxJQUNsQyxNQUFNQyxFQUFRVixFQUFnQlMsR0FDOUJ0QixFQUFVd0Isa0JBQWtCLGFBQWNGLEVBQVlDLEVBQU1FLElBQUlDLE9BekoxQkMsQ0FBY3ZCLEdBQUtILEdBQ3ZEVyxFQUFXLElBQUlwQixJQUlyQixPQUZBRCxFQUFrQnFDLElBQUl4QixHQUFNSixZQUFXQyxVQUFTTSxXQUFVSyxjQUd0RFIsS0FDQUMsU0FBVWQsRUFBa0JyQixJQUFJa0MsSUFJeEMsT0FBT0YsRUF5R1gsU0FBUzJCLEVBQWdCQyxFQUFvQnpCLEdBQ3pDLElBQUkwQixHQUFrQixFQVF0QixPQU4rQixJQUEzQjFCLEVBQVNPLFNBQVNvQixPQUNsQjNCLEVBQVNFLFNBQVMwQixhQUNsQjFDLEVBQWtCMkMsT0FBT0osR0FDekJDLEdBQWtCLEdBR2ZBLEVBc0NYLFNBQVNMLEVBQWNWLEdBQ25CLFNBQVNtQixFQUFxQkMsR0FDMUIsT0FDSUMsRUFBR0QsRUFBSUUsRUFDUEMsRUFBR0gsRUFBSUksRUFDUEMsTUFBT0wsRUFBSU0sTUFDWEMsT0FBUVAsRUFBSVEsT0FDWkMsSUFBS1QsRUFBSVUsSUFDVEMsS0FBTVgsRUFBSVksS0FDVkMsT0FBUWIsRUFBSWMsT0FDWkMsTUFBT2YsRUFBSWdCLE9BSW5CLE9BQ0lDLE9BQVFyQyxFQUFNRSxPQUNkb0MsZUFBZ0J0QyxFQUFNdUMsZUFDdEJDLGtCQUFtQnhDLEVBQU15QyxrQkFDekJDLEtBQU0xQyxFQUFNMkMsS0FDWkMsbUJBQW9CekIsRUFBcUJuQixFQUFNNkMsb0JBQy9DQyxpQkFBa0IzQixFQUFxQm5CLEVBQU0rQyxrQkFDN0NDLFdBQVk3QixFQUFxQm5CLEVBQU1pRCxhQW5LL0I1RSxFQUFBVixPQUFoQixTQUF1QnFCLEVBQTZCSSxFQUFZSCxHQUM5RCxNQUFNZ0IsRUFBT2xCLEVBQWdCQyxFQUFXQyxJQUNsQ0ksU0FBRUEsR0FBYVksRUFFckIsT0FEQVosRUFBU08sU0FBU2dCLElBQUl4QixFQUFJLElBQUk4RCxTQUN2QmpELEdBV081QixFQUFBOEUsUUFBaEIsU0FBd0JuRSxFQUE2QkksRUFBWWdFLEVBQWVuRSxHQUM1RSxNQUFNSSxTQUFFQSxHQUFhTixFQUFnQkMsRUFBV0MsR0FDaEQsT0FuRUosU0FBZ0NJLEVBQXdDaUIsRUFBb0IrQyxHQUN4RixNQUFNekQsU0FBRUEsRUFBUUwsU0FBRUEsR0FBYUYsRUFDekJpRSxFQUFtQjFELEVBQVMxQyxJQUFJb0QsR0FTdEMsT0FQd0IsTUFBcEJnRCxFQUNBQSxFQUFpQkMsSUFBSUYsR0FFckJ6RCxFQUFTZ0IsSUFBSU4sRUFBWSxJQUFJNEMsS0FBY0csS0FHL0M5RCxFQUFTNEQsUUFBUUUsR0FDVmhFLEVBd0RBbUUsQ0FBdUJuRSxFQUFVRCxFQUFJZ0UsSUFRaEMvRSxFQUFBb0YsZUFBaEIsU0FBK0JyRSxFQUFZaUUsR0FDdkMsTUFBTUssRUFBWW5GLEVBQWtCb0YsU0FFcEMsSUFBSyxNQUFNdEUsS0FBWXFFLEVBQVcsQ0FDOUIsTUFBTTlELEVBQVdQLEVBQVNPLFNBQVMxQyxJQUFJa0MsR0FFdkMsR0FBZ0IsTUFBWlEsSUFBcUJBLEVBQVNELElBQUkwRCxHQUFVLENBQzVDaEUsRUFBU0UsU0FBUzRELFFBQVFFLEdBQzFCekQsRUFBUzJELElBQUlGLEdBQ2IsU0FZSWhGLEVBQUF1RixVQUFoQixTQUEwQnhFLEVBQVlpRSxHQUNsQyxNQUFNSyxFQUFZbkYsRUFBa0JvRixTQUNwQyxJQUFJRSxHQUFVLEVBRWQsSUFBSyxNQUFNeEUsS0FBWXFFLEVBQVcsQ0FDOUIsTUFBTTlELEVBQVdQLEVBQVNPLFNBQVMxQyxJQUFJa0MsR0FFdkMsR0FBZ0IsTUFBWlEsR0FBb0JBLEVBQVNELElBQUkwRCxHQUFVLENBQzNDaEUsRUFBU0UsU0FBU3FFLFVBQVVQLEdBQzVCekQsRUFBU3NCLE9BQU9tQyxHQUNoQlEsR0FBVSxFQUNWLE9BSVIsT0FBT0EsR0FVS3hGLEVBQUE0QyxXQUFoQixTQUEyQjdCLEdBQ3ZCLE1BQU1zRSxFQUFZbkYsRUFBa0JtQixVQUNwQyxJQUFJb0UsR0FBZSxFQUVuQixJQUFLLE1BQU9oRCxFQUFZekIsS0FBYXFFLEVBQ2pDLEdBQUlyRSxFQUFTTyxTQUFTMUMsSUFBSWtDLEdBQUssQ0FDM0JDLEVBQVNPLFNBQVNzQixPQUFPOUIsR0FDekJ5QixFQUFnQkMsRUFBWXpCLEdBQzVCeUUsR0FBZSxFQUNmLE1BSVIsT0FBT0EsR0ExTGYsQ0FBVXpGLFdBOFFZLG9CQUFYMEYsU0FDUEEsT0FBcUMsNkJBQUkxRiIsImZpbGUiOiJibGF6b3IuaW50ZXJzZWN0aW9uLW9ic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW50ZXJmYWNlIElEb3ROZXRPYmplY3RSZWYge1xyXG4gICAgaW52b2tlTWV0aG9kQXN5bmMobWV0aG9kTmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8YW55PjtcclxufVxyXG5cclxuaW50ZXJmYWNlIEludGVyc2VjdGlvbk9ic2VydmVySXRlbSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgaW5zdGFuY2U6IEludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlIHtcclxuICAgIGRvdG5ldFJlZjogSURvdE5ldE9iamVjdFJlZjtcclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIG9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdDtcclxuICAgIGVsZW1lbnRzOiBNYXA8c3RyaW5nLCBTZXQ8RWxlbWVudD4+O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRWxlbWVudEluc3RhbmNlIHtcclxuICAgIG9ic2VydmVyczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZVtdO1xyXG59XHJcblxyXG50eXBlIE9uSW50ZXJzZWN0aW9uVXBkYXRlRm4gPSAoZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKSA9PiBhbnk7XHJcblxyXG5uYW1lc3BhY2UgQmxhem9ySW50ZXJzZWN0aW9uT2JzZXJ2ZXJKUyB7XHJcblxyXG4gICAgbGV0IE9CU0VSVkVSX0lEID0gMTtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlckluc3RhbmNlcyA9IG5ldyBNYXA8c3RyaW5nLCBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgYSB1bmlxdWUgaWQgZm9yIGFuIG9ic2VydmVyLiBcclxuICAgICAqKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBibGF6b3JfcGx1Z2luX29ic2VydmVyX18ke09CU0VSVkVSX0lEKyt9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHdoZXRoZXIgdGhlIHR3byBvcHRpb25zIGFyZSB0aGUgc2FtZS5cclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0fSBhIC0gQW4gb2JzZXJ2ZXIncyBvcHRpb25zIHRvIGNvbXBhcmUgXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVySW5pdH0gYiAtIEFuIG9ic2VydmVyJ3Mgb3B0aW9ucyB0byBjb21wYXJlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRoZSB0d28gb3B0aW9ucyBhcmUgdGhlIHNhbWVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFzU2FtZU9wdGlvbnMoYTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0LCBiOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBhLnJvb3QgPT09IGIucm9vdCAmJlxyXG4gICAgICAgICAgICBhLnJvb3RNYXJnaW4gPT09IGIucm9vdE1hcmdpbiAmJlxyXG4gICAgICAgICAgICBhLnRocmVzaG9sZCA9PT0gYi50aHJlc2hvbGRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlcmUncyBhbiBleGlzdGluZyBvYnNlcnZlciBpdGVtLCByZXRyaWV2ZSBpdCBnaXZlbiB0aGUgc2FtZSBvcHRpb25zLlxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluaXR9IG9wdGlvbnMgLSBUaGUgb2JzZXJ2ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdGlvbk9ic2VydmVySXRlbSB8IG51bGx9IC0gVGhlIG9ic2VydmVyIGl0ZW0gb3Igbm90aGluZyBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SXRlbUZyb21PcHRpb25zKG9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCk6IEludGVyc2VjdGlvbk9ic2VydmVySXRlbSB8IG51bGwge1xyXG4gICAgICAgIGxldCBpbnN0YW5jZUZvdW5kOiAoSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJdGVtIHwgbnVsbCkgPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IFtpZCwgaW5zdGFuY2VdIG9mIG9ic2VydmVySW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNTYW1lT3B0aW9ucyhvcHRpb25zLCBpbnN0YW5jZS5vcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VGb3VuZCA9IHsgaWQsIGluc3RhbmNlIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlRm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYW4gZWxlbWVudCB0byB0aGUgb2JzZXJ2ZXIgaW5zdGFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2V9IGluc3RhbmNlIC0gVGhlIG9ic2VydmVyIGluc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGluc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JzZXJ2ZXJJZCAtIFRoZSBvYnNlcnZlciBpZFxyXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2V9IC0gVGhlIG9ic2VydmVyIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9ic2VydmVJbnN0YW5jZUVsZW1lbnQoaW5zdGFuY2U6IEludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2UsIG9ic2VydmVySWQ6IHN0cmluZywgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IHsgZWxlbWVudHMsIG9ic2VydmVyIH0gPSBpbnN0YW5jZTtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckVsZW1lbnRzID0gZWxlbWVudHMuZ2V0KG9ic2VydmVySWQpO1xyXG5cclxuICAgICAgICBpZiAob2JzZXJ2ZXJFbGVtZW50cyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyRWxlbWVudHMuYWRkKGVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLnNldChvYnNlcnZlcklkLCBuZXcgU2V0PEVsZW1lbnQ+KFtlbGVtZW50XSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgb3IgdXNlIGFuIGV4aXN0aW5nIGludGVyc2VjdGlvbiBvYnNlcnZlciBpdGVtLlxyXG4gICAgICogQHBhcmFtIHtEb3ROZXRPYmplY3RSZWZ9IGRvdG5ldFJlZiAtIFRoZSBjdXJyZW50IGRvdG5ldCBibGF6b3IgcmVmZXJlbmNlXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnlJbml0fSBvcHRpb25zIC0gVGhlIG9ic2VydmVyIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtJbnRlcnNlY3Rpb25PYnNlcnZlckl0ZW19IC0gVGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBpdGVtXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldE9ic2VydmVySXRlbShkb3RuZXRSZWY6IElEb3ROZXRPYmplY3RSZWYsIG9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCk6IEludGVyc2VjdGlvbk9ic2VydmVySXRlbSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlckl0ZW0gPSBnZXRJdGVtRnJvbU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChvYnNlcnZlckl0ZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGNyZWF0ZU9ic2VydmVySWQoKTtcclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIob25FbnRyeUNoYW5nZShpZCksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8RWxlbWVudD4+KCk7XHJcblxyXG4gICAgICAgICAgICBvYnNlcnZlckluc3RhbmNlcy5zZXQoaWQsIHsgZG90bmV0UmVmLCBvcHRpb25zLCBvYnNlcnZlciwgZWxlbWVudHMgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogb2JzZXJ2ZXJJbnN0YW5jZXMuZ2V0KGlkKSBhcyBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXJJdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgaW50ZXJzZWN0aW9uIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtJRG90TmV0T2JqZWN0UmVmfSBkb3RuZXRSZWYgLSBUaGUgZG90bmV0IGludGVyb3AgcmVmZXJlbmNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgaW5zdGFuY2UgaWQgb2YgdGhlIFwib2JzZXJ2ZXJcIlxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluaXR9IG9wdGlvbnMgLSBUaGUgaW50ZXJzZWN0aW9uIG9ic2V2ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdGlvbk9ic2VydmVySXRlbX0gLSBUaGUgb2JzZXJ2ZXIgaXRlbVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlKGRvdG5ldFJlZjogSURvdE5ldE9iamVjdFJlZiwgaWQ6IHN0cmluZywgb3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBnZXRPYnNlcnZlckl0ZW0oZG90bmV0UmVmLCBvcHRpb25zKTtcclxuICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gaXRlbTtcclxuICAgICAgaW5zdGFuY2UuZWxlbWVudHMuc2V0KGlkLCBuZXcgU2V0PEVsZW1lbnQ+KFtdKSk7XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZSB0aGUgdGFyZ2V0IG5vZGUgdXNpbmcgYSBuZXcgb3IgZXhpc3Rpbmcgb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7SURvdE5ldE9iamVjdFJlZn0gZG90bmV0UmVmIC0gVGhlIGRvdG5ldCBpbnRlcm9wIHJlZmVyZW5jZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIGluc3RhbmNlIGlkIG9mIHRoZSBcIm9ic2VydmVyXCJcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZSAtIFRoZSBub2RlIHRvIG9ic2VydmVcclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0fSBvcHRpb25zIC0gVGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbnN0YW5jZX0gLSBUaGUgb2JzZXJ2ZXIgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmUoZG90bmV0UmVmOiBJRG90TmV0T2JqZWN0UmVmLCBpZDogc3RyaW5nLCBub2RlOiBFbGVtZW50LCBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpIHtcclxuICAgICAgICBjb25zdCB7IGluc3RhbmNlIH0gPSBnZXRPYnNlcnZlckl0ZW0oZG90bmV0UmVmLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2ZUluc3RhbmNlRWxlbWVudChpbnN0YW5jZSwgaWQsIG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZSBhbiBlbGVtZW50IGZvciB0aGUgb2JzZXJ2ZXIgaW5zdGFuY2UuXHJcbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgb2JzZXJ2ZXIgaWRcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gb2JzZXJ2ZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnQoaWQ6IHN0cmluZywgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IG9ic2VydmVySW5zdGFuY2VzLnZhbHVlcygpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIG9ic2VydmVycykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGluc3RhbmNlLmVsZW1lbnRzLmdldChpZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHMgIT0gbnVsbCAmJiAhZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5vYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYWRkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgb2JzZXJ2ZXIgaW5zdGFuY2UgYW5kXHJcbiAgICAgKiB1bm9ic2VydmUgdGhlIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgb2JzZXJ2ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBub2RlIHRvIHVub2JzZXJ2ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgZWxlbWVudCBoYXMgYmVlbiB1bm9ic2VydmVkXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1bm9ic2VydmUoaWQ6IHN0cmluZywgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IG9ic2VydmVySW5zdGFuY2VzLnZhbHVlcygpO1xyXG4gICAgICAgIGxldCByZW1vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2Ygb2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gaW5zdGFuY2UuZWxlbWVudHMuZ2V0KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50cyAhPSBudWxsICYmIGVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uub2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgdGhlIGVsZW1lbnRzIGZyb20gdGhlIG9ic2VydmVyIGluc3RhbmNlIFxyXG4gICAgICogYW5kIHRyaWdnZXIgY2xlYW5pbmcgdXAgdGhlIG9ic2VydmVycy5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBvYnNlcnZlciBpbnN0YW5jZSBpZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgZWxlbWVudHMgaGF2ZVxyXG4gICAgICogYmVlbiByZW1vdmVkIGZyb20gdGhlIG9ic2VydmVyIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBkaXNjb25uZWN0KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBvYnNlcnZlckluc3RhbmNlcy5lbnRyaWVzKCk7XHJcbiAgICAgICAgbGV0IGRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IFtpbnN0YW5jZUlkLCBpbnN0YW5jZV0gb2Ygb2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5lbGVtZW50cy5nZXQoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICAgICAgY2xlYW51cE9ic2VydmVyKGluc3RhbmNlSWQsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRpc2Nvbm5lY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZXJlIGFyZSBubyBlbGVtZW50cyBpbiB0aGUgb2JzZXJ2ZXJcclxuICAgICAqIGluc3RhbmNlLCBkaXNjb25uZWN0IHRoZSBvYnNlcnZlciBhbmQgcmVtb3ZlXHJcbiAgICAgKiBpdCBmcm9tIHRoZSBvYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5zdGFuY2VJZCAtIFRoZSBvYnNlcnZlciBpbnN0YW5jZSBpZFxyXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlfSBpbnN0YW5jZSAtIFRoZSBpbnN0YW5jZSB0byByZW1vdmVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAtIFdoZXRoZXIgdGhlIGluc3RhbmNlIGhhcyBiZWVuIHJlbW92ZWRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2xlYW51cE9ic2VydmVyKGluc3RhbmNlSWQ6IHN0cmluZywgaW5zdGFuY2U6IEludGVyc2VjdGlvbk9ic2VydmVySW5zdGFuY2UpIHtcclxuICAgICAgICBsZXQgaW5zdGFuY2VSZW1vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChpbnN0YW5jZS5lbGVtZW50cy5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJJbnN0YW5jZXMuZGVsZXRlKGluc3RhbmNlSWQpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZVJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlUmVtb3ZlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gYW5cclxuICAgICAqIGVsZW1lbnQgaGFzIGFuIGludGVyc2VjdGlvbiB1cGRhdGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JzZXJ2ZXJJbnN0YW5jZUlkIC0gVGhlIGluc3RhbmNlIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7T25JbnRlcnNlY3Rpb25VcGRhdGVGbn0gLSBUaGUgZnVuY3Rpb24gdHJpZ2dlcmVkIGJ5IGFuIGludGVyc2VjdGlvbiB1cGRhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gb25FbnRyeUNoYW5nZShvYnNlcnZlckluc3RhbmNlSWQ6IHN0cmluZyk6IE9uSW50ZXJzZWN0aW9uVXBkYXRlRm4ge1xyXG4gICAgICAgIHJldHVybiAoZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb2JzZXJ2ZXJJbnN0YW5jZXMuaGFzKG9ic2VydmVySW5zdGFuY2VJZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBkb3RuZXRSZWYsIGVsZW1lbnRzIH0gPSBvYnNlcnZlckluc3RhbmNlcy5nZXQob2JzZXJ2ZXJJbnN0YW5jZUlkKSBhcyBJbnRlcnNlY3Rpb25PYnNlcnZlckluc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJFbnRyaWVzID0gZW50cmllcy5yZWR1Y2UoKGJhdGNoZWQsIGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtpZCwgaXRlbV0gb2YgZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXMoZW50cnkudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaGVkW2lkXSA9IChiYXRjaGVkW2lkXSB8fCBbXSkuY29uY2F0KGVudHJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmF0Y2hlZDtcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMob2JzZXJ2ZXJFbnRyaWVzKS5mb3JFYWNoKChvYnNlcnZlcklkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXRjaCA9IG9ic2VydmVyRW50cmllc1tvYnNlcnZlcklkXSBhcyBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W107XHJcbiAgICAgICAgICAgICAgICBkb3RuZXRSZWYuaW52b2tlTWV0aG9kQXN5bmMoXCJPbkNhbGxiYWNrXCIsIG9ic2VydmVySWQsIGJhdGNoLm1hcCh0b0VudHJ5T2JqZWN0KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgdGhlIG9ic2VydmVyIGVudHJ5IHRvIGFuIG9iamVjdCB0aGF0XHJcbiAgICAgKiB3aWxsIGJlIHBhcnNlZCB0byB0aGUgY2FsbGJhY2suXHJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnl9IGVudHJ5IC0gVGhlIG9ic2VydmVyIGVudHJ5XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRvRW50cnlPYmplY3QoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpIHtcclxuICAgICAgICBmdW5jdGlvbiB0b1JlY3RSZWFkT25seU9iamVjdChvYmo6IERPTVJlY3RSZWFkT25seSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgWDogb2JqLngsXHJcbiAgICAgICAgICAgICAgICBZOiBvYmoueSxcclxuICAgICAgICAgICAgICAgIFdpZHRoOiBvYmoud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBIZWlnaHQ6IG9iai5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBUb3A6IG9iai50b3AsXHJcbiAgICAgICAgICAgICAgICBMZWZ0OiBvYmoubGVmdCxcclxuICAgICAgICAgICAgICAgIEJvdHRvbTogb2JqLmJvdHRvbSxcclxuICAgICAgICAgICAgICAgIFJpZ2h0OiBvYmoucmlnaHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFRhcmdldDogZW50cnkudGFyZ2V0LFxyXG4gICAgICAgICAgICBJc0ludGVyc2VjdGluZzogZW50cnkuaXNJbnRlcnNlY3RpbmcsXHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvblJhdGlvOiBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyxcclxuICAgICAgICAgICAgVGltZTogZW50cnkudGltZSxcclxuICAgICAgICAgICAgQm91bmRpbmdDbGllbnRSZWN0OiB0b1JlY3RSZWFkT25seU9iamVjdChlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QgYXMgRE9NUmVjdFJlYWRPbmx5KSxcclxuICAgICAgICAgICAgSW50ZXJzZWN0aW9uUmVjdDogdG9SZWN0UmVhZE9ubHlPYmplY3QoZW50cnkuaW50ZXJzZWN0aW9uUmVjdCBhcyBET01SZWN0UmVhZE9ubHkpLFxyXG4gICAgICAgICAgICBSb290Qm91bmRzOiB0b1JlY3RSZWFkT25seU9iamVjdChlbnRyeS5yb290Qm91bmRzIGFzIERPTVJlY3RSZWFkT25seSlcclxuICAgICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB3aW5kb3dbXCJCbGF6b3JJbnRlcnNlY3Rpb25PYnNlcnZlckpTXCJdID0gQmxhem9ySW50ZXJzZWN0aW9uT2JzZXJ2ZXJKUztcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9