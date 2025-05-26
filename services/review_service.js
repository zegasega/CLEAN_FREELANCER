const BaseService = require("../core/base_service");
const db = require("../db/index");
class ReviewService extends BaseService {
    constructor() {
        super(db.Review);
        this.db = db;
    }

    

}