'use client';

import Link from 'next/link';
import { type Recipe } from '../data/recipes';
import { useParams } from 'next/navigation';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const params = useParams();
  const currentMoodId = params.moodId as string;
  const moodExplanation = recipe.moodExplanations[currentMoodId];

  return (
    <div className="recipe-card h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-recipe-purple">{recipe.name}</h3>
          <span className="bg-recipe-yellow text-recipe-purple px-3 py-0.5 rounded-full text-xs font-medium capitalize">
            {recipe.cuisine}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="mb-4 p-3 bg-recipe-purple/5 rounded-md border-l-4 border-recipe-purple">
          <p className="text-gray-700 italic">
            {moodExplanation}
          </p>
        </div>
        
        <div className="flex gap-3 text-sm mb-6">
          <div>
            <span className="text-gray-500">Prep:</span> {recipe.prepTime}m
          </div>
          <div>
            <span className="text-gray-500">Cook:</span> {recipe.cookTime}m
          </div>
          <div>
            <span className="text-gray-500">Serves:</span> {recipe.servings}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <Link href={`/recipe/${recipe.id}?mood=${currentMoodId}`} className="btn-primary w-full block text-center">
          View Recipe
        </Link>
      </div>
    </div>
  );
} 