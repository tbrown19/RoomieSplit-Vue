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


    updateCurrentRowFootage: function (method, currentRow) {
        currentRow.footage = this.calculateFootage(method, currentRow);
    },

    updatePercentageTotal: function (currentRow, store) {
        currentRow.percentageTotal = this.calculatePercentageTotal(currentRow, store);
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
        //Map the footage of each room or 0(this is because we don't store empty values as 0 but rather as "") to an array
        const roomFootages = roomData.map(function (room) {
            return parseInt(room.footage) || 0;
        });

        //Sum each rooms footage in order to get the total footage of all the rooms.
        return roomFootages.reduce((totalFootage, currentRoom) => totalFootage + currentRoom);
    },

    calculatePayment: function () {

    },


    updateAll: function (method, currentRow, store) {
        this.updateCurrentRowFootage(method, currentRow);
        this.updatePercentageTotal(currentRow, store);
    }
};