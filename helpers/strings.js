/**
 * Small string helpers — CUSTOMIZE or replace with a proper i18n/test-data layer.
 */

/**
 * @param {string} text
 * @returns {RegExp}
 */
function escapeRegExp(text) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

module.exports = { escapeRegExp };
