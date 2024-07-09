class ApiFeatures {
    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    filter(){
        const queryStringOBJ = { ...this.queryString };
        const excludesFilde = ["page", "limit", "sort", "fields", "keyword"];
        excludesFilde.forEach((field) => delete queryStringOBJ[field]);
      
        let queryStr = JSON.stringify(queryStringOBJ);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
        return this;
    }

    sort(){
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
          } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createAt");
          }

          return this;
    }

    fields(){
        if (this.queryString.fields) {
            let fieldsby = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fieldsby);
          } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v");
          }
          return this;
    }

    search(){
        if (this.queryString.keyword) {
            const querys = {};
            querys.$or=[
              { title: { $regex: this.queryString.keyword, $options: "i" } },
              { description: { $regex: this.queryString.keyword, $options: "i" } }
            ];
            this.mongooseQuery = this.mongooseQuery.find(querys)
          }
          return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures;