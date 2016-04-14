// profiles that act as fake backend

var PROFILES = [
    {
        name: 'Alissa',
        wage: 15,
        rating: 4,
        about: 'I love children!',
        ageRange: [2,3,4],
    },
    {
        name: 'Helen',
        wage: 20,
        rating: 4,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [0,1,2,3],
    },
    {
        name: 'Peter',
        wage: 5,
        rating: 3,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [3],
    },
    {
        name: 'Ray',
        wage: 15,
        rating: 4,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [0,1,2,3,4],
    },
    {
        name: 'Pippin',
        wage: 5,
        rating: 3,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [7,8,9,10],
    },
    {
        name: 'Stella',
        wage: 7,
        rating: 2,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [5,6,7,8],
    },
    {
        name: 'Amy',
        wage: 12,
        rating: 4,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ageRange: [5,6,7,8],
    },
];


// For ease of finding profiles. Names are all in lower case, currently only uses first names, requires that names are unique
var PROFILE_INDEX = {
    'alissa': 0,
    'helen':1,
    'peter':2,
    'ray':3,
    'pippin':4,
    'stella':5,
    'amy':6,
}