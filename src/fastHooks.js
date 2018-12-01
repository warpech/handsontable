const noopThatReturns = function(x) {
  return x;
};

const noop = Function.prototype;

function FastHooks() { }

/**
 * Fired when a column index is about to be modified by a callback function.
 *
 * @event Hooks#modifyCol
 * @param {Number} column Visual column index.
 */
FastHooks.prototype.modifyCol = noopThatReturns;

/**
 * Fired when a row index is about to be modified by a callback function.
 *
 * @event Hooks#modifyRow
 * @param {Number} row Visual row index.
 */
FastHooks.prototype.modifyRow = noopThatReturns;

/**
 * Fired after getting the cell settings.
 *
 * @event Hooks#afterGetCellMeta
 * @param {Number} row Visual row index.
 * @param {Number} column Visual column index.
 * @param {Object} cellProperties Object containing the cell properties.
 */
FastHooks.prototype.afterGetCellMeta = noop;

/**
 * Fired before getting cell settings.
 *
 * @event Hooks#beforeGetCellMeta
 * @param {Number} row Visual row index.
 * @param {Number} column Visual column index.
 * @param {Object} cellProperties Object containing the cell's properties.
 */
FastHooks.prototype.beforeGetCellMeta = noop;

/**
 * Fired when a column width is about to be modified by a callback function.
 *
 * @event Hooks#modifyColWidth
 * @param {Number} width Current column width.
 * @param {Number} column Visual column index.
 */
FastHooks.prototype.modifyColWidth = noopThatReturns;

/**
 * Fired when a row height is about to be modified by a callback function.
 *
 * @event Hooks#modifyRowHeight
 * @param {Number} height Row height.
 * @param {Number} row Visual row index.
 */
FastHooks.prototype.modifyRowHeight = noopThatReturns;

/**
 * Fired when a data was retrieved or modified.
 *
 * @event Hooks#modifyRowData
 * @param {Number} row Physical row index.
 */
FastHooks.prototype.modifyRowData = noopThatReturns;

/**
 * Fired when a column header index is about to be modified by a callback function.
 *
 * @event Hooks#modifyColHeader
 * @param {Number} column Visual column header index.
 */
FastHooks.prototype.modifyColHeader = noopThatReturns;

FastHooks.prototype.after = function(fn1, fn2) {
  if (this.isNoop(fn1)) {
    return fn2;
  }

  return function(p1, p2, p3, p4, p5, p6) {
    return fn2(fn1(p1, p2, p3, p4, p5, p6), p2, p3, p4, p5, p6);
  };
};

FastHooks.prototype.isNoop = function(fn) {
  return fn === noop || fn === noopThatReturns;
};

export default FastHooks;
