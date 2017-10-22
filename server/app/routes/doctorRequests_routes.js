module.exports = function(app, db) {

  const doctorRequests = db.collection('doctorRequests');

  app.get('/doctorRequests/doctor', (req, res) => {
    const doctorAddress = req.query.doctorAddress;
    const details = {
      'doctorAddress': doctorAddress
    };
    doctorRequests.find(details, (err, items) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(items);
      }
    });
  });

  app.get('/doctorRequests/patient', (req, res) => {
    const patientAddress = req.query.patientAddress;
    const details = {
      'patientAddress': patientAddress
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
    console.log('insert');
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
      'doctorAddress': doctorAddress,
      'patientAddress': patientAddress
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
