<template>
    <div>
        <NavBar />
        <v-main>
            <v-container>
                <v-row class="mt-3 px-3" justify="center">
                    <v-col cols="10">
                        <v-text-field
                            v-model="searchText"
                            class="rounded-pill "
                            prepend-inner-icon="search"
                            label="Search"
                            hint="At least 3 characters"
                            outlined
                            clearable
                            @click:clear="initialize"
                            @keydown.enter="search"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn rounded color="primary" @click="searched"
                            >Search</v-btn
                        >
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row justify="start" class="py-5">
                    <v-col>
                        <v-text-area solo class="text-h6"
                            >Search results for '{{ this.searchText }}'
                        </v-text-area>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-responsive class="overflow-y-auto" max-height="800">
                            <template v-if="loading">
                                <v-row>
                                    <v-col cols="3" v-for="i in 4" :key="i">
                                        <v-skeleton-loader
                                            type="article,actions"
                                            max-height="200"
                                        ></v-skeleton-loader>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-else>
                                <v-row>
                                    <v-col
                                        v-for="rutina in listaRutinas"
                                        :key="rutina.id"
                                        cols="3"
                                    >
                                        <!-- Aca en realidad es mejor hacer un binding del json rutina-->
                                        <RoutineCard
                                            :title="rutina.name"
                                            :author="rutina.author"
                                            :description="rutina.description"
                                            :detail="rutina.detail"
                                            :difficulty="rutina.difficulty"
                                            :id="rutina.id"
                                        />
                                    </v-col>
                                </v-row>
                            </template>
                        </v-responsive>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import RoutineCard from "@/components/RoutineCard.vue";
import { RoutinesApi } from "@/api/routines";
export default {
    name: "ExploreView",
    data: () => ({
        searchText: "",
        resultText: "all",
        loading: "",
        listaRutinas: [
            {
                name: "Rutina1",
                author: "Tommy",
                detail: "Compliqueti",
                difficulty: 4,
                datecreated: 1602646871112
            },
            {
                name: "Rutina2",
                author: "Sebastian",
                destail: "Compliqueti",
                difficulty: 5,
                datecreated: 1602646871112
            },
            {
                name: "Rutina3",
                author: "Lautaro",
                detail: "Compliqueti",
                difficulty: 2,
                datecreated: 1602646871112
            },
            {
                name: "Rutina4",
                author: "Valentin",
                detail: "Compliqueti",
                difficulty: 3,
                datecreated: 1602646871112
            }
        ],
        searchResult: undefined
    }),
    components: {
        NavBar,
        RoutineCard
    },
    beforeMount() {
        this.loading = true;
    },
    async created() {
        this.getAllRoutines();
        this.initialize();
    },
    methods: {
        async getAllRoutines() {
            await new Promise(resolve =>
                setTimeout(() => resolve((this.loading = false)), 2000)
            );
        },
        async initialize() {
            let results = await RoutinesApi.retrieveAllRoutines();
            results = results.results;
            this.listaRutinas = results.splice(1);
        },
        async searched() {
            if (this.searchText === "") {
                this.initialize();
            } else {
                if (this.searchText.length >= 3) {
                    let results = await RoutinesApi.retrieveAllRoutinesSearch(
                        this.searchText
                    );
                    results = results.results;
                    this.listaRutinas = results;
                    this.resultText = this.searchText;
                }
            }
        }
    },
    computed: {}
};
</script>

<style></style>
