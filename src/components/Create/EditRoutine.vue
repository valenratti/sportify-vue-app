<template>
    <v-container class="pa-4">
        <v-row justify="space-between">
            <v-col cols="5">
                <v-text-field
                    label="Routine Name"
                    outlined
                    v-model="routine.name"
                    dense
                ></v-text-field>
            </v-col>

            <v-col>
                <v-select
                    :items="categoriesName"
                    label="Category"
                    v-model="category"
                    dense
                    outlined
                ></v-select>
            </v-col>
        </v-row>
        <v-row class="pt-0">
            <v-col>
                <v-card color="background" flat>
                    Difficulty:
                    <v-rating
                        color="primary"
                        background-color="grey"
                        empty-icon="local_fire_department"
                        full-icon="local_fire_department"
                        hover
                        length="5"
                        value="3"
                        min="1"
                        v-model="difficulty"
                    ></v-rating>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="mt-2">
                <v-card flat color="background">
                    <v-icon align color="primary">
                        alarm
                    </v-icon>
                    {{ totalTime }}
                    "
                </v-card>
            </v-col>
            <v-col class="py-0">
                <v-checkbox color="primary" v-model="routine.isPublic">
                    <template v-slot:label>
                        <div>
                            Public
                        </div>
                    </template>
                </v-checkbox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import routineStore from "@/store/routineStore";
import { CategoriesApi } from "@/api/categories";
export default {
    name: "EditRoutine.vue",
    props: {},
    data: () => ({
        categories: [],
        categoriesName: [],
        category: "",
        difficulty: 1,
        routine: routineStore.getRoutine(),
        store: routineStore
    }),
    async created() {
        const response = await CategoriesApi.retrieveAllCategories();
        this.categories = response.results;
        this.categoriesName = response.results.map(el => el.name);
        const diff = routineStore.getRoutine().difficulty;
        if (!this.store.isNewRoutine()) this.difficulty = diff;
    },
    watch: {
        difficulty: function(val) {
            switch (val) {
                case 1:
                    this.routine.difficulty = "rookie";
                    break;
                case 2:
                    this.routine.difficulty = "begginer";
                    break;
                case 3:
                    this.routine.difficulty = "intermediate";
                    break;
                case 4:
                    this.routine.difficulty = "advanced";
                    break;
                case 5:
                    this.routine.difficulty = "expert";
                    break;
            }
        },
        category: function(val) {
            const cat = this.categories.map(cat => {
                if (cat.name === val) return cat;
            });
            this.routine.category.id = cat[0].id;
        }
    },
    computed: {
        totalTime: function() {
            let secs = 0;
            const cycles = this.store.getCycles();
            Object.values(cycles).forEach(cycle => {
                this.store
                    .getCyclesExercisesByName(cycle.name)
                    .forEach(exercise => {
                        secs += exercise.duration * exercise.repetitions;
                    });
                secs *= cycle.repetitions;
            });
            return secs;
        }
    }
};
</script>

<style scoped></style>
