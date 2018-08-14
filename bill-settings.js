var moment = require('moment');

module.exports = function BillSettingsUpdates() {

    var callCost = 2.00;
    var smsCost = 1.00;
    var warningLevel = 6;
    var criticalLevel = 10;
    // create a variables that will keep track of all three totals.
    var callsTotals = 0;
    var smsesTotal = 0;
    var totalTwoSetting = 0;
    var stampMap = [];
    //modifiyers || setters
    function setCallCost(vale) {
      if (vale != "") {
        callCost = parseFloat(vale);
      }
    }

    function setCostSms(vale) {
      if (vale != "")
        smsCost = parseFloat(vale);
    }

    function setWarningLevel(vale) {
      warningLevel = parseFloat(vale)
    }

    function setCriticalLevel(vale) {
      criticalLevel = parseFloat(vale);
    }


    //accessers|| getters
    function getStampMap() {
      for (var i = 0; i < stampMap.length; i++) {
        var times = moment(stampMap[i].when).fromNow();
        stampMap[i].ago = times
      }
      return stampMap;
    }

    function getCostCall() {
      return callCost;
    }

    function getCostSms() {
      return smsCost;
    }

    function getWarningLevel() {
      return warningLevel;
    }

    function getCriticalLevel() {
      return criticalLevel;
    }

    function frOmNow(value) {
      var date = new Date();
      if (value === "call") {
        stampMap.unshift({
          type: value,
          price: getCallValue(),
          when: date
        })
      } else if (value === "sms") {
        stampMap.unshift({
          type: value,
          price: getSmsValue(),
          when: date
        })

      }

    }

    function filter(value) {
      var list = [];
      for (var i = 0; i < stampMap.length; i++) {
        if (stampMap[i].type === value) {
          list.push(stampMap[i])
        }

      }
      return list;
    }
      function billSettings(billItemTypeWithSettings) {

        if (totalTwoSetting >= criticalLevel) {

        } else {
          if (billItemTypeWithSettings === "call") {
            callsTotals += callCost
            console.log(callsTotals)
          } else if (billItemTypeWithSettings === "sms") {
            smsesTotal += smsCost;
          }
        }
        totalTwoSetting = smsesTotal + callsTotals;
      }

      function getCallValue() {
        return callsTotals.toFixed(2);
      }

      function getSmsValue() {
        return smsesTotal.toFixed(2);
      }

      function getTotal() {

        return totalTwoSetting.toFixed(2);
      }


      return {
        calls: getCallValue,
        smses: getSmsValue,
        allTotal: getTotal,
        setCritical: setCriticalLevel,
        setWarning: setWarningLevel,
        warning: getWarningLevel,
        critical: getCriticalLevel,
        billSetting: billSettings,
        setSmsCost: setCostSms,
        getSMSCost: getCostSms,
        setCAllCost: setCallCost,
        getCallCost: getCostCall,
        stamps: frOmNow,
        getStamp: getStampMap,
        filteredCost :filter

      }
    }

    // get a reference to the sms or call radio buttons
