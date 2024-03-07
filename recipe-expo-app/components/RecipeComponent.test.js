import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import Recipe from './RecipeComponent';
import { AuthProvider } from "../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    // Other methods as needed
  }));

const mockNavigation = {
    setOptions: jest.fn(),
  };

test('Recipe card renders correctly with a mock recipe info', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
  // Mock navigation params
  
        const title = 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs'; 
        const id =  716429;
        const image = 'https://spoonacular.com/recipeImages/715538-312x231.jpg';
        const sourceURL = 'http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html'; 
        const spoonacularSourceURL = 'https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429'; 

  // Render the component with mock data
  const { getByText, unmount } = render(
  <AuthProvider><Recipe  title={title} id={id} image={image} sourceURL={sourceURL} spoonacularSourceURL={spoonacularSourceURL} navigation={mockNavigation}/></AuthProvider>);

  // Check that the Recipe name is rendered
  await act(async () => {
    await waitFor(() => {
      // Check that the Recipe title is rendered
      const RecipeTitle = getByText('Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs');
      expect(RecipeTitle).toBeDefined();
      
    });
  });

  unmount();

  // Add more assertions as needed to test the styling
});