function FilterParamsToSqlSelect(entityName, filterQuery, offset, limit) {
  this.entityName = entityName;
  this.filterQuery = filterQuery;
  this.offset = offset;
  this.limit = limit;
}
FilterParamsToSqlSelect.prototype.toSqlSelect = function () {
  var params = this.filterQuery.split(",");
  var paramsObj = this.createJsonFromArray(params);
  return this.createSelectQuery(
    this.entityName,
    paramsObj,
    this.offset,
    this.limit
  );
};
FilterParamsToSqlSelect.prototype.createJsonFromArray = function (arr) {
  var result = {};
  arr.forEach(function (item) {
    var parts = item.split(":");
    var key = parts[0];
    var value = parts[1];
    if (!key || !value) {
      return;
    }
    if (value.toLowerCase() === "true") {
      result[key] = true;
    } else if (value.toLowerCase() === "false") {
      result[key] = false;
    } else {
      var numValue = Number(value);
      if (!isNaN(numValue)) {
        result[key] = numValue;
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};
FilterParamsToSqlSelect.prototype.createSelectQuery = function (
  entity,
  object,
  offset,
  limit
) {
  var query = `SELECT * FROM "${entity}" WHERE `;
  var values = [];
  var placeholders = [];
  var index = 1;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] !== "string") {
        placeholders.push(key + " = $" + index);
        values.push(object[key]);
        index++;
      } else if (typeof object[key] === "string") {
        placeholders.push(key + " ILIKE $" + index);
        values.push(object[key] + "%");
        console.log("values", object[key]);
        index++;
      }
    }
  }
  query += placeholders.join(" AND ");
  query += " OFFSET $" + index + " LIMIT $" + (index + 1);
  values.push(offset);
  values.push(limit);
  return [query, values];
};

module.exports = FilterParamsToSqlSelect;
