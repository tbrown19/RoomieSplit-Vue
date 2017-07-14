export function namedInputsWithoutValue() {
    const inputs = {
        'numRooms': {
            'name': 'rooms',
            'min': 1,
            'max': 10,
            'tooltip': 'The total number of rooms.'
        },
        'area': {
            'name': 'area',
            'min': 1,
            'max': 10000,
            'tooltip': 'The total area of the entire living space.'
        },
        'rent': {
            'name': 'rent',
            'min': 1,
            'max': 100000,
            'tooltip': 'The cost of rent.'
        }
    };

    return inputs;
}
