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
                        class="pb-6 background"
                    >
                        <v-card-title>Register</v-card-title>
                        <v-form v-model="valid" ref="toke" class="px-4 ">
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
                                v-model="username"
                                label="Username"
                                prepend-inner-icon="person"
                                :rules="rulesUsername"
                                filled
                                shaped
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                prepend-inner-icon="lock"
                                :type="show ? 'text' : 'password'"
                                :append-icon="
                                    show ? 'visibility' : 'visibility_off'
                                "
                                :rules="rulesPassword"
                                filled
                                shaped
                                :hint="
                                    rulesPassword
                                        ? 'It looks nice!'
                                        : 'At least 8 characters'
                                "
                                @click:append="show = !show"
                                required
                            >
                            </v-text-field>
                            <v-card-actions>
                                <v-btn
                                    class="mx-auto"
                                    color="purple lighten-2"
                                    depressed
                                    :disabled="!valid"
                                    @click="register"
                                >
                                    Sign Up
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
    name: "RegisterView",
    data: () => ({
        valid: true,
        email: "",
        rulesEmail: [
            value => !!value || "Email is required",
            value => /.+@.+\..+/.test(value) || "Invalid email"
        ],
        username: "",
        rulesUsername: [value => !!value || "Username is required"],
        password: "",
        show: false,
        rulesPassword: [
            value => !!value || "Password is required",
            value => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
                return (
                    pattern.test(value) ||
                    "Min. 8 characters with at least one capital letter, a number and a special character."
                );
            }
        ]
    }),
    components: {},
    methods: {
        async register() {
            let registerCredentials = {
                username: this.username,
                password: this.password,
                fullName: "",
                gender: "male",
                birthdate: 0,
                email: this.email,
                phone: "0",
                avatarUrl: ""
            };
            console.log(registerCredentials);
            try {
                console.log(registerCredentials);
                let response = await UserApi.register(registerCredentials);
                console.log(response);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            await router.push("token");
        }
    }
};
</script>
