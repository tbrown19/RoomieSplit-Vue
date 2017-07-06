module.exports = {
   createEmptyRoomInputs: function(rooms) {
            let roomData = [];
            for (let i = 1; i <= rooms; i++) {
                roomData.push({
                    room: i,
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
                    percentageTotal: 0,
                    payment: 0
                });
            }
            return roomData;
        },
};