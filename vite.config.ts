import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Rutas relativas: el build funciona en cualquier hosting o subcarpeta.
  base: './',
  plugins: [react(), tailwindcss()],
})
