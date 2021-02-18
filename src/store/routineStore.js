import Vue from "vue";
import { RoutinesApi } from "@/api/routines";

const defaultCycleExercise = { Warmup: [], Training: [], Cooldown: [] };
const defaultCycle = {
    Warmup: {
        name: "Warmup",
        detail: "",
        type: "warmup",
        order: 1,
        repetitions: 1
    },
    Training: {
        name: "Training",
        detail: "",
        type: "exercise",
        order: 2,
        repetitions: 1
    },
    Cooldown: {
        name: "Cooldown",
        detail: "",
        type: "cooldown",
        order: 3,
        repetitions: 1
    }
};
const defaultRoutine = {
    name: "",
    detail: "",
    isPublic: true,
    difficulty: "expert",
    category: { id: 1 }
};

let modificated = false;
let routine = { ...defaultRoutine };
let cycles = { ...defaultCycle };
let exercisesCycleMap = { ...defaultCycleExercise };
let isNew = true;
let toDeleteCyclesId = [];
let toDeleteExercisesId = {};
//let cantCycles = 3;

export default Vue.observable({
    openCyclePanel: 0,
    clearAll() {
        exercisesCycleMap = {};
        Object.assign(exercisesCycleMap, { ...defaultCycleExercise });
        cycles = {};
        Object.assign(cycles, { ...defaultCycle });
        routine = {};
        Object.assign(routine, { ...defaultRoutine });
        modificated = false;
        isNew = true;
        console.log("Reset");
    },
    addExercise(exercise, cycle) {
        exercisesCycleMap[cycle].push(exercise);
        this.openCyclePanel = Object.keys(exercisesCycleMap).findIndex(
            key => key === cycle
        );
        modificated = true;
    },
    addCycle(name, cycle) {
        Vue.set(exercisesCycleMap, name, []);
        Vue.set(cycles, name, { ...cycle });
        modificated = true;
    },
    deleteExercise(index, cycle) {
        Vue.delete(exercisesCycleMap[cycle], index);
    },
    deleteCycle(cycle) {
        Vue.delete(exercisesCycleMap, cycle);
        Vue.delete(cycles, cycle);
    },
    getCycles() {
        return cycles;
    },
    getCyclesName() {
        return Object.keys(exercisesCycleMap);
    },
    getExercisesCycleMap() {
        return exercisesCycleMap;
    },
    getCyclesExercisesByName(cycle) {
        return exercisesCycleMap[cycle];
    },
    wasModified() {
        return modificated;
    },
    getRoutine() {
        return routine;
    },
    getOpenCyclePanel() {
        return this.openCyclePanel;
    },
    isNewRoutine() {
        return isNew;
    },
    async toEditRoutine(r) {
        isNew = false;
        routine.name = r.name;
        routine.detail = r.detail;
        routine.isPublic = r.isPublic;
        routine.difficulty = difficultyValue(r.difficulty);
        console.log(routine.difficulty);
        routine.category = r.category;
        routine.id = r.id;

        cycles = {};
        exercisesCycleMap = {};
        let cycleRes = await RoutinesApi.getCycles(r.id);
        cycleRes = cycleRes.results;
        cycleRes.forEach(async cycle => {
            toDeleteCyclesId.push(cycle.id);
            const cycleId = cycle.id;
            this.addCycle(cycle.name, cycle);
            delete cycle.id;
            let exRes = await RoutinesApi.getExercises(r.id, cycleId);
            exRes = exRes.results;
            toDeleteExercisesId[cycleId] = [];
            exRes.forEach(exercise => {
                toDeleteExercisesId[cycleId].push(exercise.id);
                delete exercise.id;
                this.addExercise(exercise, cycle.name);
            });
        });
    },
    deleteRoutine() {
        const routineId = routine.id;
        delete routine.id;
        toDeleteCyclesId.forEach(cycleId => {
            this.deleteRemoteCycle(routineId, cycleId);
        });
        RoutinesApi.deleteRoutine(routineId);
        toDeleteCyclesId = [];
        toDeleteExercisesId = {};
    },
    deleteRemoteCycle(routineId, cycleId) {
        toDeleteExercisesId[cycleId].forEach(exerciseId => {
            this.deleteRemoteExercise(routineId, cycleId, exerciseId);
        });
        RoutinesApi.deleteCycle(routineId, cycleId);
    },
    deleteRemoteExercise(routineId, cycleId, exerciseId) {
        RoutinesApi.deleteExercise(routineId, cycleId, exerciseId);
    },

    saved() {
        modificated = false;
        this.clearAll();
    },
    async deleteRoutineById(id) {
        let cyclesRes = await RoutinesApi.getCycles(id);
        cyclesRes = cyclesRes.results;
        await Promise.all(
            cyclesRes.map(async cycle => {
                let exercisesRes = await RoutinesApi.getExercises(id, cycle.id);
                exercisesRes = exercisesRes.results;
                await Promise.all(
                    exercisesRes.map(async exercise => {
                        await RoutinesApi.deleteExercise(
                            id,
                            cycle.id,
                            exercise.id
                        );
                    })
                );
                await RoutinesApi.deleteCycle(id, cycle.id);
            })
        );
        await RoutinesApi.deleteRoutine(id);
    }
});

function difficultyValue(val) {
    switch (val) {
        case "rookie":
            return 1;
        case "begginer":
            return 2;
        case "intermediate":
            return 3;
        case "advanced":
            return 4;
        case "expert":
            return 5;
    }
}
//export default routineStore;
