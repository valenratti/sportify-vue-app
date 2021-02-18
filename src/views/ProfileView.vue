<template>
    <div>
        <NavBar />
        <v-main>
            <v-card class="mx-auto my-6 px-4" max-width="350">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="auto">
                            <v-avatar
                                id="avatar-img"
                                class="profile"
                                color="grey"
                                size="100"
                            >
                                <v-img
                                    v-if="hasProfileImage"
                                    :src="getImage"
                                    alt="User profile image"
                                >
                                </v-img>
                                <v-icon dark x-large v-else
                                    >mdi-account-circle</v-icon
                                >
                            </v-avatar>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-card-text>
                            <v-text-field
                                label="Username"
                                outlined
                                v-model="textFieldValues.username"
                                :readonly="readMode"
                            ></v-text-field>
                            <v-text-field
                                label="Full name"
                                outlined
                                :readonly="readMode"
                                v-model="textFieldValues.fullName"
                            ></v-text-field>
                            <v-text-field
                                label="E-mail"
                                outlined
                                readonly
                                v-model="textFieldValues.email"
                                :hint="readMode ? '' : 'Email cant be changed'"
                            ></v-text-field>
                            <v-text-field
                                label="Gender"
                                outlined
                                :readonly="readMode"
                                v-model="textFieldValues.gender"
                            ></v-text-field>
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                :disabled="readMode"
                                min-width="290px"
                            >
                                <template
                                    :v-if="!readMode"
                                    v-slot:activator="{ on, attrs }"
                                >
                                    <v-text-field
                                        v-model="textFieldValues.birthdate"
                                        label="Birth date"
                                        outlined
                                        v-bind="attrs"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    ref="picker"
                                    v-model="textFieldValues.birthdate"
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                    :min="minYear"
                                    :readonly="readMode"
                                ></v-date-picker>
                            </v-menu>
                        </v-card-text>
                    </v-row>
                    <v-row justify="center">
                        <v-card-actions>
                            <v-row v-if="readMode">
                                <v-btn
                                    color="primary"
                                    @click="readMode = false"
                                >
                                    <v-icon left>create</v-icon>
                                    Edit
                                </v-btn>
                            </v-row>
                            <v-row v-else no-gutters>
                                <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-col cols="auto">
                                            <v-btn
                                                text
                                                color="error"
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="cancelPreCheck"
                                            >
                                                <v-icon left>clear</v-icon>
                                                Cancel
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn
                                                depressed
                                                color="success"
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="savePreCheck"
                                            >
                                                <v-icon>save</v-icon>
                                                Save
                                            </v-btn>
                                        </v-col>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">
                                            {{ dialogTitle }}
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="error"
                                                text
                                                @click="cancel"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                color="green darken-1"
                                                text
                                                @click="performAction"
                                            >
                                                Ok
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                        </v-card-actions>
                    </v-row>
                </v-container>
            </v-card>
            <v-overlay :value="postLoader">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
        </v-main>
    </div>
</template>

<style scoped>
#avatar-img:hover > * {
    transform: scale(1.25);
}
</style>

<script>
import NavBar from "@/components/NavBar";
import { UserApi } from "@/api/user";
//import BirthdayPicker from "@/components/BirthdayPicker";

export default {
    name: "ProfileView",
    components: {
        NavBar
        //BirthdayPicker
    },
    data: () => ({
        show1: false,
        dialog: false,
        dialogTitle: "",
        action: "",
        hasProfileImage: false,
        readMode: true,
        postLoader: false,
        textFieldValues: {},
        numericBirthdate: 0,
        menu: false,
        minYear: "1900-01-01",
        rules: {
            required: value => !!value || "Required.",
            min: v => v.length >= 8 || "Min 8 characters",
            emailMatch: () => "The email and password you entered don't match"
        }
    }),
    mounted() {},
    watch: {
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
        }
    },
    async created() {
        await this.getUserData();
    },
    methods: {
        async getUserData() {
            let response = await UserApi.getCurrentUser();
            this.textFieldValues = response;
            this.textFieldValues.birthdate = this.formatDate(
                this.textFieldValues.birthdate
            );
        },
        performAction() {
            if (this.action === "save") this.save();
            else this.discard();
        },
        async save() {
            this.dialog = false;
            this.postLoader = true;
            this.numericBirthdate = this.textFieldValues.birthdate.split("-");
            this.numericBirthdate =
                new Date(
                    this.numericBirthdate[0],
                    this.numericBirthdate[1] - 1,
                    this.numericBirthdate[2]
                ) * 1;
            let userData = {
                username: this.textFieldValues.username,
                password: "",
                fullName: this.textFieldValues.fullName,
                gender: this.textFieldValues.gender,
                birthdate: this.numericBirthdate,
                email: this.textFieldValues.email,
                phone: "", //apendearle el godID
                avatarUrl: "https://flic.kr/p/3ntH2u"
            };
            console.log(userData);
            await UserApi.updateCurrentUser(userData);
            this.readMode = true;
            this.postLoader = false;
            await this.getUserData();
        },
        async discard() {
            this.dialog = false;
            this.readMode = true;
            await this.getUserData();
        },
        cancel() {
            this.dialog = false;
        },
        savePreCheck() {
            this.action = "save";
            this.dialogTitle = "Update profile?";
        },
        cancelPreCheck() {
            this.action = "cancel";
            this.dialogTitle = "Discard changes?";
        },
        getImage() {
            return this.avatarUrl;
        },
        formatDate(date) {
            this.numericBirthdate = date;
            var d = new Date(parseInt(date)),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        }
    }
};
</script>
