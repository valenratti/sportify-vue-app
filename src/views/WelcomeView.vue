<template>
    <v-main class="secondary">
        <v-img dark src="@/assets/Welcome.jpg" class="bg" height="850" contain>
            <!--            src="https://cdn.pixabay.com/photo/2017/04/22/10/15/sport-2250970_1280.jpg"-->

            <v-container>
                <v-row justify="center" no-gutters class="py-18">
                    <v-col :xl="6" :lg="6" :md="6" :sm="10" cols="10">
                        <v-textarea
                            readonly
                            auto-grow
                            solo
                            class=""
                            :value="message"
                            background-color="primary"
                            max-width="200"
                        ></v-textarea>
                    </v-col>
                    <v-col :xl="6" :lg="6" :md="6" :sm="10" cols="10">
                        <v-row justify="center" no-gutters class="mt-6">
                            <v-btn color="primary" width="33%" to="register"
                                >Get started</v-btn
                            >
                        </v-row>
                        <v-row justify="center" no-gutters class="mt-6">
                            <v-btn
                                outlined
                                color="primary"
                                width="33%"
                                to="/login"
                                >Sign in</v-btn
                            >
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </v-main>
</template>

<script>
export default {
    name: "WelcomeView",
    components: {},
    data: () => ({
        message:
            "Welcome to Sportify! With us, you can show your amazing routines to many people outside there!\nExplore other trainers routines too and improve your knowledge about exercising! "
    })
};
</script>
