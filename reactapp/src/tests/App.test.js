import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';


test('renders_the_application_header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/E-Commerce Store/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders_two_panels', () => {
  const { getByTestId } =render(<App />);
  const panel1 = getByTestId('product-details');
  const panel2 = getByTestId('cart-details');

  // Check if both panels are in the document
  expect(panel1).toBeInTheDocument();
  expect(panel2).toBeInTheDocument();

  // Check if both panels are visible (not hidden or removed from the DOM)
  expect(panel1).toBeVisible();
  expect(panel2).toBeVisible();
});

test('filters_products_based_on_minimum_and_maximum_prices', () => {
    const { getByText, getByPlaceholderText,getAllByTestId } = render(<App />);
   
    const minPriceInput = getByPlaceholderText(/Minimum Price:/);
    const maxPriceInput = getByPlaceholderText(/Maximum Price:/);
    const filterButton = getByText(/Apply Filters/);
  
    // Type values into the input fields
    fireEvent.change(minPriceInput, { target: { value: '100' } });
    fireEvent.change(maxPriceInput, { target: { value: '500' } });
  
    // Click the filter button
    fireEvent.click(filterButton);
  
    // Wait for the products to be updated (you may need to adjust this based on your app's behavior)
    // You can use waitFor, waitForElementToBeRemoved, or similar methods depending on your app's behavior
  
    // Verify that the filtered products are displayed
    const filteredProducts = getAllByTestId('product-item-1');
    expect(filteredProducts.length).toBeGreaterThan(0);
  
    // Check if the product prices are within the specified range
    filteredProducts.forEach((product) => {
      //const productPrice = parseFloat(product.querySelector('.product-price').textContent);
      const productPriceText = product.querySelector('.product-price').textContent;
const productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));
      expect(productPrice).toBeGreaterThanOrEqual(100);
      expect(productPrice).toBeLessThanOrEqual(500);
    });
  });

  test('displays_product_details_after_clicking_product', () => {
    const { getByTestId ,getByText} =render(<App />);  
   
   // Find a product element and click it
   const productElement = getByTestId('product-item-1'); // Use the appropriate product ID
   fireEvent.click(productElement);
 
   // Check if the product details are displayed in the right panel
   const productDetails = getByText('Product Details'); // Replace with your expected details text
 
   // Assert that the product details are displayed
   expect(productDetails).toBeInTheDocument();
   
 });