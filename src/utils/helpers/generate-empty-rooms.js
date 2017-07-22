export function createEmptyRooms(numRooms) {
    let roomData = [];
    for (let i = 1; i <= numRooms; i++) {
        roomData.push({
            roomNumber: i,

            length: {
                feet: '',
                inches: ''
            },

            width: {
                feet: '',
                inches: ''
            },

            area: '',

            occupants: 1,

            percentOfTotalSpace: 0,

            percentOfPrivateSpace: 0,

            eachOccupantsPercentOfPrivateSpace: 0,

            privatePayment: 0,

            payment: 0,

            positiveValue: 0,

            positiveValues: '',

            negativeValue: 0,

            negativeValues: '',

            note: ''
        });
    }
    return roomData;
}
