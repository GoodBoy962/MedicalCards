/**
 * Promisify callback function
 * @param {Function} action
 * @return {Function}
 */
export const promisify =
  (action) =>
    (...args) =>
      new Promise((resolve, reject) => action.call(null, ...args, (error, ...other) => {
        if (error) {
          reject(error);
        } else {
          resolve(...other);
        }
      }));

/**
 * Returns a curried equivalent of the provided function
 * @param {Function} func
 * @param {...any} params
 * @return {Function}
 */
export const curry =
  (func, ...params) =>
    (...args) =>
      func.apply(null, [...params, ...args]);

/**
 * Return composed result
 * @param {...Function} functions
 */
export const compose =
  (...functions) =>
    (...args) =>
      functions
        .slice(1)
        .reduce(
          (x, f) => f(x),
          functions[0](...args)
        );

/**
 * Return composed result for "promisified" functions
 * @param {...Function} functions
 */
export const pcompose =
  (...functions) =>
    (...args) =>
      functions
        .slice(1)
        .reduce(
          async (x, f) => f(await x),
          functions[0](...args)
        );

/**
 *
 * @param {*} object
 */
export const maybe =
  (object) =>
    (path, dvalue = x => x) =>
      object[path] || dvalue

/**
 * Return reducer
 * @param {Object} dstate  - Default state for reducer
 * @param {Object} actions - Action map
 */
export const ReducerFactory =
  (dstate, actions) =>
    (state = dstate, action = {}) =>
      maybe(actions)(action.type, x => x)(state, action);

/**
 * Immutable assign objects
 * @param {Object} object
 * @param {Objects} objects
 */
export const Assign =
  (object, ...objects) =>
    Object.assign({}, object, ...objects);