var express = require('express');
const exphbs = require('express-handlebars');
const BillSettingsUpdates = require('./bill-settings');
const bodyParser = require('body-parser')

const app = express();
//allows us to use bodyParser
app.use(bodyParser());
//it corvert data to be  usable
app.use(bodyParser.json());
//instance of my Factory functiion
const billS = BillSettingsUpdates();
//allows to use css && js file
app.use(express.static("public"));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// requiring moment.js to be used

//calling the setters

app.get('/', function(req, res) {
  let call = billS.getCallCost();
  let sms = billS.getSMSCost();
  let warning = billS.warning();
  let critical = billS.critical();
  //to get my call value, sms value &total value
  let callsTotal = billS.calls();
  let smsTotal = billS.smses();
  let grandTotal = billS.allTotal();
  let color;
  //adding color for the critical and warning level
  if (grandTotal >= critical) {
    color = "danger";
  }
  else if (grandTotal >= warning) {
    color = "warning";
  }
// rendering all my functioning to home page
  res.render('home', {
    color,
    callsTotal,
    smsTotal,
    grandTotal,
    call,
    sms,
    warning,
    critical
  });;
});

//calling the getters to get the values
app.post('/settings', function(req, res) {
  //allowing it to take numbers by parseFloat
  let call = parseFloat(req.body.callCost);
  let sms = parseFloat(req.body.smsCost);
  let warning = parseFloat(req.body.warningLevel);
  let critical = parseFloat(req.body.criticalLevel);
  console.log(call);
  console.log(sms);
  billS.setCAllCost(call);
  billS.setSmsCost(sms);
  billS.setWarning(warning);
  billS.setCritical(critical);
  //redirecting straight to the porter
  res.redirect('/')

})
app.post('/action', function(req, res) {
  let action = req.body.actionType;
  billS.billSetting(action);
  billS.stamps(action)
  // console.log(action);
  res.redirect('/');
})
app.get('/actions', function(req,res) {

res.render('actions', {getStamps: billS.getStamp()});
})
app.get('/actions/:type', function (req,res) {
  let inputs = req.params.type;
  billS.getStamp();
  res.render('actions',{getStamps:billS.filteredCost(inputs)})
})

let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
