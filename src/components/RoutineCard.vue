<template>
    <v-card class="mx-auto" max-width="250" color="background">
        <v-card-title class="text--center headerClass">{{
            title
        }}</v-card-title>

        <v-card-subtitle class="">
            {{ author }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <v-rating
                small
                length="5"
                readonly
                dense
                color="primary"
                background-color="grey"
                :value="difficultyParse"
                empty-icon="local_fire_department"
                full-icon="local_fire_department"
            ></v-rating>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" width="60%">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text right v-on="on" v-bind="attrs">
                        See more
                    </v-btn>
                </template>
                <RoutineCardDetailed
                    :title="title"
                    :id="id"
                    :detail="detail"
                    @dialog="dialog = false"
                />
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import RoutineCardDetailed from "./RoutineCardDetailed.vue";
export default {
    name: "RoutineCard",
    props: {
        title: {
            type: String
        },
        author: {
            type: String
        },
        difficulty: {
            type: Number
        },
        detail: {
            type: String
        },
        id: {
            type: Number
        }
    },
    components: {
        RoutineCardDetailed
    },
    data: () => ({
        dialog: false
    }),
    computed: {
        difficultyParse: function() {
            let val = 1;
            switch (this.difficulty) {
                case "rookie":
                    val = 1;
                    break;
                case "begginer":
                    val = 2;
                    break;
                case "intermediate":
                    val = 3;
                    break;
                case "advanced":
                    val = 4;
                    break;
                case "expert":
                    val = 5;
                    break;
            }
            return val;
        }
    }
};
</script>

<style scoped>
.headerClass {
    white-space: nowrap;
    word-break: normal;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
