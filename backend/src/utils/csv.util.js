const { Parser } = require("json2csv");

const generateCSV = (data) => {
  const parser = new Parser({
    fields: ["id", "email", "firstName", "lastName"],
  });

  return parser.parse(data);
};

module.exports = {
  generateCSV,
};
