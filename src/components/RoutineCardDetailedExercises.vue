<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="myExercises"
            sort-by="Exercise"
            disable-pagination
            hide-default-footer
            class="background"
        >
        </v-data-table>
        <v-overlay :value="loader" absolute>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { RoutinesApi } from "@/api/routines";
export default {
    name: "RoutineCardDetailedExercises.vue",
    props: {
        name: {
            type: String
        },
        routineId: {
            type: Number
        },
        cycleId: {
            type: Number
        }
    },
    data: () => ({
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
            { text: "Type", value: "type" }
        ],
        myExercises: [],
        loader: false
    }),
    async created() {
        await this.initialize();
    },
    methods: {
        async initialize() {
            this.loader = true;
            let response = await RoutinesApi.getExercises(
                this.routineId,
                this.cycleId
            );
            this.loader = false;
            this.myExercises = response.results;
        }
    }
};
</script>

<style></style>
