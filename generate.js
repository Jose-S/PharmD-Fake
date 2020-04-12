// var usersRoute = require("./users.json");

module.exports = function () {
  var faker = require("faker");
  faker.seed(123);
  var _ = require("lodash");
  var statuses = ["enrolled", "leave", "dropback", "coop", "graduated"];

  return {
    students: _.times(100, function (n) {
      var currentCourse = generateCourses(4);
      return {
        id: n + 1,
        neu_id: _.random(10000000, 99999999),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.internet.avatar(),
        status: _.shuffle(statuses)[0],
        gpa: _.round(_.random(0.5, 4.0), 3),
        test_avg: _.random(60, 95),
        cohort: generateCohort(),
        international: weighted(1, 25),
        active_courses: currentCourse,
        courses: _.unionBy(currentCourse, generateCourses(10), "course_id"),
      };
    }),
    courses: _.times(25, function (n) {
      return {
        id: n + 1,
        name: faker.random.words(2),
        active: weighted(2, 1),
        credits: numWeighted([2, 4], [1, 4]),
        sections: _.times(numWeighted([1, 2, 3], [4, 2, 1]), function (n) {
          return {
            id: (n + 1) * 1000,
            semester: "spring19",
          };
        }),
      };
    }),
    users: [
      {
        email: "jose@mail.com",
        password:
          "$2a$10$am3RZwU.seNqP1LqBn7nyuuI9acvYsJUwkwCOgPBR4RRNNzi34JnG",
        firstname: "Jose",
        lastname: "Saravia",
        canWrite: true,
        id: 1,
      },
    ],
  };
};

function generateCourses(max) {
  var _ = require("lodash");
  var classIDs = _.shuffle([...Array(25).keys()].map((x) => x + 1));
  return _.times(numWeighted([3, max], [1, 20]), function (n) {
    return {
      course_id: classIDs.pop(),
      grade: _.random(50, 100),
      section_id: 1000,
    };
  });
}
function generateCohort() {
  var _ = require("lodash");
  var startYear = _.random(15, 20);
  var hasChanged = weighted(1, 9);
  return {
    current: hasChanged
      ? `${startYear + 1}/${startYear + 6}`
      : `${startYear}/${startYear + 5}`,
    original: `${startYear}/${startYear + 5}`,
    moved: hasChanged,
  };
}

function weighted(trueRatio, falseRatio) {
  var _ = require("lodash");
  var weight = _.concat(
    _.times(trueRatio, _.constant(true)),
    _.times(falseRatio, _.constant(false))
  );
  return _.shuffle(weight)[0];
}

function numWeighted(numbers, weight) {
  var _ = require("lodash");
  var weight = numbers.reduce(
    (total, val, index) =>
      total.concat(_.times(weight[index], _.constant(val))),
    []
  );
  return _.shuffle(weight)[0];
}
