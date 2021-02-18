<template>
    <div>
        <NavBar />
        <v-main>
            <v-container class="mt-3">
                <v-card color="background">
                    <v-card-title>
                        My Routines
                    </v-card-title>
                    <v-skeleton-loader
                        v-if="firstLoad"
                        class="px-2"
                        type="table-row-divider@5,table-tfoot "
                    ></v-skeleton-loader>
                    <v-data-table
                        v-else
                        :headers="headers"
                        :items="myRoutines"
                        sort-by="routines"
                        class="elevation-1 background"
                    >
                        <template v-slot:item.difficulty="{ item }">
                            <v-rating
                                color="primary"
                                background-color="grey"
                                empty-icon="local_fire_department"
                                full-icon="local_fire_department"
                                readonly
                                length="5"
                                :value="calculateDifficulty(item.difficulty)"
                            ></v-rating>
                        </template>
                        <template v-slot:item.isPublic="{ item }">
                            <v-icon :color="getColor(item.isPublic)">
                                {{ getPublic(item.isPublic) }}
                            </v-icon>
                        </template>
                        <template v-slot:item.category="{ item }">
                            <p>{{ item.category.name }}</p>
                        </template>
                        <template v-slot:top>
                            <v-toolbar flat color="background">
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            dark
                                            @click="goToCreate"
                                            class="mb-2"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            Create a New Routine
                                        </v-btn>
                                    </template>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                            <v-icon small class="mr-2" @click="watchItem(item)">
                                visibility
                            </v-icon>
                            <v-dialog v-model="dialog2" :retain-focus="false">
                                <RoutineCardDetailed
                                    :title="detailed.name"
                                    :detail="detailed.detail"
                                    :id="detailed.id"
                                    @dialog="dialog2 = false"
                                />
                            </v-dialog>
                        </template>
                    </v-data-table>
                </v-card>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import RoutineCardDetailed from "@/components/RoutineCardDetailed";
import { UserApi } from "@/api/user";
import { RoutinesApi } from "@/api/routines";
import routineStore from "@/store/routineStore";
import router from "@/router";

export default {
    name: "MyRoutines",
    components: { NavBar, RoutineCardDetailed },
    data: () => ({
        firstLoad: false,
        selectTime: [],
        dialog: false,
        dialog2: false,
        headers: [
            {
                text: "Routines",
                align: "start",
                sortable: false,
                value: "name"
            },
            { text: "Is Public", value: "isPublic" },
            { text: "Difficulty", value: "difficulty" },
            { text: "Category", value: "category" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        myRoutines: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            public: "Yes",
            difficulty: 0,
            category: ""
        },
        defaultItem: {
            name: "",
            public: "Yes",
            difficulty: 0,
            category: ""
        },
        store: routineStore,
        detailed: {
            name: "",
            detail: "",
            id: ""
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
    beforeMount() {
        this.firstLoad = true;
    },
    async created() {
        await new Promise(resolve =>
            setTimeout(() => resolve((this.firstLoad = false)), 2000)
        );
        this.initialize();
    },

    methods: {
        getPublic(isPublic) {
            if (isPublic == true) return "done";
            else return "clear";
        },
        getColor(isPublic) {
            if (isPublic == false) return "error";
            else return "success";
        },
        async initialize() {
            let results = await UserApi.getCurrentUserRoutines(0, 999);
            results = results.results;
            console.log(results);
            this.myRoutines = results.splice(1);
        },

        async editItem(item) {
            const index = this.myRoutines.indexOf(item);
            const currentRoutineId = this.myRoutines[index].id;
            let response = await RoutinesApi.getRoutine(currentRoutineId);
            await this.store.toEditRoutine(response);
            await router.push("newroutines");
        },

        async deleteItem(item) {
            const index = this.myRoutines.indexOf(item);
            const currentRoutineId = this.myRoutines[index].id;
            confirm("Are you sure you want to delete this item?") &&
                (await this.store.deleteRoutineById(currentRoutineId));
            this.initialize();
        },

        watchItem(item) {
            const index = this.myRoutines.indexOf(item);
            const routine = this.myRoutines[index];
            this.detailed.id = routine.id;
            this.detailed.name = routine.name;
            this.detailed.detail = routine.detail;
            this.dialog2 = true;
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.myRoutines[this.editedIndex],
                    this.editedItem
                );
            } else {
                this.myRoutines.push(this.editedItem);
            }
            this.close();
        },
        calculateDifficulty(difficulty) {
            console.log(difficulty);
            switch (difficulty) {
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
        },
        goToCreate() {
            router.push("newroutines");
        },
        showItem(item) {
            console.log(item);
        }
    }
};
</script>

<style scoped></style>
