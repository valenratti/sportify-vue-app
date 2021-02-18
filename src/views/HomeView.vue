<template>
    <div>
        <NavBar />
        <v-main class="staatliches">
            <v-container fluid>
                <v-row class="mainButtons">
                    <v-col
                        cols="12"
                        sm="6"
                        v-for="(item, index) in buttons"
                        :key="index"
                    >
                        <main-card
                            :icon="item.icon"
                            :path="item.path"
                            :text="item.text"
                            :title="item.title"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>
<style scoped>
.mainButtons .v-btn:hover .v-icon {
    transform: scale(1.2);
}

.staatliches {
    font-family: "Poppins", sans-serif;
    font-weight: bold;
}
</style>

<script>
import NavBar from "@/components/NavBar";
import MainCard from "@/components/MainCard";

export default {
    name: "HomeView",
    components: { MainCard, NavBar },
    data: () => ({
        buttons: [
            {
                icon: "directions_run",
                text:
                    "Enter here and you will be able to see all your exercises. For each, you can see its detail, duration, repetitions and type. Also, you can delete and edit them.",
                path: "/myexercises",
                title: "Exercises"
            },
            {
                icon: "fitness_center",
                text:
                    "Enter here and you will be able to see all your routines. For each, you can see its difficulty, category, and more. Also, you can delete and edit them.",
                path: "/myroutines",
                title: "Routines"
            },
            {
                icon: "search",
                text:
                    "Run out of ideas? Take a look to all sportify routines, created by its whole community.",
                path: "/explore",
                title: "Explore"
            },
            {
                icon: "add",
                text:
                    "First, create exercises (or use the ones already created).\nThen, create cycles (or use the ones already created).\nLast, create your routine.",
                path: "/newroutines",
                title: "Create"
            }
        ]
    })
};
</script>
