export default class PostService {
    static async getAll(apiLink) {
        try {
            const res = await fetch(apiLink);
            const json = await res.json();
            return json;
        } catch (err) {
            console.log(err.message);
        }
    }
}