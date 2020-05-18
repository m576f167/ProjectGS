const PortManager = require('../modules/port-manager');

const portManager = new PortManager(
  process.env.PORT_EXPIRATION_THRESHOLD
);

/**
 * Update the port
 *
 * @param port string the port
 */
function updatePort(port) {
  portManager.updatePort(port);
}

/**
 * Get the port information
 *
 * @return Object JSON object contaning the port information
 */
function getPortInfo() {
  return {
    port: portManager.getPort(),
    status: portManager.getStatus(),
    lastUpdated: portManager.getLastUpdated()
  };
}

module.exports = {
  updatePort,
  getPortInfo
}
