// profiles that act as fake backend

var PROFILES = [
    {
        name: 'Alissa',
        index: 0,
        wage: 15,
        rating: 4,
        about: "Hello! I'm Alissa. I'm a freshman at MIT. I love hanging out with kids! \n I have 7 younger siblings at home so I think I'll be a good babysitter.",
        ageRange: [2,3,4],
        email: 'alissaHacker@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[],['11am','12pm','5pm','6pm']]
    },
    {
        name: 'Ben',
        index: 1,
        wage: 20,
        rating: 2,
        about: "Yo! I'm Ben. I'm a senior in course 6-1. I think I'm overqualified to be a babysitter TBH.",
        ageRange: [0,1,2,3],
        email: 'benBitdittle@mit.edu',
        references: "- Babysat for Prof. Helen 1 time",
        experiences: "- Babysat my girlfriend's brother",
        availability: [['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],[],[],[],['9am','10am','11am','12pm','1pm'],['11am','12pm','5pm','6pm']]
    },
    {
        name: 'Peter',
        index: 2,
        wage: 5,
        rating: 3,
        about: 'Hi! My name is Peter!',
        ageRange: [7, 8, 9],
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
        ageRange: [0,1,2,3,4],
        email: 'ray@mit.edu',
        references: "- Babysat for Prof. X 5 times.",
        experiences: "- CPR <br/>- Have 5 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['9am','10am','11am','12pm','1pm'],['3pm','4pm','5pm','6pm'],['9am','10am','11am','12pm','1pm'],['11am','12pm','5pm','6pm'],['11am','12pm','5pm','6pm'],[],['11am','12pm','5pm','6pm']]
    },
    {
        name: 'Pippin',
        wage: 5,
        rating: 3,
        about: "I'm a hobbit!",
        ageRange: [7,8,9,10],
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
        ageRange: [5,6,7,8],
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
        ageRange: [5,6,7,8],
        email: 'amy_lee@mit.edu',
        references: "- Babysat for Prof. Xavier 5 times",
        experiences: "- CPR <br/>- Have 7 younger siblings <br />- Mentored at summer camp <br>",
        availability: [['12pm','1pm'],['6pm'],['9am'],[],['9am','10am','11am'],[],['11am','12pm','3pm','4pm','5pm','6pm']]

    },
];


// For ease of finding profiles. Names are all in lower case, currently only uses first names, requires that names are unique
var PROFILE_INDEX = {
    'alissa': 0,
    'ben':1,
    'peter':2,
    'ray':3,
    'pippin':4,
    'stella':5,
    'amy':6,
}