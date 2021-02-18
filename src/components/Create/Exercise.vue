<template>
    <v-card
        class="ma-lg-2 pa-lg-2 ma-md-4"
        max-width="200"
        min-width="150"
        color="background"
    >
        <v-img
            class="white--text align-end"
            height="130px"
            :src="image"
            contain
            alt="Exercise image"
        >
            <v-card-title
                class="primary--text py-1 pl-2"
                style="background-color:rgba(253, 255, 242, 0.5);"
                >{{ exercise.name }}</v-card-title
            >
        </v-img>
        <v-card-actions>
            <v-row>
                <v-dialog v-model="cycleDialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" text v-on="on" v-bind="attrs">
                            <v-icon small class="mr-2">
                                add
                            </v-icon>
                            Add
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-select
                                :items="cyclesName()"
                                label="Cycle"
                                v-model="cycle"
                                dense
                                outlined
                                class="pt-3"
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="closeCycleDialog">
                                Cancel
                            </v-btn>
                            <v-btn color="success" @click="addExercise">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text v-on="on" v-bind="attrs">
                        <v-icon small class="mr-2">
                            visibility
                        </v-icon>
                        See
                    </v-btn>
                </template>
                <RoutineCardDetailed
                    :title="exercise.name"
                    :detail="exercise.detail"
                    @dialog="dialog = false"
                />
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import RoutineCardDetailed from "@/components/RoutineCardDetailed.vue";
import routineStore from "@/store/routineStore";
import { RoutinesApi } from "@/api/routines";

export default {
    name: "Exercise",
    components: {
        RoutineCardDetailed
    },
    props: {
        exercise: {
            type: Object
        },
        ids: {
            type: Array
        }
    },
    data: () => ({
        dialog: false,
        cycles: routineStore.getCycles(),
        cycleDialog: false,
        cycle: "",
        store: routineStore,
        image: ""
    }),

    methods: {
        addExercise() {
            this.store.addExercise({ ...this.exercise }, this.cycle);
            this.cycleDialog = false;
        },
        cyclesName() {
            return routineStore.getCyclesName();
        },
        closeCycleDialog() {
            this.cycleDialog = false;
        }
    },
    async created() {
        let res = await RoutinesApi.getImages(
            parseInt(this.ids[0]),
            parseInt(this.ids[1]),
            this.exercise.id
        );
        if (res.totalCount != 0) {
            res = res.results[0];
            this.image = res.url;
        } else {
            this.image = "https://i.imgur.com/qsTg7xl.png";
        }
    },
    watch: {
        exercise: async function() {
            let res = await RoutinesApi.getImages(
                parseInt(this.ids[0]),
                parseInt(this.ids[1]),
                this.exercise.id
            );
            if (res.totalCount != 0) {
                res = res.results[0];
                this.image = res.url;
            } else {
                this.image = "https://i.imgur.com/qsTg7xl.png";
            }
        }
    }
};
</script>

<style scoped></style>
