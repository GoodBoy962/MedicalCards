module.exports = function(app, db) {

  const doctorRequests = db.collection('doctorRequests');

  function parseAddress(address) {
    return new RegExp(["^", address, "$"].join(""), "i")
  }

  app.get('/doctorRequests', (req, res) => {
    const doctorAddress = req.query.doctorAddress;
    const patientAddress = req.query.patientAddress;
    const details = {
      'patientAddress': parseAddress(patientAddress),
      'doctorAddress': parseAddress(doctorAddress)
    };
    doctorRequests.findOne(details, (err, request) => {
      if (err) {
        res.send({
          'error': 'An error has occured'
        });
      } else {
        res.send(request);
      }
    });
  });

  app.get('/doctorRequests/doctor', (req, res) => {
    const doctorAddress = req.query.doctorAddress;
    const details = {
      'doctorAddress': parseAddress(doctorAddress)
    };
    doctorRequests.find(details).toArray((err, requests) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(requests);
      }
    });
  });

  app.get('/doctorRequests/patient', (req, res) => {
    const patientAddress = req.query.patientAddress;
    const details = {
      'patientAddress': parseAddress(patientAddress)
    };
    doctorRequests.find(details).toArray((err, requests) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(requests);
      }
    });
  });

  app.post('/doctorRequests', (req, res) => {
    doctorRequests.insert(req.body, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(result);
      }
    });
  });

  app.delete('/doctorRequests', (req, res) => {
    const doctorAddress = req.query.doctorAddress;
    const patientAddress = req.query.patientAddress;
    const details = {
      'doctorAddress': parseAddress(doctorAddress),
      'patientAddress': parseAddress(patientAddress)
    }
    doctorRequests.remove(details, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occured'
        });
      } else {
        res.send('deleted')
      }
    });
  });

};
