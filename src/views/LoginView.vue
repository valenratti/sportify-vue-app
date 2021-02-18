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
                    <v-card min-width="250" max-width="350" elevation="3">
                        <v-card-title>Login</v-card-title>
                        <v-form v-model="valid" ref="loginForm" class="px-4 ">
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
                            <h5 v-if="invalidCredentials" class="red--text">
                                Invalid username or password
                            </h5>
                            <v-container class="">
                                <v-row no-gutters>
                                    <v-col align="end">
                                        <v-btn
                                            class="mb-3"
                                            text
                                            x-small
                                            color="blue"
                                        >
                                            Forgot your password?
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-container class="mt-n4">
                                    <v-row>
                                        <template>
                                            <v-dialog
                                                v-model="dialog"
                                                width="500"
                                            >
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs
                                                    }"
                                                >
                                                    <v-btn
                                                        class="mx-auto"
                                                        color="purple lighten-2"
                                                        depressed
                                                        :disabled="!valid"
                                                        @click="login"
                                                        v-on="on"
                                                        v-bind="attrs"
                                                        @keyup.enter="login"
                                                    >
                                                        Sign In
                                                    </v-btn>
                                                </template>
                                            </v-dialog>
                                        </template>
                                    </v-row>
                                    <v-row>
                                        <v-divider
                                            class="mt-3 mb-2"
                                        ></v-divider>
                                    </v-row>
                                    <v-row>
                                        <v-btn
                                            text
                                            class="mx-auto"
                                            color="purple lighten-2"
                                            to="/register"
                                        >
                                            Sign Up
                                        </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { UserApi, Credentials } from "@/api/user";
import router from "@/router";

export default {
    name: "LoginView",
    data: () => ({
        valid: false,
        dialog: false,
        notVerified: false,
        invalidCredentials: false,
        verifyAccount: false,
        username: "",
        rulesUsername: [value => !!value || "Username is required"],
        password: "",
        show: false,
        title: "User invalid!",
        detail: "You must validate your user first",
        confirmMessage: "Resend Email"
        // rulesPassword: [
        //     value => !!value || "Password is required",
        //     value => {
        //         const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        //         return (
        //             pattern.test(value) ||
        //             "Min. 8 characters with at least one capital letter, a number and a special character."
        //         );
        //     }
        // ]
    }),
    components: {},
    methods: {
        async login() {
            let credentials = new Credentials(this.username, this.password);
            try {
                await UserApi.login(credentials);
                await router.push("home");
            } catch (error) {
                if (error.code === 4) this.invalidCredentials++;
                console.log(error);
                if (error.code === 8) {
                    this.notVerified++;
                }
            }
        },
        async routeToToken() {}
    }
};
</script>

<style></style>
