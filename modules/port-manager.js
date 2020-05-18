module.exports = (function() {
  /**
   * Constructor for PortManager
   *
   * @constructor
   *
   * @param expirationThreshold number the number of milliseconds for expiration threshold
   */
  function PortManager(expirationThreshold = 5000) {
    if (!(this instanceof PortManager)) {
      return new PortManager();
    }

    this.$expirationThreshold = expirationThreshold;
    this.$timerId = null;
    this.$port = null;
    this.$status = 'Inactive';
    this.$lastUpdated = null;
  }

  /**
   * Update the port
   *
   * @param string the port
   */
  PortManager.prototype.updatePort = function(port) {
    clearTimeout(this.$timerId);
    milliSecondsNow = Date.now();
    this.$timerId = setTimeout(
      () => {this.setExpired()},
      this.$expirationThreshold
    );

    this.$lastUpdated = Date(milliSecondsNow);
    this.$status = 'Active';
    this.$port = port;
  }

  /**
   * Get the port
   *
   * @return string the port
   */
  PortManager.prototype.getPort = function() {
    return this.$port;
  }

  /**
   * Get the the time of last update
   *
   * @return Date the date object of last update
   */
  PortManager.prototype.getLastUpdated = function() {
    return this.$lastUpdated;
  }

  /**
   * Get the status of the port
   *
   * @return string the status of the port, whether it's 'Active' or 'Inactive'
   */
  PortManager.prototype.getStatus = function() {
    return this.$status;
  }

  /**
   * Get the expiration threshold
   *
   * @return number the expiration threshold in milliseconds
   */
  PortManager.prototype.getExpirationThreshold = function() {
    return this.$expirationThreshold;
  }

  /**
   * Sets the expiration threshold
   *
   * @param expirationThreshold number the number of milliseconds for expiration threshold
   */
  PortManager.prototype.setExpirationThreshold = function(expirationThreshold) {
    this.$expirationThreshold = expirationThreshold;
  }

  /**
   * Sets the current port status to 'Inactive'
   */
  PortManager.prototype.setExpired = function() {
    this.$status = 'Inactive'
  }

  return PortManager;
})();
