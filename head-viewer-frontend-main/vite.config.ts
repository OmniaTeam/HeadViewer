import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
        app: '/src/app',
        entities: '/src/entities',
        futures: '/src/futures',
        pages: '/src/pages',
        shared: '/src/shared',
        widgets: '/src/widgets',
    },
  },
})
