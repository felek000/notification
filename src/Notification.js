/**
 * @file all color and setings are in _settings.scss
 * @author prfi
 */
import "./notification.scss";
import { optionsDefault } from "./notificationSettings";
/**
 * @description show notification toast in browser
 */
class Noti {
  body;
  posY;
  posX;
  margin;
  autoHide;
  timeOut;
  namespace;
  /**
   * @type optionsDefault
   * @type {object}
   * @property {{posX:('left'|'right')}} - pos from top
   * @property {{posY:('top'|'bottom')}} - pos from right
   * @property {{margin:number}} - margin between elements
   * @property {{autoHide:boolean}} - is auto close after timeout
   * @property {{timeOut:number}} - timeout for auto close
   * @property {{namespace:string}}  - name space element
   */
  /**
   * @type {optionsDefault}
   */
  constructor(optionsInc) {
    const options = { ...optionsDefault, ...optionsInc };
    if (
      typeof options.posX != "string" ||
      typeof options.posY != "string" ||
      typeof options.margin != "number" ||
      typeof options.autoHide != "boolean" ||
      typeof options.timeOut != "number"
    ) {
      throw new Error(
        `posTop and posRight must be string margin must be type number autoHide bool`
      );
    }
    this.posX = options.posX;
    this.posY = options.posY;
    this.margin = options.margin;
    this.autoHide = options.autoHide;
    this.timeOut = options.timeOut;
    this.namespace = options.namespace;
    this.body = document.querySelector("body");
  }

  /**
   * @description Shows notification on document and assign events and position
   * @param {String} messageText
   * @param {('success' | 'error' | 'warning' )}  messageType
   */
  showNotification(messageText = `Test`, messageType = `success`) {
    if (typeof messageText != "string" || typeof messageType != "string") {
      throw new Error(`Message text and message type must be string`);
    }

    const el = this._createElement(messageText, messageType);
    this.body.appendChild(el);
    this._applyEventListeners(el);
    this._setPosOnDocument();
    this._applyAutoHide(el);
  }

  /**
   *
   * @param {String} messageText
   * @param {String} messageType
   * @returns {HTMLElement}
   * @private
   */
  _createElement(messageText, messageType) {
    const el = document.createElement(`${this.namespace}-notification`);
    el.classList.add(`js-notification`);
    el.classList.add(`notification`);
    el.classList.add(`notification--${messageType}`);
    el.style[this.posY] = `0px`;
    el.style[this.posX] = `0px`;
    el.innerHTML = `<p class="notification-text">${messageText}</p>
                    <button class="notification-button js-removeNoti">x</button>`;
    return el;
  }

  /**
   * @description apply event Listeners
   * @param {HTMLElement} el
   * @private
   */
  _applyEventListeners(el) {
    el.querySelector(".js-removeNoti").addEventListener("click", () => {
      this._removeNoti(el);
    });
  }

  /**
   * @description enable remove element from DOM after timeout
   * @param {HTMLElement} el
   * @private
   */
  _applyAutoHide(el) {
    if (this.autoHide) {
      setTimeout(() => {
        this._removeNoti(el);
      }, this.timeOut);
    }
  }

  /**
   * @description removes element from dom
   * @param {Node} noti - dom element to be remove
   * @private
   */
  _removeNoti(noti) {
    this.body.removeChild(noti);
    this._setPosOnDocument();
  }

  /**
   * @description update element position in DOM
   * @private
   */
  _setPosOnDocument() {
    const notification = this.body.querySelectorAll(".js-notification");
    const notificationArray = Array.from(notification).reverse();
    let heightElements = 0;
    if (notificationArray.length > 0) {
      notificationArray.forEach((el, index) => {
        heightElements += el.getBoundingClientRect().height + this.margin;
        if (notificationArray[index + 1]) {
          notificationArray[index + 1].style.transform = `translateY(${
            this.posY !== "bottom" ? "" : "-"
          }${heightElements}px)`;
        }
      });
      notificationArray[0].style.transform = `translateY(0px)`;
    }
  }
}
export default Noti;
