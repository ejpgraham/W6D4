const DOMNodeCollection = require("./dom_node_collection.js");
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
