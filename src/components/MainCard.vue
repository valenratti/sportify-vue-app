<template>
    <v-card class="background">
        <v-row>
            <v-col cols="4">
                <v-btn
                    color="secondary"
                    x-large
                    class="ma-9 pa-1"
                    width="175"
                    height="175"
                    :to="path"
                >
                    <v-icon size="60" color="contrast">{{ icon }}</v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-card-text class="pt-10 text-h4">{{ title }}</v-card-text>
                <v-card-text class="pt-0 pr-10 text-h7">{{ text }}</v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "MainCard.vue",
    props: {
        path: String,
        icon: String,
        text: String,
        title: String
    }
};
</script>

<style scoped>
.v-btn:hover .v-icon {
    transform: scale(1.2);
}
</style>
