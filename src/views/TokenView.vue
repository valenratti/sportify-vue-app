<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col cols="12" align-self="start">
                    <v-btn fab text @click="$router.back()">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-img src="@/assets/logo_botella2.png" min-width="260" max-width="360" />
            </v-row>
            <v-row justify="center">
                <v-col cols="4">
                    <v-card
                        min-width="250"
                        max-width="350"
                        elevation="3"
                        class="pb-6"
                    >
                        <v-card-title>Validation</v-card-title>
                        <v-form
                            v-model="valid"
                            ref="vadationForm"
                            class="px-4 "
                        >
                            <v-text-field
                                v-model="email"
                                label="Email"
                                prepend-inner-icon="email"
                                :rules="rulesEmail"
                                filled
                                shaped
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="code"
                                label="Validation code"
                                prepend-inner-icon="vpn_key"
                                filled
                                shaped
                                required
                            >
                            </v-text-field>
                            <v-card-actions>
                                <v-btn
                                    class="mx-auto"
                                    color="purple lighten-2"
                                    depressed
                                    :disabled="!valid"
                                    @click="validate"
                                >
                                    Validate Code
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { UserApi } from "@/api/user";
import router from "@/router";

export default {
    name: "TokenConfirmationView.vue",
    data: () => ({
        valid: true,
        email: "",
        rulesEmail: [
            value => !!value || "Email is required",
            value => /.+@.+\..+/.test(value) || "Invalid email"
        ],
        rulesToken: [
            value => !!value || "Validation code is required",
            value => /./.test(value) || "Invalid validation code"
        ],
        code: "",
        show: false
    }),
    components: {},
    methods: {
        async validate() {
            console.log(this.code);
            let validateData = {
                email: this.email,
                code: this.code
            };
            console.log(validateData);
            try {
                console.log(validateData);
                let response = await UserApi.validate(validateData);
                console.log(response);
                await router.push("login");
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style scoped></style>
