import { Api } from "./api.js";
import Cookies from "js-cookie";
import { RoutinesApi } from "@/api/routines";
import { Initializer } from "@/initializer/init";

export { UserApi, Credentials };

class UserApi {
    static get url() {
        return `${Api.baseUrl}/user`;
    }

    static async loginWithJohnDoe() {
        let johnDoe = {
            username: "johndoe",
            password: "1234567890"
        };
        let result = await Api.post(`${UserApi.url}/login`, false, johnDoe);
        localStorage.setItem("SavedToken", "Bearer " + result.token);
    }

    static async login(credentials, controller) {
        const result = await Api.post(
            `${UserApi.url}/login`,
            false,
            credentials,
            controller
        );
        Api.token = result.token;
        localStorage.setItem("SavedToken", "Bearer " + Api.token);

        console.log(credentials.username);
        let initializer = await RoutinesApi.retrieveAllRoutines();
        if (initializer.results.length === 0) {
            await UserApi.logout();
            await Initializer.initializeEverything();
            localStorage.clear();
            await UserApi.login(credentials);
        }

        let responseRoutines = await this.getCurrentUserRoutines(0, 10);

        if (responseRoutines.results.length === 0) {
            let user = await this.getCurrentUser();
            await this.createGodRoutine(user);
        }
        responseRoutines = await this.getCurrentUserRoutines(0, 10);
        let routineId = responseRoutines.results[0].id;
        responseRoutines = await RoutinesApi.getCycles(routineId);
        let cycleId = responseRoutines.results[0].id;

        console.log(routineId);
        console.log(cycleId);
        localStorage.setItem("godRoutine", routineId);
        localStorage.setItem("godCycle", cycleId);

        return result;
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, null, controller);
        Api.token = undefined;
        localStorage.removeItem("SavedToken");
        localStorage.removeItem("godRoutine");
        localStorage.removeItem("godCycle");
    }

    static async register(userData) {
        return await Api.post(this.url, false, userData);
    }

    static async resendMail(mail) {
        return await Api.post(
            `${UserApi.url}/resend_verification`,
            false,
            mail
        );
    }

    static async validate(data) {
        return await Api.post(`${UserApi.url}/verify_email`, false, data);
    }

    static async getCurrentUser() {
        return await Api.get(`${UserApi.url}/current`, true);
    }

    static async updateCurrentUser(userData) {
        return await Api.put(`${UserApi.url}/current`, true, userData);
    }

    static async getCurrentUserRoutines(page, size) {
        return await Api.get(
            `${UserApi.url}/current/routines/?page=${page}&size=${size}&orderBy=dateCreated&direction=asc`,
            true
        );
    }

    static async getCurrentUserGodIds() {
        let ids = [];
        let godId = localStorage.getItem("godRoutine");
        let godCycle = localStorage.getItem("godCycle");
        ids.push(godId);
        ids.push(godCycle);
        return ids;
    }

    static setUserLogged(userLogged) {
        Cookies.set("userLogged", userLogged);
    }

    static getUserLogged() {
        return Cookies.get("userLogged");
    }

    static deleteUserLogged() {
        Cookies.remove("userLogged");
    }

    static async createGodRoutine(user) {
        let routineRepository = {
            name: "MyRepository",
            detail: "Exercise Repository",
            isPublic: false,
            difficulty: "rookie",
            category: {
                id: 1
            }
        };
        let cycleRepository = {
            name: "Cycle Repository",
            detail: "None",
            type: "warmup",
            order: 1,
            repetitions: 1
        };
        let responseRoutine = await RoutinesApi.addRoutine(routineRepository);
        let id = responseRoutine.id;
        let cycleid = await RoutinesApi.addCycle(id, cycleRepository);
        cycleid = cycleid.id;
        delete user.dateCreated;
        delete user.dateLastActive;
        delete user.deleted;
        delete user.verified;
        delete user.id;
        user.phone = `${id}|${cycleid}`;
        console.log(id, cycleid);
        console.log(user);
        await this.updateCurrentUser(user);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
