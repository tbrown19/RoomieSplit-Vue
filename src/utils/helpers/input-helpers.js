  export function validateInput(currentValue, minValue, maxValue, resetValForMin) {
      console.log(currentValue, minValue);
      let newValue = currentValue;
      if (currentValue > maxValue) {
          newValue = maxValue;
      } else if (currentValue < minValue) {
          newValue = resetValForMin;
      }
      return newValue;
  }
