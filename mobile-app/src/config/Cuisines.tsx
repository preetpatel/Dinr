export default interface Cuisine {
  name: string,
  selected: boolean,
  id: number,
}

const cuisineNames: string[] = [
  "African", "American", "Arabian", "Asian", "BBQ", "Bakery", "British", "Bubble Tea", "Burger", "Cafe Food", 
  "Chinese", "Coffee and Tea", "Continental", "Desserts", "European", "Fast Food", "French", "Healthy Food", 
  "Ice Cream", "Indian", "Italian", "Japanese", "Juices", "Kebab", "Korean", "Mexican", "Middle Eastern", 
  "Oriental", "Pizza", "Spanish", "Street Food", "Sushi", "Thai", "Vietnamese", "Vegan", "Vegetarian",
];

export const cuisines: Cuisine[] = cuisineNames.map((cuisineName, index) => {
  return ({
    name: cuisineName,
    selected: false,
    id: index,
  });
});