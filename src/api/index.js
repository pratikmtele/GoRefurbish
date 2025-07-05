// Export the main Axios instance
export { default as api } from './axios';

// Export all services
export {
  authService,
  productService,
  categoryService,
  uploadService,
} from './services';

// Export individual services for convenience
export { authService as auth } from './services';
export { productService as products } from './services';
export { categoryService as categories } from './services';
export { uploadService as uploads } from './services';
