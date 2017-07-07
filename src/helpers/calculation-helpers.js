module.exports = {
    calculateFromMeasurements: function(currentRow){
        let lengthFeet = currentRow.length.feet;
        let lengthInches = currentRow.length.inches;
        let totalLength = lengthFeet + (lengthInches / 12);

        let widthFeet = currentRow.width.feet;
        let widthInches = currentRow.width.inches;
        let totalWidth = widthFeet + (widthInches / 12);

        return totalLength * totalWidth;
       
    },

    calculateFootage: function(method, currentRow){
        if(method === 'measurements'){
            return calculateFromMeasurements(currentRow);
        }
        return currentRow.footage;
    },

    calculatePercentageTotal: function(method, currentRow, store){
        let footage = this.calculateFootage(method, currentRow);
        
        currentRow.footage = parseFloat(footage).toFixed(2);

        let totalFootage = store.state.housingInformation.footage.value;

        let percentageTotal = currentRow.footage / totalFootage * 100;

        currentRow.percentageTotal = parseFloat(percentageTotal).toFixed(2);
    },


    


    calculatePayment: function(){

    }

};