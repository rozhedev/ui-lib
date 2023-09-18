export default class PostService {
    static async getAll(apiQuery, limit = 10, page = 1) {
        const apiQueryParams = {
            // * posts count on 1 page 
            limit: "_limit=",
            // * start page number
            page: "_page=",
        }
        const finalQuery = `${apiQuery}?${apiQueryParams.limit}${limit}&${apiQueryParams.page}${page}`;
        try {
            const res = await fetch(finalQuery);
            return res;
        } catch (err) {
            console.log(err.message);
        }

    }
}
