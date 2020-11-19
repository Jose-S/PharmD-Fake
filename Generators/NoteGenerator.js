module.exports = function () {
    var faker = require("faker");
    faker.seed(123);
    var _ = require("lodash");

    var possibleTags = _.times(10, function (n) {
        return faker.lorem.word();
    })

    return _.times(150, function (n) {
        return {
            id: n + 1,
            title: faker.random.words(4),
            body: faker.lorem.paragraph(3),
            tags: generateTags(possibleTags),
            studentId: Math.floor(Math.random()*100)
        }
    })
}

function generateTags(possibleTags) {
    var _ = require("lodash");
    var numTags = Math.floor(Math.random()*5);
    return _.times(numTags, function(n) {
        return possibleTags[n];
    })
}
