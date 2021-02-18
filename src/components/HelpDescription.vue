<template>
    <v-timeline>
        <v-timeline-item
            v-for="(text, i) in steps"
            :key="i"
            :class="i % 2 == 0 ? undefined : 'text-right'"
            color="secondary"
            :icon="i == steps.length - 1 ? 'check' : 'arrow_downward'"
            fill-dot
        >
            {{ text }}
        </v-timeline-item>
    </v-timeline>
</template>

<script>
export default {
    name: "HelpDescription",
    props: {
        steps: {
            type: Array
        }
    }
};
</script>

<style></style>
