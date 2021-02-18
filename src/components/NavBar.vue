<template>
    <v-app-bar app color="secondary" dark>
        <div class="d-flex align-center justify-start">
            <v-btn
                text
                max-height="60"
                max-width="180"
                to="/home"
                id="home-btn"
                active-class="inactive"
            >
                <v-img
                    alt="Sportify Logo"
                    class="pl-0"
                    contain
                    src="@/assets/logo_botella2.png"
                    transition="scale-transition"
                    max-height="100"
                    max-width="200"
                />
            </v-btn>
        </div>

        <v-spacer></v-spacer>

        <div>
            <v-btn
                text
                color="contrast"
                v-for="(item, index) in nav_buttons"
                :key="index"
                :to="item.path"
                >{{ item.title }}</v-btn
            >
        </div>

        <v-spacer></v-spacer>

        <v-menu
            v-model="value"
            close-on-click="true"
            close-on-content-click="true"
            offset-y="true"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" text v-on="on">
                    <v-avatar size="75%">
                        <v-icon dark color="contrast">account_circle</v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list dense flat>
                <v-list-item
                    v-for="(item, index) in profile_overflow"
                    :key="index"
                    :to="item.element.path"
                    @click="logout(item.element.action)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.element.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title
                        v-text="item.element.title"
                    ></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
import { UserApi } from "@/api/user";
import router from "@/router";

export default {
    name: "NavBar",

    data: () => ({
        nav_buttons: [
            { title: "Home", path: "/home" },
            { title: "My Routines", path: "/myroutines" },
            { title: "My Exercises", path: "/myexercises" },
            { title: "Create", path: "/newroutines" },
            { title: "Explore", path: "/explore" }
        ],
        profile_overflow: [
            {
                element: {
                    title: "My Profile",
                    icon: "person",
                    path: "/profile"
                }
            },
            {
                element: {
                    title: "Help",
                    icon: "help_outline",
                    path: "/help"
                }
            },
            {
                element: {
                    title: "Sign Out",
                    icon: "exit_to_app",
                    path: "",
                    action: "logout"
                }
            }
        ]
    }),
    methods: {
        async test() {
            let userData = {
                username: "vsratti",
                fullName: "Valentin Segundo",
                gender: "male",
                password: "Valen4402*",
                birthdate: 284007600000,
                email: "valentinratti@sirius.com.ar",
                phone: "98295822",
                avatarUrl: "https://flic.kr/p/3ntH2u"
            };
            await UserApi.updateCurrentUser(userData);
        },
        async logout(action) {
            console.log(action);
            if (action === "logout") {
                await UserApi.logout();
                router.push("/");
            }
        }
    }
};
</script>
<style scoped>
#home-btn.inactive::before {
    opacity: 0 !important;
}
</style>
