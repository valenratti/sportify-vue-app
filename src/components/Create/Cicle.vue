<template>
    <v-data-table
        :headers="headers"
        :items="myRoutines"
        sort-by="routines"
        disable-pagination
        hide-default-footer
        class="background"
    >
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>{{ editedItem.name }}</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.duration"
                                        label="Duration (seg)"
                                        type="number"
                                        min="1"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.repetitions"
                                        label="Repetitions"
                                        type="number"
                                        min="1"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="success" text @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import routineStore from "@/store/routineStore";
export default {
    name: "Cicle.vue",
    props: {
        exercises: {
            type: Array
        },
        name: {
            type: String
        }
    },
    data: () => ({
        store: routineStore,
        dialog: false,
        headers: [
            {
                text: "Exercise",
                align: "start",
                sortable: false,
                value: "name"
            },
            { text: "Duration (seg)", value: "duration" },
            { text: "Repetitions", value: "repetitions" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        myRoutines: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            duration: 0,
            difficulty: 0
        },
        defaultItem: {
            name: "",
            duration: 0,
            difficulty: 0
        }
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

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.myRoutines = this.exercises;
        },

        editItem(item) {
            this.editedIndex = this.myRoutines.indexOf(item);
            this.editedItem = { ...this.myRoutines[this.editedIndex] };
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.myRoutines.indexOf(item);
            confirm("Are you sure you want to delete this item?") &&
                this.store.deleteExercise(index, this.name);
        },

        close() {
            this.dialog = false;
        },

        save() {
            this.myRoutines[this.editedIndex].name = this.editedItem.name;
            this.myRoutines[
                this.editedIndex
            ].duration = this.editedItem.duration;
            this.myRoutines[
                this.editedIndex
            ].repetitions = this.editedItem.repetitions;
            this.close();
        }
    }
};
</script>

<style scoped></style>
