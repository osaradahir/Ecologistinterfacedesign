# Diagnóstico de Error 403

El error 403 Forbidden indica que:
1. El token de autenticación no se está enviando
2. El token ha expirado
3. El token es inválido

## Solución Rápida

### Opción 1: Hacer Login de Nuevo
1. Cierra sesión en la aplicación
2. Vuelve a hacer login con: admin@ecologist.com / admin123
3. Intenta de nuevo optimizar rutas o exportar reporte

### Opción 2: Verificar Token en localStorage
Abre la consola del navegador (F12) y ejecuta:
```javascript
localStorage.getItem('token')
```

Si no hay token o está vacío, necesitas hacer login de nuevo.

### Opción 3: Limpiar localStorage
```javascript
localStorage.clear()
```
Luego haz login de nuevo.

## Causa Probable

El token JWT tiene una expiración de 30 minutos (configurado en `.env`). Si has estado trabajando por más de 30 minutos sin hacer login, el token ha expirado.

## Verificación

Los endpoints están configurados correctamente:
- `/rutas/optimizar` - Requiere `get_current_user` ✅
- `/reportes/eficiencia` - Requiere `get_current_user` ✅

Ambos permiten cualquier usuario autenticado.
