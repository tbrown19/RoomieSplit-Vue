module.exports = {
  validateInput: function (currentValue, minValue, maxValue, resetValForMin) {
      let newValue = currentValue;
      // do a thing, possibly async, then…
      if (currentValue > maxValue) {
        newValue = maxValue;
      } else if (currentValue < minValue) {
        newValue = resetValForMin;
      }

      return newValue;
  }
};