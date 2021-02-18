<template>
    <v-container>
        <v-card color="background">
            <EditRoutine />

            <v-divider></v-divider>
            <FormAddCycle />

            <v-expansion-panels hover flat>
                <v-expansion-panel
                    v-for="(value, name, i) in store.getCycles()"
                    :key="i"
                    class="background"
                >
                    <v-container>
                        <v-row no-gutters>
                            <v-col>
                                <v-expansion-panel-header>
                                    {{ name }}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <Cicle
                                        :exercises="
                                            store.getCyclesExercisesByName(name)
                                        "
                                        :name="name"
                                    />
                                </v-expansion-panel-content>
                            </v-col>
                            <v-col cols="2">
                                <v-container fluid>
                                    <v-row class="flex-column" no-gutters>
                                        <v-col>
                                            <p class="text-caption">
                                                Repetitions
                                            </p>
                                        </v-col>
                                        <v-col class="mt-n5">
                                            <v-text-field
                                                type="number"
                                                v-model="value.repetitions"
                                                single-line
                                                small
                                                dense
                                                min="1"
                                                max="50"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-textarea
                class="pa-6"
                outlined
                name="input-7-4"
                label="Detail"
                value="This Routine..."
                v-model="routine.detail"
            ></v-textarea>
            <v-card align="end" flat color="background">
                <v-btn color="error" dark class="mb-2" @click="cancel">
                    Cancel
                </v-btn>
                <v-btn
                    color="success"
                    dark
                    class="mb-2 mx-2"
                    @click="saveRoutine"
                >
                    Save
                </v-btn>
            </v-card>
        </v-card>
        <v-overlay :value="postLoader">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import Cicle from "@/components/Create/Cicle";
import EditRoutine from "@/components/Create/EditRoutine";
import routineStore from "@/store/routineStore";
import FormAddCycle from "@/components/Create/FormAddCycle";
import { RoutinesApi } from "@/api/routines";
import router from "@/router";

export default {
    name: "CreateRoutine",
    components: { Cicle, EditRoutine, FormAddCycle },

    data: () => ({
        cycles: routineStore.getExercisesCycleMap(),
        dialog: false,
        routine: routineStore.getRoutine(),
        store: routineStore,
        postLoader: false
    }),
    methods: {
        async saveRoutine() {
            this.postLoader = true;
            if (!this.store.isNewRoutine()) {
                this.store.deleteRoutine();
            }
            await this.createRoutine();
            this.postLoader = false;
            this.store.saved();
            router.push("/myroutines");
        },

        async cancel() {},

        async createRoutine() {
            const cycles = this.store.getCycles();
            let routine = this.store.getRoutine();
            //routine.isPublic = !routine.isPublic;
            const res = await RoutinesApi.addRoutine(routine);
            const routineId = res.id;
            await Promise.all(
                Object.values(cycles).map(async cycle => {
                    await this.createCycle(routineId, cycle);
                })
            );
        },
        async createCycle(routineId, cycle) {
            cycle.repetitions = parseInt(cycle.repetitions);
            const res = await RoutinesApi.addCycle(routineId, cycle);
            const cycleId = res.id;
            console.log(this.store.getCyclesExercisesByName(res.name), "a");
            await Promise.all(
                this.store
                    .getCyclesExercisesByName(res.name)
                    .map(async (exercise, idx) => {
                        exercise.order = idx;
                        await this.createExercise(routineId, cycleId, exercise);
                    })
            );
        },
        async createExercise(routineId, cycleId, exercise) {
            exercise.duration = parseInt(exercise.duration);
            exercise.repetitions = parseInt(exercise.repetitions);
            await RoutinesApi.addExercise(routineId, cycleId, exercise);
        },
        deleteCycle(cycle) {
            this.store.deleteCycle(cycle);
        }
    }
};
</script>

<style scoped></style>
