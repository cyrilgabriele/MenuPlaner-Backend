const menuplanUtils = {
    parseMenuplanWithMeals(queryResponse) {
        const max_id = getMaxId(queryResponse)
        const menu = {
            Monday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Tuesday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Wednesday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Thursday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Friday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Saturday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
            Sunday: { Breakfast: { title: '', description: '' }, Lunch: { title: '', description: '' }, Dinner: { title: '', description: '' } },
        }
        const recentMeals = queryResponse.filter(meal => meal.menuplan_id === max_id)

        recentMeals.forEach(meal => {
            const [day, mealType] = meal.meal_name.split('_')
            if (menu[day]) {
                menu[day][mealType] = {
                    title: meal.meal_title,
                    description: meal.meal_description
                }
            }
        })
        return menu
    }
}

function getMaxId(object) {
    var max_value = -1

    object.forEach(element => {
        const current_value = element.menuplan_id
        max_value = Math.max(max_value, current_value)
    })

    return max_value
}

export default menuplanUtils
