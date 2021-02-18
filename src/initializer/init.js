import { UserApi } from "@/api/user";
import { CategoriesApi } from "@/api/categories";
import { RoutinesApi } from "@/api/routines";

export { Initializer };

class Initializer {
    static async initializeEverything() {
        await UserApi.loginWithJohnDoe();
        await this.createCategories();
        await this.createGodRoutine();
        await this.createExercises();
        await UserApi.logout();
    }

    static async createCategories() {
        let categories = [];
        categories[0] = {
            name: "Aerobic",
            detail: "Aerobic"
        };
        categories[1] = {
            name: "Flexibility",
            detail: "Flexibility"
        };
        categories[2] = {
            name: "Strength",
            detail: "Strength"
        };
        categories[3] = {
            name: "Full Body",
            detail: "Full Body"
        };
        categories[4] = {
            name: "Resistance",
            detail: "Resistance"
        };
        categories.forEach(
            async category => await CategoriesApi.addCategory(category)
        );
    }

    static async createGodRoutine() {
        let godRoutine = {
            name: "God Routine",
            detail: "God Routine",
            isPublic: true,
            difficulty: "rookie",
            category: {
                id: 1
            }
        };
        let godCycle = {
            name: "God Cycle",
            detail: "God Cycle",
            type: "warmup",
            order: 1,
            repetitions: 1
        };
        await RoutinesApi.addRoutine(godRoutine);
        await RoutinesApi.addCycle(1, godCycle);
    }

    static async createExercises() {
        let exercisesList = [
            {
                name: "Abdominales",
                detail: "Abdominales",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 1
            },
            {
                name: "Flexiones",
                detail: "Flexiones",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 2
            },
            {
                name: "Sentadillas",
                detail: "Sentadillas",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 3
            },
            {
                name: "Estocadas",
                detail: "Estocadas",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 4
            },
            {
                name: "Espinales",
                detail: "Espinales",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 5
            },
            {
                name: "Elongacion",
                detail: "Elongacion",
                type: "exercise",
                duration: 30,
                repetitions: 10,
                order: 6
            }
        ];
        let images = [
            {
                number: 1,
                url:
                    "https://media.mercola.com/ImageServer/Public/2020/January/Nonlead/abdominales.jpg"
            },
            {
                number: 1,
                url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtd4_P6MVjpeSrslKWDNLYco1-gPf-PWpb0w&usqp=CAU"
            },
            {
                number: 1,
                url:
                    "https://i2.wp.com/www.entrenamiento.com/wp-content/uploads/2019/08/diferencias-sentadilla-normal-sumo.jpg?ssl=1"
            },
            {
                number: 1,
                url:
                    "https://images.clarin.com/2018/06/26/SyqecHbG7_720x0__1.jpg"
            },
            {
                number: 1,
                url:
                    "https://i.pinimg.com/originals/cf/8a/1e/cf8a1e357d1138c1ff3ff9751b57127b.jpg"
            },
            {
                number: 1,
                url:
                    "https://rutinasentrenamiento.com/wp-content/uploads/ejercicios-de-elongacion-istock.jpg"
            }
        ];
        await Promise.all(
            exercisesList.map(
                async exercise => await RoutinesApi.addExercise(1, 1, exercise)
            )
        ).then(
            async () =>
                await Promise.all(
                    images.map(
                        async (image, index) =>
                            await RoutinesApi.addImage(1, 1, index + 1, image)
                    )
                )
        );
    }
}
