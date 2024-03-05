import ResizeObserver from 'resize-observer-polyfill';

/**
 * this is needed for testing Todo should disabled the checkbox on checked
 */
global.ResizeObserver = ResizeObserver;