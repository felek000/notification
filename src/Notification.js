/**
 * @file all color and setings are in _settings.scss
 * @author prfi
 */
import "./notification.scss";
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

  /**
   * @constructor
   * @param {('left'|'right')} posX - Pos from top as number
   * @param {('top'|'bottom')} posY - Pos from right as number
   * @param {number} margin - margin between elements
   * @param {boolean} autoHide - margin between elements
   * @param {number} timeOut - margin between elements
   */
  constructor(
    posY = `top`,
    posX = `right`,
    margin = 5,
    autoHide = false,
    timeOut = 1000
  ) {
    if (
      typeof posX != "string" ||
      typeof posY != "string" ||
      typeof margin != "number" ||
      typeof autoHide != "boolean" ||
      typeof timeOut != "number"
    ) {
      throw new Error(
        `posTop and posRight must be string margin must be type number autoHide bool`
      );
    }
    this.posX = posX;
    this.posY = posY;
    this.margin = margin;
    this.autoHide = autoHide;
    this.timeOut = timeOut;
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
    const el = document.createElement("mf-notification");
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
