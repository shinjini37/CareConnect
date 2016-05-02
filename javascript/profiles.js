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
        text: "Infants"
    },
    toddler:{index: 1,
        text: "Toddlers"
    },
    preschooler: {index: 2,
        text: "Preschoolers"
    },
    'lower-elementary': {index: 3,
        text: "Lower elementary school kids"
    },
    'higher-elementary': {index: 4,
        text: "Higher elementary school kids",
    },
    'lower-middle': {index: 5,
        text: "Lower middle school kids",
    },
    'higher-middle': {index: 6,
        text: "Higher middle school kids",
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
        availability: [['9am','10am','11am','12pm','1pm'], ['11am','12pm','5pm','6pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[]],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo:"images/alissa.jpg"
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
        availability: [['11am','12pm','5pm','6pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[],['9am','10am','11am','12pm','1pm']],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo: "images/ben.png"
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
        availability: [['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],['11am','12pm','5pm','6pm']],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo: "images/peter.gif"
    },
    {
        name: 'Rey',
        index: 3,
        wage: 15,
        rating: 4,
        about: "Hello! My name is Rey",
        ageRange: [AGE_RANGES["infant"],AGE_RANGES["toddler"],AGE_RANGES["lower-elementary"],AGE_RANGES["higher-elementary"]],//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        email: 'ray@mit.edu',
        references: "- Babysat for Prof. X 5 times.",
        experiences: "- CPR <br/>- Have 5 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['11am','12pm','5pm','6pm'], ['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],['11am','12pm','5pm','6pm'],['11am','12pm','5pm','6pm'],[]],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo:"images/rey.png"
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
        availability: [[],['3pm','4pm','5pm','6pm'],['12pm','1pm'],[],[],[],['11am','12pm','5pm','6pm']],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo:"images/pippin.jpg"
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
        availability: [['1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],['9am','10am','11am','12pm'],[],['11am','12pm','5pm','6pm']],
        reviews: [['Annalise', 'annak@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo:"images/stella.jpg"
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
        availability: [['12pm','1pm'],['6pm'],['9am'],[],['9am','10am','11am'],[],['11am','12pm','3pm','4pm','5pm','6pm']],
        reviews: [],
        photo:"images/amy.jpg"
    },
    {
        name: 'Rich',
        wage: 25,
        rating: 5,
        about: "Hello. My name is Rich. I have been working with children for the last 5 years at the Boston Children's Museum. I really like working with children, and they seem to feel very comfortable around me.",
        ageRange: [AGE_RANGES["infant"],AGE_RANGES["toddler"],AGE_RANGES["preschooler"],AGE_RANGES["lower-elementary"], AGE_RANGES["higher-elementary"], AGE_RANGES["lower-middle"], AGE_RANGES["higher-middle"], ],// [5, 6, 7, 8],
        email: 'rich@mit.edu',
        references: "Boston Children's Museum",
        experiences: "I have been working with children for the last 5 years at the Boston Children's Museum.",
        availability: [['12pm','1pm'],['6pm'],['9am'],[],['9am','10am','11am'],['7pm','8pm','9pm'],['11am','12pm','3pm','4pm','5pm','6pm']],
        reviews: [['Prii', 'prii@mit.edu', 5, 'Amazing babysitter. Highly reccommend.'], ['Nia', 'nia@mit.edu', 4, 'Really good job taking care of my kids, they really enjoyed it!'], ['Bonnie', 'bonniew@mit.edu', 4, 'Took good care of my kids.']],
        photo:"images/rich.jpg"
    },
    {
        name: 'Jaya',
        wage: 10,
        rating: 0,
        about: "I'm just starting out. I really like working with kids. Give me a shot!",
        ageRange: [AGE_RANGES["higher-elementary"], AGE_RANGES["lower-middle"], AGE_RANGES["higher-middle"], ],// [5, 6, 7, 8],
        email: 'jaya@mit.edu',
        references: "",
        experiences: "",
        availability: [['9am','10am','11am','3pm','4pm','5pm'],['9am','10am','11am','3pm','4pm','5pm','6pm'],['9am','10am','11am','3pm','4pm','5pm'],['9am','10am','11am','3pm','4pm','5pm'],['9am','10am','11am','3pm','4pm','5pm'],['9am','10am','11am','3pm','4pm','5pm'],['9am','10am','11am','12pm','3pm','4pm','5pm','6pm']],
        reviews: [],
        photo:"images/jaya.jpg"
    },
]


// For ease of finding profiles. Names are all in lower case, currently only uses first names, requires that names are unique
var PROFILE_INDEX = {
    'alissa': 0,
    'ben': 1,
    'peter': 2,
    'rey': 3,
    'pippin': 4,
    'stella': 5,
    'amy': 6,
    'rich':7,
    'jaya':8
}

// for autocomplete
var PROFILE_NAMES = [
    'Alissa',
    'Ben',
    'Peter',
    'Rey',
    'Pippin',
    'Stella',
    'Amy',
    'Rich',
    'Jaya'
];
