import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Smart Service Desk frontend (Phase 0 setup).
// Pages, components, and API wiring arrive in Phase 5.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
