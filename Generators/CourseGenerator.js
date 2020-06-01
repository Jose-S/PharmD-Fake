// var usersRoute = require("./users.json");

module.exports = function () {
  var faker = require("faker");
  faker.seed(123);
  var _ = require("lodash");

  return _.times(25, function (n) {
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
  });
};

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
