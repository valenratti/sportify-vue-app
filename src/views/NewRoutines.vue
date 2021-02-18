<template>
    <div>
        <NavBar />
        <v-main>
            <v-container fluid class="px-3">
                <splitpanes class="default">
                    <pane min-size="40" size="50">
                        <CreateRoutine />
                    </pane>
                    <pane min-size="45" size="50">
                        <AddCostumeExcercise />
                    </pane>
                </splitpanes>
                <!-- <v-row no-gutters>
                    <v-col class="px-2">
                        <CreateRoutine />
                    </v-col>
                    <v-divider vertical></v-divider>

                    <v-col cols="6" class="px-2">
                        <AddCostumeExcercise />
                    </v-col>
                </v-row> -->
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import CreateRoutine from "@/components/Create/CreateRoutine";
import AddCostumeExcercise from "@/components/Create/AddCostumeExercise";
import routineStore from "@/store/routineStore";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
    name: "NewRoutines",
    components: {
        AddCostumeExcercise,
        CreateRoutine,
        NavBar,
        Splitpanes,
        Pane
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        startSize: 50,
        headers: [
            {
                text: "Excercise name",
                align: "start",
                sortable: false,
                value: "name"
            },
            { text: "Time", value: "time" },
            { text: "Target", value: "target" },
            { text: "Set", value: "set" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        excercises: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            time: 1,
            target: 1,
            set: 1
        },
        defaultItem: {
            name: "",
            time: 1,
            target: 1,
            set: 1
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
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.excercises = [
                {
                    name: "Abdominales",
                    time: 5,
                    target: 6.0,
                    set: 10
                },
                {
                    name: "Flexiones",
                    time: 2,
                    target: 9.0,
                    set: 25
                },
                {
                    name: "Eclair",
                    time: 4,
                    target: 16.0,
                    set: 18
                }
            ];
        },

        editItem(item) {
            this.editedIndex = this.excercises.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.excercises.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.excercises.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.excercises[this.editedIndex],
                    this.editedItem
                );
            } else {
                this.excercises.push(this.editedItem);
            }
            this.close();
        }
    },
    beforeRouteLeave(to, from, next) {
        if (routineStore.wasModified()) {
            const answer = window.confirm(
                "Do you really want to leave? you have unsaved changes!"
            );
            if (answer) {
                routineStore.clearAll();
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    },
    destroyed() {}
};
</script>

<style>
.splitpanes--vertical > .splitpanes__splitter {
    min-width: 2px;
    background: linear-gradient(90deg, #ccc, #ccc);
}
</style>
