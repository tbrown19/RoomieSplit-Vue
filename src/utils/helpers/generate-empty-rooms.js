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
            footage: '',

            occupants: 0,

            percentOfTotalSpace: 0,

            percentOfPrivateSpace: 0,

            eachOccupantsPercentOfPrivateSpace: 0,

            privatePayment: 0,

            payment: 0
        });
    }
    return roomData;
}
