// Polyfill from MDN: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
function CustomEvent(event, params) { // jshint ignore:line
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

export default function setupCustomEventPolyfill() {
  if (!window.CustomEvent) {

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  }
}
