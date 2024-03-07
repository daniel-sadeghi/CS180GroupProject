import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import RecipeView from './RecipeView';
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

test('RecipeViews ingredients list renders correctly with a mock route', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
  // Mock navigation params
  const route = { 
    params: { 
        title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs', 
        id: 716429, 
        image: 'https://spoonacular.com/recipeImages/715538-312x231.jpg', 
        sourceURL: 'http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html', 
        spoonacularSourceURL: 'https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429' 
    } 
    };

  // Render the component with mock data
  const { getByText, unmount } = render(
  <AuthProvider><RecipeView route={route} navigation={mockNavigation}/></AuthProvider>);

  // Check that the Recipe name is rendered
  await act(async () => {
    await waitFor(() => {
      // Check that the Recipe Ingredients are all rendered
      const IngredientList = getByText('frozen cauliflower florets','cheese','extra virgin olive oil', 'pasta', 'red couple of pepper flakes',
      ' green white scallions','white wine', 'whole wheat bread crumbs');
      expect(IngredientList).toBeDefined();
    }); 
  });

  // Assert that setOptions was called
  expect(mockNavigation.setOptions).toHaveBeenCalledWith({
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    headerBackTitle: 'Back',
  });

  unmount();

  // Add more assertions as needed to test the styling
});