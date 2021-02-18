import { Api } from "./api.js";
export { RoutinesApi, Routine };

class RoutinesApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async retrieveAllRoutines(controller) {
        return await Api.get(
            `${RoutinesApi.url}?page=0&size=999&orderBy=dateCreated&direction=asc`,
            true,
            controller
        );
    }

    static async retrieveAllRoutinesSearch(query, controller) {
        return await Api.get(
            `${RoutinesApi.url}?search=${query}&page=0&size=999&orderBy=dateCreated&direction=asc`,
            true,
            controller
        );
    }

    static async retrieveRoutines(
        difficulty,
        page,
        size,
        orderBy,
        direction,
        controller
    ) {
        return await Api.get(
            `${RoutinesApi.url}/?difficulty=${difficulty}&page=${page}&size=${size}&orderBy=${orderBy}&direction=${direction}`,
            true,
            controller
        );
    }

    static async retrieveRoutineById(routineId) {
        return await Api.get(`${RoutinesApi.url}/${routineId}`, true);
    }

    static async addRoutine(routine, controller) {
        return await Api.post(RoutinesApi.url, true, routine, controller);
    }

    static async modifyRoutine(routineId, routine, controller) {
        return await Api.put(
            `${RoutinesApi.url}/${routineId}`,
            true,
            routine,
            controller
        );
    }

    static async deleteRoutine(routineId, controller) {
        return await Api.delete(
            `${RoutinesApi.url}/${routineId}`,
            true,
            controller
        );
    }

    static async getRoutine(routineId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}`,
            true,
            controller
        );
    }

    static async getRoutineRatings(routineId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/ratings`,
            true,
            controller
        );
    }

    static async addRoutineRating(routineId, rating, controller) {
        return await Api.post(
            `${RoutinesApi.url}/${routineId}/ratings`,
            true,
            rating,
            controller
        );
    }

    static async getCycles(routineId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles?page=0&size=999&orderBy=id&direction=asc`,
            true,
            controller
        );
    }

    static async addCycle(routineId, cycle, controller) {
        return await Api.post(
            `${RoutinesApi.url}/${routineId}/cycles`,
            true,
            cycle,
            controller
        );
    }

    static async getCycleById(routineId, cycleId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}`,
            true,
            controller
        );
    }

    static async updateCycle(routineId, cycleId, cycle, controller) {
        return await Api.put(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}`,
            true,
            cycle,
            controller
        );
    }

    static async deleteCycle(routineId, cycleId, controller) {
        return await Api.delete(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}`,
            true,
            controller
        );
    }

    static async getExercises(routineId, cycleId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises`,
            true,
            controller
        );
    }

    static async addExercise(routineId, cycleId, exercise, controller) {
        return await Api.post(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises`,
            true,
            exercise,
            controller
        );
    }

    static async getExercise(routineId, cycleId, exerciseId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
            true,
            controller
        );
    }

    static async getCategories(routineId, cycleId, exerciseId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
            true,
            controller
        );
    }

    static async updateExercise(
        routineId,
        cycleId,
        exerciseId,
        exercise,
        controller
    ) {
        return await Api.put(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
            true,
            exercise,
            controller
        );
    }

    static async deleteExercise(routineId, cycleId, exerciseId, controller) {
        return await Api.delete(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
            true,
            controller
        );
    }

    static async getImages(routineId, cycleId, exerciseId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images`,
            true,
            controller
        );
    }

    static async addImage(routineId, cycleId, exerciseId, image, controller) {
        return await Api.post(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images`,
            true,
            image,
            controller
        );
    }

    static async getImageById(
        routineId,
        cycleId,
        exerciseId,
        imageId,
        controller
    ) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images/${imageId}`,
            true,
            controller
        );
    }

    static async updateImage(
        routineId,
        cycleId,
        exerciseId,
        imageId,
        image,
        controller
    ) {
        return await Api.put(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images/${imageId}`,
            true,
            image,
            controller
        );
    }

    static async deleteImage(
        routineId,
        cycleId,
        exerciseId,
        imageId,
        controller
    ) {
        return await Api.delete(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images/${imageId}`,
            true,
            controller
        );
    }

    static async getVideos(routineId, cycleId, exerciseId, controller) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos`,
            true,
            controller
        );
    }

    static async addVideo(routineId, cycleId, exerciseId, video, controller) {
        return await Api.post(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos`,
            true,
            video,
            controller
        );
    }

    static async getVideoById(
        routineId,
        cycleId,
        exerciseId,
        videoId,
        controller
    ) {
        return await Api.get(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos/${videoId}`,
            true,
            controller
        );
    }

    static async updateVideo(
        routineId,
        cycleId,
        exerciseId,
        videoId,
        video,
        controller
    ) {
        return await Api.put(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos/${videoId}`,
            true,
            video,
            controller
        );
    }

    static async deleteVideo(
        routineId,
        cycleId,
        exerciseId,
        videoId,
        controller
    ) {
        return await Api.delete(
            `${RoutinesApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos/${videoId}`,
            true,
            controller
        );
    }
}

class Routine {
    constructor(id, name, detail, isPublic, difficulty, category) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.category = category;
    }
}
