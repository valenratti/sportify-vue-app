import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/WelcomeView.vue";
import Register from "../views/RegisterView.vue";
import Login from "../views/LoginView.vue";
import Home from "../views/HomeView.vue";
import Profile from "../views/ProfileView.vue";
import NotFound from "../views/NotFoundView.vue";
import MyRoutines from "../views/MyRoutines.vue";
import NewRoutines from "../views/NewRoutines.vue";
import Explore from "../views/ExploreView.vue";
import Help from "../views/HelpView.vue";
import MyExercises from "../views/MyExercisesView.vue";
import TokenView from "@/views/TokenView";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "WelcomeView",
        component: Welcome
    },
    {
        path: "/register",
        name: "RegisterView",
        component: Register
    },
    {
        path: "/login",
        name: "LoginView",
        component: Login
    },
    {
        path: "/myroutines",
        name: "MyRoutines",
        component: MyRoutines
    },
    {
        path: "/home",
        name: "HomeView",
        component: Home
    },
    {
        path: "/profile",
        name: "ProfileView",
        component: Profile
    },
    {
        path: "/newroutines",
        name: "NewRoutines",
        component: NewRoutines
    },
    {
        path: "/explore",
        name: "ExploreView",
        component: Explore
    },
    {
        path: "/help",
        name: "HelpView",
        component: Help
    },
    {
        path: "/myexercises",
        name: "MyExercises",
        component: MyExercises
    },
    {
        path: "/token",
        name: "VerifyAccount",
        component: TokenView
    },
    {
        path: "*",
        name: "404",
        component: NotFound
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/register", "/login", "/token"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("SavedToken");
    if (
        (to.path === "/login" ||
            to.path === "/register" ||
            to.path === "/token") &&
        loggedIn
    ) {
        next("/home");
        return;
    }

    if (authRequired && !loggedIn) {
        next("/login");
    } else {
        next();
    }
});

export default router;
