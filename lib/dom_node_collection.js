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
