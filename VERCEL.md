# Despliegue en Vercel

1. Abre https://vercel.com y entra con tu cuenta de GitHub.
2. Haz clic en "Add New Project".
3. Selecciona el repositorio proyecto-psicopApp.
4. En "Framework Preset" elige "Other".
5. En "Root Directory" deja la raíz del proyecto.
6. Haz clic en "Deploy".
7. Cuando termine, ve a Settings > Environment Variables.
8. Añade esta variable:
   - Name: GEMINI_API_KEY
   - Value: tu_clave_real_de_gemini
9. Haz redeploy para que la nueva variable entre en vigor.

La app quedará disponible en una URL tipo https://tu-proyecto.vercel.app/.
