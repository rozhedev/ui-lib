export default class PostService {
    static async getAll(apiQuery, limit = 10, page = 1) {
        const finalQuery = `${apiQuery}?_limit=${limit}&_page=${page}`;
        try {
            const res = await fetch(finalQuery);
            return res;
        } catch (err) {
            console.log(err.message);
        }

    }
}
