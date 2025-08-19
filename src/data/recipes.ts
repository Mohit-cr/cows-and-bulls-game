export type Recipe = {
  id: number;
  name: string;
  cuisine: 'indian' | 'italian';
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  image: string;
  moods: string[];
  moodExplanations: {
    [key: string]: string; // mood id -> explanation of why this recipe suits this mood
  };
};

export type Mood = {
  id: string;
  name: string;
  description: string;
  emoji: string;
};

export const moods: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    description: 'Vibrant and joyful recipes to celebrate good times',
    emoji: '😊'
  },
  {
    id: 'sad',
    name: 'Sad',
    description: 'Comfort food to lift your spirits',
    emoji: '😔'
  },
  {
    id: 'stressed',
    name: 'Stressed',
    description: 'Easy and calming recipes to help you relax',
    emoji: '😓'
  },
  {
    id: 'energetic',
    name: 'Energetic',
    description: 'Quick and spicy dishes for when you feel active',
    emoji: '⚡'
  },
  {
    id: 'lazy',
    name: 'Lazy',
    description: 'Simple, minimal-effort recipes for low-energy days',
    emoji: '😴'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Special dishes perfect for date night',
    emoji: '❤️'
  }
];

export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Butter Chicken',
    cuisine: 'indian',
    description: 'Creamy, tomato-based curry with tender chicken pieces',
    ingredients: [
      '500g boneless chicken',
      '2 tbsp butter',
      '1 large onion, finely chopped',
      '2 tbsp ginger-garlic paste',
      '2 cups tomato puree',
      '1 cup heavy cream',
      '2 tsp garam masala',
      '1 tsp red chili powder',
      '1 tsp turmeric',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    instructions: [
      'Marinate chicken with yogurt, ginger-garlic paste, and spices for 1 hour',
      'In a pan, heat butter and sauté onions until golden brown',
      'Add tomato puree and cook for 10 minutes',
      'Add marinated chicken and cook until done',
      'Pour in cream and simmer for 5-10 minutes',
      'Garnish with fresh coriander and serve with naan'
    ],
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    image: '/images/butter-chicken.jpg',
    moods: ['happy', 'sad', 'romantic'],
    moodExplanations: {
      happy: "The rich flavors and festive nature of Butter Chicken make it perfect for celebrating happy moments. Its vibrant color and indulgent taste boost your joyful mood.",
      sad: "The warm, comforting creaminess of Butter Chicken serves as the ultimate comfort food when you are feeling down. The richness envelops you like a culinary hug.",
      romantic: "Sharing this luxurious dish creates an intimate dining experience. The aromatic spices stimulate the senses while the richness feels indulgent and special."
    }
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    cuisine: 'italian',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    ingredients: [
      'Pizza dough',
      '3 tbsp tomato sauce',
      '150g fresh mozzarella',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt to taste'
    ],
    instructions: [
      'Preheat oven to 475°F (245°C)',
      'Roll out the pizza dough on a floured surface',
      'Spread tomato sauce evenly on the dough',
      'Add torn pieces of fresh mozzarella',
      'Bake for 10-12 minutes until crust is golden',
      'Top with fresh basil leaves and drizzle with olive oil'
    ],
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    image: '/images/margherita-pizza.jpg',
    moods: ['happy', 'lazy', 'energetic'],
    moodExplanations: {
      happy: "Pizza is universally associated with good times! The simple, balanced flavors of a Margherita pizza bring joy through its perfect combination of cheesy, tangy, and herbal notes.",
      lazy: "When you are feeling lazy, Margherita pizza offers maximum flavor with minimal effort. It is easy to prepare or order in, satisfying your cravings without complex cooking.",
      energetic: "The carbohydrates in the pizza base provide quick energy, while the light toppings will not weigh you down. It is perfect fuel for an active day ahead."
    }
  },
  {
    id: 3,
    name: 'Masala Chai',
    cuisine: 'indian',
    description: 'Aromatic spiced tea with milk',
    ingredients: [
      '2 cups water',
      '1 cup milk',
      '2 tbsp black tea leaves',
      '1 inch ginger, crushed',
      '2-3 cardamom pods',
      '1 cinnamon stick',
      '2-3 cloves',
      'Sugar to taste'
    ],
    instructions: [
      'Boil water with all the spices for 3-4 minutes',
      'Add tea leaves and simmer for 2 minutes',
      'Add milk and bring to a boil',
      'Strain and serve hot with sugar'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    image: '/images/masala-chai.jpg',
    moods: ['sad', 'stressed', 'lazy'],
    moodExplanations: {
      sad: "The warming spices in Masala Chai help elevate your mood naturally. The ritual of sipping hot tea provides emotional comfort during sad moments.",
      stressed: "The aromatic spices in chai have calming properties that help reduce stress and anxiety. The gentle process of brewing and sipping tea forces you to slow down and be present.",
      lazy: "Masala Chai requires minimal effort but delivers maximum comfort. The caffeine provides a gentle pick-me-up without requiring you to leave your cozy spot."
    }
  },
  {
    id: 4,
    name: 'Risotto ai Funghi',
    cuisine: 'italian',
    description: 'Creamy mushroom risotto with parmesan',
    ingredients: [
      '300g Arborio rice',
      '250g mixed mushrooms',
      '1 onion, finely chopped',
      '2 cloves garlic, minced',
      '1 liter vegetable stock',
      '100g grated parmesan',
      '2 tbsp butter',
      'Handful of parsley',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a pan, sauté mushrooms until golden and set aside',
      'In the same pan, sauté onion and garlic until soft',
      'Add rice and toast for 2 minutes',
      'Gradually add hot stock, stirring constantly',
      'Cook until rice is creamy but still has a slight bite',
      'Stir in mushrooms, butter, and parmesan',
      'Garnish with parsley and serve immediately'
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    image: '/images/mushroom-risotto.jpg',
    moods: ['romantic', 'sad', 'stressed'],
    moodExplanations: {
      romantic: "The slow, meditative stirring process makes risotto an act of love. The luxurious, creamy texture and earthy mushrooms create an elegant dish perfect for a romantic dinner.",
      sad: "The creamy, carb-rich nature of risotto makes it the ultimate comfort food. The umami flavors from mushrooms help stimulate your taste buds when feeling down.",
      stressed: "The rhythmic stirring required for risotto functions as a form of culinary meditation, helping ease your mind. The warm, creamy result soothes both body and soul."
    }
  },
  {
    id: 5,
    name: 'Chana Masala',
    cuisine: 'indian',
    description: 'Spicy chickpea curry with tangy flavors',
    ingredients: [
      '2 cans chickpeas, drained',
      '1 large onion, chopped',
      '2 tomatoes, chopped',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 tbsp ginger-garlic paste',
      '2 tsp coriander powder',
      '1 tsp cumin powder',
      '1/2 tsp turmeric',
      '1 tsp garam masala',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat oil and add cumin seeds until they splutter',
      'Add onions and sauté until golden brown',
      'Add ginger-garlic paste and cook for 1 minute',
      'Add tomatoes and spices, cook until oil separates',
      'Add chickpeas and 1 cup water, simmer for 15 minutes',
      'Garnish with fresh cilantro and serve with rice or naan'
    ],
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    image: '/images/chana-masala.jpg',
    moods: ['energetic', 'lazy', 'happy'],
    moodExplanations: {
      energetic: "Packed with protein and complex carbs from chickpeas, Chana Masala provides sustained energy. The spices invigorate your senses and metabolism when you are feeling active.",
      lazy: "Using canned chickpeas makes this a low-effort but highly satisfying meal. It is nutritionally complete and comes together quickly with minimal prep.",
      happy: "The vibrant spices and tangy flavors in Chana Masala stimulate the palate and bring joy. It is hearty and satisfying without feeling heavy, perfect for maintaining your good mood."
    }
  },
  {
    id: 6,
    name: 'Pasta Carbonara',
    cuisine: 'italian',
    description: 'Classic creamy pasta with pancetta and egg',
    ingredients: [
      '400g spaghetti',
      '150g pancetta or bacon, diced',
      '3 large eggs',
      '50g pecorino cheese, grated',
      '50g parmesan, grated',
      '2 cloves garlic, minced',
      'Freshly ground black pepper',
      'Salt to taste'
    ],
    instructions: [
      'Cook pasta in salted water until al dente',
      'In a pan, cook pancetta until crispy',
      'Whisk eggs, cheese, and black pepper in a bowl',
      'Drain pasta, reserving some pasta water',
      'Add hot pasta to the pancetta pan (off heat)',
      'Quickly stir in the egg mixture to create a creamy sauce',
      'Add a splash of pasta water if needed',
      'Serve immediately with extra cheese and black pepper'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image: '/images/pasta-carbonara.jpg',
    moods: ['lazy', 'happy', 'romantic'],
    moodExplanations: {
      lazy: "Carbonara comes together in just minutes with minimal ingredients. Its rich, satisfying nature makes it the perfect lazy day indulgence that feels like you put in much more effort.",
      happy: "The combination of creamy eggs, salty pancetta, and perfectly cooked pasta creates a harmony of flavors that brings instant joy. It is simple yet deeply satisfying.",
      romantic: "There is something intimate about sharing a plate of silky carbonara. Its luxurious texture and the fact that it must be eaten immediately makes it perfect for staying in the moment with your partner."
    }
  },
  {
    id: 7,
    name: 'Paneer Tikka',
    cuisine: 'indian',
    description: 'Grilled cottage cheese cubes marinated in spices',
    ingredients: [
      '400g paneer, cubed',
      '1 bell pepper, cubed',
      '1 onion, cubed',
      '1/2 cup yogurt',
      '2 tbsp ginger-garlic paste',
      '1 tsp red chili powder',
      '1 tsp cumin powder',
      '1 tsp garam masala',
      '1 tsp chaat masala',
      '2 tbsp oil',
      'Lemon wedges for serving'
    ],
    instructions: [
      'Mix yogurt with all spices to make marinade',
      'Add paneer, bell pepper, and onion; marinate for 2 hours',
      'Thread onto skewers',
      'Grill or bake at 200°C for 15 minutes, turning halfway',
      'Brush with oil occasionally',
      'Serve hot with mint chutney and lemon wedges'
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    image: '/images/paneer-tikka.jpg',
    moods: ['energetic', 'happy', 'romantic'],
    moodExplanations: {
      energetic: "Protein-rich paneer provides sustained energy without heaviness. The bold, spicy flavors awaken your senses and the colorful presentation matches your vibrant mood.",
      happy: "The vibrant colors and bold flavors of Paneer Tikka are a celebration on a plate. The interactive nature of eating grilled skewers adds to the fun factor.",
      romantic: "Sharing these flavorful skewers creates an interactive dining experience. The aromatic spices stimulate the senses, and the finger food aspect adds playfulness to a romantic meal."
    }
  },
  {
    id: 8,
    name: 'Tiramisu',
    cuisine: 'italian',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    ingredients: [
      '250g mascarpone cheese',
      '3 eggs, separated',
      '100g sugar',
      '200g ladyfinger biscuits',
      '1 cup strong coffee, cooled',
      '2 tbsp cocoa powder',
      '2 tbsp marsala wine (optional)'
    ],
    instructions: [
      'Beat egg yolks with half the sugar until pale',
      'Mix in mascarpone until smooth',
      'In a separate bowl, beat egg whites with remaining sugar until stiff peaks form',
      'Gently fold egg whites into mascarpone mixture',
      'Dip ladyfingers briefly in coffee (and wine if using)',
      'Arrange a layer of soaked ladyfingers in a dish',
      'Top with half the mascarpone mixture',
      'Repeat layering and finish with mascarpone',
      'Dust with cocoa powder and refrigerate for at least 4 hours'
    ],
    prepTime: 30,
    cookTime: 0,
    servings: 6,
    image: '/images/tiramisu.jpg',
    moods: ['sad', 'romantic', 'happy'],
    moodExplanations: {
      sad: "The combination of coffee, chocolate, and creamy mascarpone in Tiramisu offers both comfort and a gentle mood lift. The name literally means \"pick me up\" in Italian!",
      romantic: "This elegant, indulgent dessert is perfect for sharing. The sensual textures and subtle coffee-chocolate flavor create a memorable end to a romantic meal.",
      happy: "The playful layers and contrasting textures of Tiramisu bring joy with every spoonful. It is a celebratory dessert that feels special and enhances your happy mood."
    }
  }
];

export const getRecipesByMood = (moodId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.moods.includes(moodId));
};

export const getRecipeById = (id: number): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
}; 