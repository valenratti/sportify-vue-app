<template>
    <v-card color="background">
        <v-card-title class="headline">
            {{ title }}
        </v-card-title>
        <v-card-subtitle class="pt-2">{{ detail }}</v-card-subtitle>

        <v-divider></v-divider>
        <v-card-text>
            <v-expansion-panels hover flat>
                <v-expansion-panel
                    v-for="(value, name, i) in cycles"
                    :key="i"
                    class="background"
                >
                    <v-container>
                        <v-row no-gutters>
                            <v-col>
                                <v-expansion-panel-header>
                                    {{ value.name }}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <RoutineCardDetailedExercises
                                        :name="value.name"
                                        :routineId="id"
                                        :cycleId="value.id"
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
                                                readonly
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
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog">
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { RoutinesApi } from "@/api/routines";
import RoutineCardDetailedExercises from "@/components/RoutineCardDetailedExercises.vue";
export default {
    name: "RoutineCardDetailed",
    components: {
        RoutineCardDetailedExercises
    },
    props: {
        title: {
            type: String
        },
        detail: {
            type: String
        },
        id: {
            type: Number
        }
    },
    async created() {
        const response = await RoutinesApi.getCycles(this.id);
        this.cycles = response.results;
    },
    methods: {
        closeDialog() {
            this.$emit("dialog");
        }
    },
    data: () => ({
        cycles: []
    })
};
</script>

<style></style>
