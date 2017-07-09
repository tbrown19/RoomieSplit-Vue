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

    calculateCommonSpacePercentage: function (roomData, store) {
        const totalFootage = store.state.housingInformation.footage.value;
        const commonSpaceFootage = this.calculateCommonSpace(roomData, store);

        return (commonSpaceFootage / totalFootage) * 100;
    },


    calculatePrivateSpacePercentage: function (roomData, store) {
        const commonSpacePercentage = this.calculateCommonSpacePercentage(roomData, store);
        return 100 - commonSpacePercentage;
    },


    calculateTotalRoomsFootage: function (roomData) {
        return this.sumValueOfRoomData(roomData, 'footage');
    },

    calculateTotalOccupants: function (roomData) {
        return this.sumValueOfRoomData(roomData, 'occupants');
    },

    calculateValueCommonSpace: function (roomData, store) {
        const commonSpacePercentage = this.calculateCommonSpacePercentage(roomData, store);
        const rent = store.state.housingInformation.rent.value;

        //Divide by 100 to get commonSpacePercentage in percentage form
        return rent * (commonSpacePercentage / 100);
    },

    calculateValuePrivateSpace: function (roomData, store) {
        const commonSpaceValue = this.calculateValueCommonSpace(roomData, store);
        const rent = store.state.housingInformation.rent.value;

        return rent - commonSpaceValue;
    },


    calculateBasePayment: function (roomData, roomCalculations) {
        const numberOccupants = this.sumValueOfRoomData(roomData, "occupants");
        console.log(roomCalculations);
        return roomCalculations.commonSpaceValue / numberOccupants;
    },

    calculateOccupantsPercentageOfPrivateSpace: function (roomData, currentRow, roomCalculations, store) {
        console.log(roomData)
        const totalPrivateSpace = this.calculateTotalRoomsFootage(roomData, store)
        console.log("private space" + totalPrivateSpace);
        console.log(currentRow);
        return currentRow.footage / totalPrivateSpace;
    },

    calculatePayment: function () {

    },

    updateCurrentRowFootage: function (method, currentRow) {
        currentRow.footage = this.calculateFootage(method, currentRow);
    },

    updatePercentageTotal: function (currentRow, store) {
        currentRow.percentageTotal = this.calculatePercentageTotal(currentRow, store);
    },

    updateFootageValuesInRow: function (method, currentRow, store) {
        this.updateCurrentRowFootage(method, currentRow);
        this.updatePercentageTotal(currentRow, store);
    },

    updatePaymentValueInRow: function (currentRow, roomData, roomCalculations, store) {
        console.log("calculating payment value derp derp");
        
        const basePayment = this.calculateBasePayment(roomData, roomCalculations);
        console.log("Base payment: " + basePayment)
        
        const occupantsPercentage = this.calculateOccupantsPercentageOfPrivateSpace(roomData,currentRow, roomCalculations, store);
        console.log("occs percentage: " + occupantsPercentage);
        
        const eachOccupantsPercentage = occupantsPercentage / currentRow.occupants;
        console.log("each occupants percentage: " + eachOccupantsPercentage);
        
        console.log("private space value: "  + roomCalculations.privateSpaceValue)
        const eachOccupantsPrivatePayment = roomCalculations.privateSpaceValue * eachOccupantsPercentage;
        console.log("each occupants private payment: " + eachOccupantsPrivatePayment);

        const eachOccupantsTotalPayment = basePayment + eachOccupantsPrivatePayment;
        console.log("total payment per occupant in this room "  + eachOccupantsTotalPayment)

        currentRow.payment = eachOccupantsTotalPayment;

    },

    updateAllValuesInRow: function (method, currentRow, store) {
        this.updateFootageValuesInRow(method, currentRow, store);
        this.updatePaymentValueInRow();
    },

    calculateRoomsInformation: function (roomData, store) {
        //functions related to updating the values based off square footage.
        return {
            "privateSpaceValue": this.calculateValuePrivateSpace(roomData, store),
            "commonSpaceValue": this.calculateValueCommonSpace(roomData, store),
            "privateSpacePercentage": this.calculatePrivateSpacePercentage(roomData, store),
            "commonSpacePercentage":  this.calculateCommonSpacePercentage(roomData, store),
        }

    },

    sumValueOfRoomData: function (roomData, valueToSum) {
        let valuesToSum = roomData.map(function (room) {
            return parseFloat(room[valueToSum]) || 0;
        });
        console.log(valuesToSum);
        return valuesToSum.reduce((total, currentValue) => total + currentValue);
    },
};