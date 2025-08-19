'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getRecipesByMood, moods } from '../../../data/recipes';
import RecipeCard from '../../../components/RecipeCard';
import { useAuth } from '../../../context/AuthContext';
import MainLayout from '../../../components/MainLayout';
import LandingPage from '../../../components/LandingPage';

export default function RecipesByMood() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const moodId = params.moodId as string;
  const [isClient, setIsClient] = useState(false);
  
  const [selectedMood, setSelectedMood] = useState(moods.find(m => m.id === moodId));
  const [recipes, setRecipes] = useState(getRecipesByMood(moodId));

  useEffect(() => {
    setIsClient(true);
    
    if (!moodId || !moods.some(m => m.id === moodId)) {
      router.push('/');
      return;
    }
    
    setSelectedMood(moods.find(m => m.id === moodId));
    setRecipes(getRecipesByMood(moodId));
  }, [moodId, router]);

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

  if (!selectedMood) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-recipe-purple hover:underline inline-flex items-center">
            ← Back to moods
          </Link>
        </div>
        
        <header className="text-center mb-12">
          <div className="emoji-lg mb-4">{selectedMood.emoji}</div>
          <h1 className="text-4xl font-bold text-recipe-purple">
            {selectedMood.name} Recipes
          </h1>
          <p className="text-xl mt-4">
            {selectedMood.description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl">No recipes found for this mood.</p>
              <Link href="/" className="btn-primary mt-4 inline-block">
                Try another mood
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 