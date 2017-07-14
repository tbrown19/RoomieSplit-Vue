  export function validateInput(currentValue, minValue, maxValue, resetValForMin) {
      let newValue = currentValue;
      if (currentValue > maxValue) {
          newValue = maxValue;
      } else if (currentValue < minValue) {
          newValue = resetValForMin;
      }
      return newValue;
  }
