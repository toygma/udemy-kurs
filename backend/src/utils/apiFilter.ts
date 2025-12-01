import { Query } from "mongoose";

class ApiFilter {
  query: Query<any, any>;
  queryStr: Record<string, any>;

  constructor(query: Query<any, any>, queryStr: Record<string, any>) {
    this.query = query;
    this.queryStr = queryStr;
  }

  pagination(resPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default ApiFilter;
