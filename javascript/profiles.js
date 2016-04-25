// profiles that act as fake backend

var AGE_RANGE_CONVERSION = {
    infant: [0],
    toddler: [1,2],
    preschooler: [3, 4],
    'lower-elementary': [5, 6, 7],
    'higher-elementary': [8, 9, 10],
    'lower-middle': [11, 12],
    'higher-middle': [13, 14]

};

var AGE_RANGES = {
    infant: {index: 0,
        text: "infants"
    },
    toddler:{index: 1,
        text: "toddlers"
    },
    preschooler: {index: 2,
        text: "preschoolers"
    },
    'lower-elementary': {index: 3,
        text: "younger elementary school kids"
    },
    'higher-elementary': {index: 4,
        text: "older elementary school kids",
    },
    'lower-middle': {index: 5,
        text: "younger middle school kids",
    },
    'higher-middle': {index: 6,
        text: "older high school kids",
    },

}

var PROFILES = [
    {
        name: 'Alissa',
        index: 0,
        wage: 15,
        rating: 4,
        about: "Hello! I'm Alissa. I'm a freshman at MIT. I love hanging out with kids! \n I have 7 younger siblings at home so I think I'll be a good babysitter.",
        ageRange: [AGE_RANGES["lower-elementary"], AGE_RANGES["higher-elementary"]],//[6, 7, 8, 9, 10],
        email: 'alissaHacker@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['9am','10am','11am','12pm','1pm'], ['11am','12pm','5pm','6pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[]]
    },
    {
        name: 'Ben',
        index: 1,
        wage: 20,
        rating: 2,
        about: "Yo! I'm Ben. I'm a senior in course 6-1. I think I'm overqualified to be a babysitter TBH.",
        ageRange: [AGE_RANGES["toddler"],AGE_RANGES["lower-elementary"]], //[2, 3, 4, 5, 6, 7],
        email: 'benBitdittle@mit.edu',
        references: "- Babysat for Prof. Helen 1 time",
        experiences: "- Babysat my girlfriend's brother",
        availability: [['11am','12pm','5pm','6pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[],['9am','10am','11am','12pm','1pm']]
    },
    {
        name: 'Peter',
        index: 2,
        wage: 5,
        rating: 3,
        about: 'Hi! My name is Peter!',
        ageRange: [AGE_RANGES["lower-elementary"]],//[7, 8, 9],
        email: 'peterParker@mit.edu',
        references: "- Babysat for Prof. X 5 times.",
        experiences: "- CPR <br/>- Have 5 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],['11am','12pm','5pm','6pm']]
    },
    {
        name: 'Ray',
        index: 3,
        wage: 15,
        rating: 4,
        about: "Hello! My name is Ray",
        ageRange: [AGE_RANGES["infant"],AGE_RANGES["toddler"],AGE_RANGES["lower-elementary"],AGE_RANGES["higher-elementary"]],//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        email: 'ray@mit.edu',
        references: "- Babysat for Prof. X 5 times.",
        experiences: "- CPR <br/>- Have 5 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['11am','12pm','5pm','6pm'], ['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],['11am','12pm','5pm','6pm'],['11am','12pm','5pm','6pm'],[]]
    },
    {
        name: 'Pippin',
        wage: 5,
        rating: 3,
        about: "I'm a hobbit!",
        ageRange: [AGE_RANGES["higher-elementary"], AGE_RANGES["lower-middle"]],// [7, 8, 9, 10],
        email: 'pippin1996@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [[],['3pm','4pm','5pm','6pm'],['12pm','1pm'],[],[],[],['11am','12pm','5pm','6pm']]

    },
    {
        name: 'Stella',
        wage: 7,
        rating: 2,
        about: 'I am star stuff',
        ageRange: [AGE_RANGES["lower-elementary"]],// [5, 6, 7, 8],
        email: 'stellaR@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],['9am','10am','11am','12pm'],[],['11am','12pm','5pm','6pm']]

    },
    {
        name: 'Amy',
        wage: 12,
        rating: 4,
        about: "I'm great with children!",
        ageRange: [AGE_RANGES["lower-middle"], AGE_RANGES["higher-middle"], ],// [5, 6, 7, 8],
        email: 'amy_lee@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['12pm','1pm'],['6pm'],['9am'],[],['9am','10am','11am'],[],['11am','12pm','3pm','4pm','5pm','6pm']]

    },
];


// For ease of finding profiles. Names are all in lower case, currently only uses first names, requires that names are unique
var PROFILE_INDEX = {
    'alissa': 0,
    'ben': 1,
    'peter': 2,
    'ray': 3,
    'pippin': 4,
    'stella': 5,
    'amy': 6,
}
