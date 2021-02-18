<template>
    <v-app class="bg">
        <div class="bg">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "App",
    components: {},
    data: () => ({})
};
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    background-image: url("./assets/fondo1.jpg");
    background-size: cover;
}

@import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,300&display=swap");
</style>
