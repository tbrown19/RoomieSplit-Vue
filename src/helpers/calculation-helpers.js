module.exports = {
    calculateFromMeasurements: function (currentRow) {
        console.log(currentRow)
        let lengthFeet = currentRow.length.feet;
        let lengthInches = currentRow.length.inches;
        let totalLength = lengthFeet + (lengthInches / 12);
        console.log(totalLength)
        let widthFeet = currentRow.width.feet;
        let widthInches = currentRow.width.inches;
        let totalWidth = widthFeet + (widthInches / 12);

        return totalLength * totalWidth;

    },

    calculateFootage: function (method, currentRow) {
        if (method === 'measurements') {
            return this.calculateFromMeasurements(currentRow);
        }
        return currentRow.footage;
    },

    calculatePercentageTotal: function (currentRow, store) {
        const totalFootage = store.state.housingInformation.footage.value;

        return currentRow.footage / totalFootage * 100;
    },

    calculateCommonSpace: function (roomData, store) {
        const totalRoomsFootage = this.calculateTotalRoomsFootage(roomData);
        const totalFootage = store.state.housingInformation.footage.value;

        return totalFootage - totalRoomsFootage;
    },

    calculateTotalRoomsFootage: function (roomData) {
        return this.sumValueOfRoomData(roomData, 'footage');
    },

    calculateTotalOccupants: function (roomData) {
        return this.sumValueOfRoomData(roomData, 'occupants');
    },

    sumValueOfRoomData: function (roomData, valueToSum) {
        let valuesToSum = roomData.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        console.log(valuesToSum);
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    },


    calculatePayment: function () {

    },

    updateCurrentRowFootage: function (method, currentRow) {
        currentRow.footage = this.calculateFootage(method, currentRow);
    },

    updatePercentageTotal: function (currentRow, store) {
        currentRow.percentageTotal = this.calculatePercentageTotal(currentRow, store);
    },

    updateAllValuesInRow: function (method, currentRow, store) {
        this.updateCurrentRowFootage(method, currentRow);
        this.updatePercentageTotal(currentRow, store);
    },

    updateAllRows: function (roomData){
        console.log(this.calculateTotalRoomsFootage(roomData))
    }



};