'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getRecipeById } from '../../../data/recipes';
import { useAuth } from '../../../context/AuthContext';
import MainLayout from '../../../components/MainLayout';
import LandingPage from '../../../components/LandingPage';

export default function RecipeDetail() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id ? parseInt(params.id as string, 10) : null;
  const fromMood = searchParams.get('mood');
  const [isClient, setIsClient] = useState(false);
  
  const [recipe, setRecipe] = useState(id ? getRecipeById(id) : null);
  
  useEffect(() => {
    setIsClient(true);
    
    if (!id) {
      router.push('/');
      return;
    }
    
    const foundRecipe = getRecipeById(id);
    if (!foundRecipe) {
      router.push('/');
      return;
    }
    
    setRecipe(foundRecipe);
  }, [id, router]);
  
  // Show loading state
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-recipe-purple">Loading...</div>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!user) {
    return <LandingPage />;
  }
  
  if (!recipe) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          {fromMood ? (
            <Link href={`/recipes/${fromMood}`} className="text-recipe-purple hover:underline inline-flex items-center">
              ← Back to {fromMood} recipes
            </Link>
          ) : (
            <Link href="/" className="text-recipe-purple hover:underline inline-flex items-center">
              ← Back to moods
            </Link>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-4xl font-bold text-recipe-purple mb-2 md:mb-0">{recipe.name}</h1>
              <span className="bg-recipe-yellow text-recipe-purple px-4 py-1 rounded-full text-sm font-medium capitalize">
                {recipe.cuisine}
              </span>
            </div>
            
            <p className="text-xl mb-8">{recipe.description}</p>
            
            {fromMood && recipe.moodExplanations[fromMood] && (
              <div className="mb-8 p-4 bg-recipe-purple/5 rounded-md border-l-4 border-recipe-purple">
                <h2 className="text-lg font-semibold mb-2">Why this recipe is perfect when you're feeling {fromMood}:</h2>
                <p className="text-gray-700 italic">
                  {recipe.moodExplanations[fromMood]}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-recipe-green/10 rounded-lg p-4 flex-1">
                <span className="block text-sm text-gray-600">Prep Time</span>
                <span className="font-medium">{recipe.prepTime} minutes</span>
              </div>
              <div className="bg-recipe-green/10 rounded-lg p-4 flex-1">
                <span className="block text-sm text-gray-600">Cook Time</span>
                <span className="font-medium">{recipe.cookTime} minutes</span>
              </div>
              <div className="bg-recipe-green/10 rounded-lg p-4 flex-1">
                <span className="block text-sm text-gray-600">Servings</span>
                <span className="font-medium">{recipe.servings}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-recipe-red mr-2">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="bg-recipe-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 