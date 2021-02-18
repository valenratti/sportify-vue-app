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
                            ref="registerForm"
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
export default {
    name: "TokenConfirmationView.vue"
};
</script>

<style scoped></style>
