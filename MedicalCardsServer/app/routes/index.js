const doctorRequestsRoutes = require('./doctorRequests_routes');
module.exports = function(app, db) {
  doctorRequestsRoutes(app, db);
}
