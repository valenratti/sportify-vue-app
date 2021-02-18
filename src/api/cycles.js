import { Api } from "./api.js";
export { CyclesApi };

class CyclesApi {
    static get url() {
        return `${Api.baseUrl}/cycles`;
    }

    static async get(routineId, controller) {
        return await Api.get(`${CyclesApi.url}/${routineId}`, true, controller);
    }
}
