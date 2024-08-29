import menuplanModel from '../models/menuplanModel.js'


export async function saveEachMeal(meals, person_id, menuplan_id){
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
            const meal_id = await menuplanModel.saveMeal(meal_name, meal_description, person_id, menuplan_id, meal_title)
            meal_ids.push(meal_id)
        }
    }
    return meal_ids
}