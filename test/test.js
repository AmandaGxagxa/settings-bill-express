let assert = require('assert');
let BillSettingsUpdates = require('../bill-settings')
describe("The bill settings function", function() {
  it("should be able to give the cost of the call.", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.billSetting("call");
    assert.equal(billSettingsUpdates.calls(), 2.00);
  });


  it("should be able to return the updated call bill.", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.setCAllCost(2.00);

    assert.equal(2.00, billSettingsUpdates.getCallCost(), 2.00);

  });
  it("should be able to return the updated sms amount.", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.setSmsCost(0.65);
    // textbill1.billTotal("data");
    assert.equal(billSettingsUpdates.getSMSCost(), 0.65);

  });
  it("should be able to count until  WARNING level number 10.", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.setWarning(10);
    assert.equal(billSettingsUpdates.warning(), 10);

  });
  it("should be able to count until CRITICAL level number 10.", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.setCritical(20);
    assert.equal(billSettingsUpdates.critical(), 20);

  });
  it("should be able to return number of the calls entered", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("sms");
    var date = new Date();
    assert.equal(billSettingsUpdates.filteredCost("call").length, 2);
  });
  it("should be able to return number of the smses entered", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("sms");
    var date = new Date();
    assert.equal(billSettingsUpdates.filteredCost("sms").length, 1);
  });
  it("should be able to return the value of the first type", function() {
    var billSettingsUpdates = BillSettingsUpdates();
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("call");
    billSettingsUpdates.stamps("sms");
    var date = new Date();
    assert.equal(billSettingsUpdates.filteredCost("call")[0].type, 'call');
  });


})
