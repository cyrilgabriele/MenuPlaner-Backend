import mealModel from "../models/mealModel.js"

export async function saveEachMeal(meals, menuplan_id){
    const meal_ids = []
    for(const day in meals) {
        console.log(day)
        for(const meal_name in meals[day]) {
            // console.log(meal_name)
            const meal = meals[day][meal_name]
            // console.log("meals[day][meal_name].title: ", meal.title)
            // console.log("meals[day][meal_name].description: ", meal.description)
            const meal_description = meal.description
            const meal_title = meal.title
            // TODO: this call should happen in a controller (menu or menuplan?) but not here!
            // here only do the data transformation
            const meal_id = await mealModel.saveMeal(meal_name, meal_description, menuplan_id, meal_title)
            meal_ids.push(meal_id)
        }
    }
    return meal_ids
}