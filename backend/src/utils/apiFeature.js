/**
 * apiFeature={
 * Attributes;
 *      query:to store query like Product.find(),
 *      queryStr: to store param or keyword for search and filter,
 * Methods:
 *      search(),
 *      filter(),
 * }
 */

export default class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          //{ <field>: { $regex: /pattern/, $options: '<options>' } }
          // i = Case insensitivity
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    // we return this search method object
    return this;
  }
  filter() {
    const tempQueryStr = { ...this.queryStr };
    // for filter we need to remove other fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete tempQueryStr[key]);
    // ["keyword", "page", "limit"].forEach((key) => delete tempQueryStr[key]);


    //Filter for price & rating
    //{ category: 'Laptop', price: { gt: '1000', lte: '2100' } }
    // we need this { category: 'Laptop', price: { $gt: '1000', $lte: '2100' } }

    let querystring = JSON.stringify(tempQueryStr);

    // console.log(querystring);
    //regex /pattern/modifier
    //find (gt|gte|lte|lt) words and replace with ($gt|$gte|$lte|$lt)

    querystring=querystring.replace(/\b(gt|gte|lte|lt)\b/g, (key) => `$${key}`);

    // console.log(querystring);
    this.query = this.query.find(JSON.parse(querystring));

    return this;
  }
  pagination(resultsPerPage){
    const currentPage = Number(this.queryStr.page) || 1; //e.g. page =2
    const skip = resultsPerPage * (currentPage-1); //10 * (1) 
    this.query = this.query.limit(resultsPerPage).skip(skip);
    console.log("currentPage "+currentPage,"Skip "+skip)
    return this;
  }
}
