/**
 * @param {('left'|'right')} posX - Pos from top
 * @param {('top'|'bottom')} posY - Pos from right
 * @param {number} margin - margin between elements
 * @param {boolean} autoHide - is auto close after timeout
 * @param {number} timeOut - timeout for auto close
 * @param {string} namespace - name space element
 */
export const optionsDefault = {
  posY: `top`,
  posX: `right`,
  margin: 5,
  autoHide: false,
  timeOut: 1000,
  namespace: "mf"
};
