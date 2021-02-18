<template>
    <v-card color="background">
        <v-card-title class="headline">
            {{ msg }}
        </v-card-title>

        <v-card-subtitle class="pt-2">{{ detail }}</v-card-subtitle>
        <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="email"
            :rules="rulesEmail"
            filled
            shaped
            required
            class="px-5"
        >
        </v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="closeDialog">
                Send
            </v-btn>
            <v-btn color="error" text @click="closeDialog">
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "mailSent.vue",
    props: {
        msg: {
            type: String
        },
        detail: {
            type: String
        }
    },
    methods: {
        closeDialog() {
            this.$emit("dialog");
        },
        sendEmail() {}
    },
    data: () => ({
        email: "",
        rulesEmail: [
            value => !!value || "Email is required",
            value => /.+@.+\..+/.test(value) || "Invalid email"
        ]
    })
};
</script>

<style scoped></style>
