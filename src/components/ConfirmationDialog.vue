<template>
    <v-dialog :value="dialog" max-width="400" persistent>
        <v-card>
            <v-card-title class="headline">
                {{ dialogTitle }}
            </v-card-title>
            <v-card-text>
                <p>{{ message }}</p>
            </v-card-text>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="cancel">
                    Close
                </v-btn>
                <v-btn color="success" text @click="confirm">
                    {{ confirmMessage }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { UserApi } from "@/api/user";
import router from "@/router";

export default {
    name: "ConfirmationDialog",
    props: {
        dialog: {
            type: Boolean
        },
        dialogTitle: {
            type: String
        },
        message: {
            type: String
        },
        confirmMessage: {
            type: String
        }
    },
    data: () => ({
        email: ""
    }),
    methods: {
        async confirm() {
            let email = {
                email: this.email
            };
            console.log(email);
            await UserApi.resendMail(email);
            await router.push("token");
        },
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>

<style></style>
