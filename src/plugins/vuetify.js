import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "md" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
            light: {
                primary: "#7400b8",
                secondary: "#DDA7FF",
                contrast: "#000000",
                success: "#4CAF50",
                error: "#b71c1c",
                rating: "#fcba03",
                background: "#fdfff2"
            },
            dark: {
                primary: "#DDA7FF",
                secondary: "#7400b8",
                contrast: "#FFFFFF",
                success: "#4083E7",
                error: "#b71c1c",
                rating: "#fcba03",
                background: "#222023"
            }
        }
    }
});
