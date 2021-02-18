<template>
    <div>
        <NavBar />
        <v-main>
            <v-container>
                <v-row justify="center">
                    <v-col cols="auto">
                        <h1>Need some help?</h1>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-expansion-panels accordion focusable>
                            <v-expansion-panel
                                v-for="(item, i) in helpItems"
                                :key="i"
                            >
                                <v-expansion-panel-header>
                                    {{ item.title }}
                                    <template v-slot:actions>
                                        <v-icon color="primary">
                                            $expand
                                        </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <template>
                                        <HelpDescription
                                            :steps="item.description"
                                        />
                                    </template>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import HelpDescription from "@/components/HelpDescription";
export default {
    name: "HelpView",
    components: {
        NavBar,
        HelpDescription
    },
    data: () => ({
        helpItems: [
            {
                title: "How do I create a routine?",
                description: [
                    "Go to Create",
                    "Set up your routine on left side",
                    "Pick exercises on the right side",
                    "Voila!"
                ]
            },
            {
                title: "How do I create an exercise?",
                description: [
                    "Go to CREATE",
                    "Click on + NEW EXERCISE, on the right side",
                    "Follow the steps",
                    "The exercise created will apear on MY EXERCISES"
                ]
            },
            {
                title: "Can I see routines made by other people?",
                description: ["Of course! Go to EXPLORE", "Have fun!"]
            },
            {
                title: "Where can I see all my routines?",
                description: [
                    "Go to MY ROUTINES",
                    "You will be able to edit and delete your routines!"
                ]
            },
            {
                title: "Where can I see all my exercises?",
                description: [
                    "Go to MY EXERCISES",
                    "You will be able to edit and delete your exercises!"
                ]
            },
            {
                title: "How do I edit my profile information?",
                description: [
                    "Go to the profile icon on the top right side",
                    "Then click on MY PROFILE",
                    "You can edit your information by clicking on the edit button"
                ]
            }
        ]
    })
};
</script>

<style></style>
