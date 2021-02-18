<template>
    <div>
        <NavBar />
        <v-main>
            <v-container class="mt-3">
                <v-card color="background">
                    <v-card-title>
                        My Exercises
                        <v-spacer></v-spacer>
                        <!-- <template v-slot:top> -->
                        <!-- Dialog for new exercise -->
                        <!-- </template> -->
                    </v-card-title>
                    <v-skeleton-loader
                        v-if="firstLoad"
                        class="px-2"
                        type="table-row-divider@5,table-tfoot "
                    ></v-skeleton-loader>
                    <v-data-table
                        v-else
                        :headers="headers"
                        :items="myExercises"
                        sort-by="Exercise"
                        class="elevation-1 background"
                    >
                        <template v-slot:header>
                            <v-dialog v-model="dialog" max-width="600px">
                                <v-card>
                                    <v-card-title>
                                        <h2>Edit an exercise</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form class="px-3">
                                            <v-text-field
                                                label="Exercise name"
                                                v-model="editingExercise.name"
                                            ></v-text-field>
                                            <v-textarea
                                                label="Detail"
                                                v-model="editingExercise.detail"
                                            ></v-textarea>
                                            <v-slider
                                                label="Repetitions"
                                                v-model="
                                                    editingExercise.repetitions
                                                "
                                                :thumb-size="24"
                                                thumb-label="always"
                                                :max="150"
                                            ></v-slider>
                                            <v-slider
                                                label="Seconds"
                                                v-model="
                                                    editingExercise.duration
                                                "
                                                step="5"
                                                :thumb-size="24"
                                                thumb-label="always"
                                                :max="480"
                                            ></v-slider>
                                            <v-select
                                                :items="editingExercise.items"
                                                label="Type"
                                                v-model="editingExercise.type"
                                                dense
                                                outlined
                                            ></v-select>
                                            <v-btn @click="save" class="success"
                                                >save</v-btn
                                            >
                                            <v-btn @click="close" class="error"
                                                >cancel</v-btn
                                            >
                                        </v-form>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="checkDelete(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:footer v-if="deleteDialog">
                            <ConfirmationDialog
                                :dialog="deleteDialog"
                                :dialogTitle="
                                    `Are you sure you want to delete ${toDelete.name}?`
                                "
                                @cancel="deleteDialog = false"
                                @confirm="deleteItem"
                            />
                        </template>
                    </v-data-table>
                </v-card>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { RoutinesApi } from "@/api/routines";
import { UserApi } from "@/api/user";

export default {
    name: "MyExercises",
    components: {
        NavBar,
        ConfirmationDialog
    },

    data: () => ({
        dialog: false,
        deleteDialog: false,
        editDialog: false,
        firstLoad: true,
        headers: [
            {
                text: "Exercise",
                align: "start",
                sortable: true,
                value: "name"
            },
            { text: "Detail", value: "detail" },
            { text: "Duration (sec)", value: "duration" },
            { text: "Repetitions", value: "repetitions" },
            { text: "Type", value: "type" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        myExercises: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            duration: 0,
            difficulty: 0,
            places: 0,
            groups: 0
        },
        defaultItem: {
            name: "",
            duration: 0,
            difficulty: 0,
            places: 0,
            groups: 0
        },
        toDelete: null,
        toEdit: null,
        currentExerciseId: -1,
        editingExercise: {
            name: "",
            detail: "",
            repetitions: "",
            duration: "",
            type: "",
            items: ["exercise", "rest"]
        },
        godRoutineId: 1,
        godCycleId: 1
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    async beforeMount() {
        this.firstLoad = true;
        const ids = await UserApi.getCurrentUserGodIds();
        this.godRoutineId = parseInt(ids[0]);
        this.godCycleId = parseInt(ids[1]);
    },
    async created() {
        await new Promise(resolve =>
            setTimeout(() => resolve((this.firstLoad = false)), 2000)
        );
        await this.initialize();
    },

    methods: {
        async initialize() {
            let response = await RoutinesApi.getExercises(
                this.godRoutineId,
                this.godCycleId
            );
            this.myExercises = response.results;
        },

        async editItem(item) {
            const index = this.myExercises.indexOf(item);
            this.currentExerciseId = this.myExercises[index].id;
            let response = await RoutinesApi.getExercise(
                this.godRoutineId,
                this.godCycleId,
                this.currentExerciseId
            );

            this.editingExercise.name = response.name;
            this.editingExercise.detail = response.detail;
            this.editingExercise.type = response.type;
            this.editingExercise.duration = response.duration;
            this.editingExercise.repetitions = response.repetitions;

            this.editDialog = true;
            // this.editedIndex = this.myExercises.indexOf(item);
            // this.editedItem = Object.assign({}, item);
            this.toEdit = item;
            this.dialog = true;
        },

        checkDelete(item) {
            this.deleteDialog = true;
            this.toDelete = item;
        },

        async deleteItem() {
            //post delete
            this.deleteDialog = false;
            const index = this.myExercises.indexOf(this.toDelete);
            this.deleteDialog = false;
            this.toDelete = null;
            await RoutinesApi.deleteExercise(
                this.godRoutineId,
                this.godCycleId,
                this.myExercises[index].id
            );
            //this.myExercises.splice(index, 1);
            await this.initialize();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        async save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.myExercises[this.editedIndex],
                    this.editedItem
                );
            } else {
                //this.myExercises.push(this.editedItem);
                let exercise = {
                    name: this.editingExercise.name,
                    detail: this.editingExercise.detail,
                    type: this.editingExercise.type,
                    duration: this.editingExercise.duration,
                    repetitions: this.editingExercise.repetitions
                };
                await RoutinesApi.updateExercise(
                    1,
                    1,
                    this.currentExerciseId,
                    exercise
                );
                await this.initialize();
            }
            this.close();
        }
    }
};
</script>

<style></style>
