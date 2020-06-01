module.exports = function () {
  var coursesDB = require("./Generators/CourseGenerator")();
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
    courses: coursesDB,
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
