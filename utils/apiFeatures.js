class APiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    console.log("Query Object", queryObj);
    // This excludedFields tries to exclude page, sort, etc from the query
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1b) ADVANCED FILTERING ie using greaterThanorEqualsTo(gte);
    let queryString = JSON.stringify(queryObj);
    //We want to replace gte, gt, lte, lt as it is coming without the $ sign with mongoose($gte, $gt, $lte, $lt)
    // In regex we use the g sign at the end so that we can get the occurence multiple times, if not we would only get the first occurence.
    //replace fxn accepts 2 parameters. We use it here to match what we have b4 to what we have presently.
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // Tour.find() returns a query
    // let query = Tour.find(JSON.parse(queryString));
    this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // To sort based on multiple criteria we use comma on the params eg 127.0.0.1:8000/api/v1/tours?sort=price,duration etc
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      //Sort based on the time of creation in descending order
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // We can select all fields except a field eg __v using the select(-the fieldname)
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    //eg 127.0.0.1:8000/api/v1/tours?page=3&limit=10, means give me page3 of the document with 10collections
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APiFeatures;
