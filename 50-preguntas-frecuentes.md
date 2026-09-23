# 50 preguntas frecuentes — Chat de soporte NutriAmigo

Este documento es el entregable de las 50 preguntas más repetitivas esperadas, junto con su respuesta y las palabras clave que activan cada una en el bot de reconocimiento de patrones (`js/faq-bot.js`, datos en `data/faq.json`).

El mecanismo es por **coincidencia de palabras clave**: el bot normaliza el mensaje del usuario (minúsculas, sin tildes ni signos) y busca cuál pregunta tiene más palabras clave presentes en el texto — incluyendo distintas formas de preguntar lo mismo. Si ninguna coincide, responde con un mensaje genérico invitando a contactar soporte humano.

## 1. ¿Qué es NutriAmigo?

**Respuesta:** Es una app que te da un plan de alimentación y entrenamiento personalizado según tu objetivo: definir, mantener o aumentar volumen.

**Palabras clave que la activan:** `que es nutriamigo`, `para que sirve la app`, `que hace esta aplicacion`, `de que trata la empresa`, `que es esta empresa`, `de que se trata esto`, `que hace nutriamigo`

## 2. ¿Es gratis usar NutriAmigo?

**Respuesta:** Sí. La versión gratuita incluye planes básicos con anuncios. La versión Premium quita los anuncios y desbloquea personalización avanzada.

**Palabras clave que la activan:** `es gratis`, `cuesta algo`, `tiene costo la app`, `debo pagar para usarla`, `tiene version gratuita`, `puedo usarla sin pagar`

## 3. ¿Qué incluye la versión premium?

**Respuesta:** Sin anuncios, personalización completa de tus planes de comida y entrenamiento, y acceso al sistema de rangos.

**Palabras clave que la activan:** `que incluye premium`, `beneficios premium`, `que trae la version paga`, `que gano si pago premium`, `por que pagar premium`, `vale la pena premium`

## 4. ¿Cuánto cuesta Premium?

**Respuesta:** Puedes ver los precios y planes disponibles en la sección Premium de la app.

**Palabras clave que la activan:** `cuanto cuesta premium`, `precio premium`, `valor de la suscripcion`

## 5. ¿Cómo cancelo Premium?

**Respuesta:** Desde tu perfil puedes gestionar tu suscripción y cancelarla cuando quieras; seguirás teniendo acceso hasta el fin del periodo pagado.

**Palabras clave que la activan:** `como cancelo premium`, `cancelar suscripcion`, `dar de baja premium`

## 6. ¿Cómo inicio sesión?

**Respuesta:** Usa el botón "Continuar con Google" en la página principal; no necesitas crear una contraseña nueva.

**Palabras clave que la activan:** `como inicio sesion`, `como entro a mi cuenta`, `login`

## 7. ¿Necesito una cuenta de Google?

**Respuesta:** Sí, por ahora el ingreso es exclusivamente con una cuenta de Google.

**Palabras clave que la activan:** `necesito cuenta de google`, `tengo que usar gmail`, `puedo entrar sin google`

## 8. ¿Puedo usar un correo distinto a Gmail?

**Respuesta:** Puedes iniciar sesión con cualquier cuenta de Google, incluso si usas ese correo para otro proveedor.

**Palabras clave que la activan:** `puedo usar otro correo`, `correo diferente a gmail`, `otro email`

## 9. ¿Es seguro iniciar sesión con Google?

**Respuesta:** Sí. NutriAmigo nunca ve ni guarda tu contraseña; Google solo comparte tu nombre y correo para crear tu perfil.

**Palabras clave que la activan:** `es seguro dar mi cuenta`, `es seguro el login con google`, `riesgo de usar google`

## 10. ¿Qué datos guardan de mí?

**Respuesta:** Guardamos tu nombre, correo, fecha de creación de la cuenta, tu progreso de peso y tus preferencias de plan.

**Palabras clave que la activan:** `que datos guardan de mi`, `que informacion guardan`, `privacidad de mis datos`

## 11. ¿Cómo elijo mi objetivo?

**Respuesta:** En la sección Entrenamiento puedes elegir entre Definir, Mantener o Aumentar volumen; tu plan se ajusta automáticamente.

**Palabras clave que la activan:** `como elijo mi objetivo`, `cambiar mi meta`, `seleccionar objetivo`, `donde elijo mi meta`, `cambiar de meta de entrenamiento`

## 12. ¿Qué significa el objetivo "Definir"?

**Respuesta:** Definir busca reducir grasa corporal manteniendo la masa muscular, con un plan ligeramente bajo en calorías.

**Palabras clave que la activan:** `que significa definir`, `objetivo definir`

## 13. ¿Qué significa el objetivo "Mantener"?

**Respuesta:** Mantener busca sostener tu peso y composición actual con un plan balanceado.

**Palabras clave que la activan:** `que significa mantener`, `objetivo mantener`

## 14. ¿Qué significa "Aumentar volumen"?

**Respuesta:** Volumen busca ganar masa muscular con un plan más alto en calorías y proteína.

**Palabras clave que la activan:** `que significa aumentar volumen`, `objetivo volumen`, `subir de peso`

## 15. ¿Puedo cambiar mi objetivo después?

**Respuesta:** Sí, puedes cambiarlo cuando quieras desde la sección Entrenamiento.

**Palabras clave que la activan:** `como cambio mi objetivo`, `cambiar de meta despues`

## 16. ¿Cómo personalizo mi plan de comidas?

**Respuesta:** Con Premium, el botón "Personalizar" en Alimentación te deja elegir tipo de proteína, restricciones y alergias.

**Palabras clave que la activan:** `como personalizo mi plan de comidas`, `personalizar alimentacion`, `ajustar mi dieta`

## 17. ¿Puedo indicar que soy vegetariano?

**Respuesta:** Sí, es una de las restricciones disponibles al personalizar tu plan de comidas.

**Palabras clave que la activan:** `soy vegetariano`, `opcion vegetariana`, `dieta vegetariana`

## 18. ¿Puedo indicar que soy vegano?

**Respuesta:** Sí, selecciona "Vegano" en las restricciones alimentarias al personalizar tu plan.

**Palabras clave que la activan:** `soy vegano`, `dieta vegana`, `opcion vegana`

## 19. ¿Qué pasa si tengo alergias?

**Respuesta:** Puedes indicar tus alergias en la personalización y el plan evitará esos ingredientes.

**Palabras clave que la activan:** `tengo alergias`, `alergico a algun alimento`, `alergias alimentarias`

## 20. ¿Puedo elegir el tipo de proteína?

**Respuesta:** Sí, puedes preferir pollo, pescado, carne u otras fuentes al personalizar tu plan.

**Palabras clave que la activan:** `elegir tipo de proteina`, `que proteina prefiero`, `pollo pescado carne`

## 21. ¿Cómo personalizo mi plan de entrenamiento?

**Respuesta:** Con Premium, el botón "Personalizar" en Entrenamiento te permite ajustar frecuencia semanal, distancia y enfoque muscular.

**Palabras clave que la activan:** `como personalizo mi entrenamiento`, `ajustar mi rutina`, `personalizar ejercicio`

## 22. ¿Puedo elegir cuántos días entreno a la semana?

**Respuesta:** Sí, la frecuencia semanal es uno de los ajustes disponibles en la personalización premium.

**Palabras clave que la activan:** `cuantos dias entreno`, `frecuencia de entrenamiento`, `dias a la semana`

## 23. ¿Tienen rutinas para correr?

**Respuesta:** Sí, puedes indicar una distancia objetivo y el plan incluirá sesiones de carrera.

**Palabras clave que la activan:** `rutinas para correr`, `entrenamiento de running`, `plan de carrera`

## 24. ¿Puedo enfocar mi rutina en un grupo muscular?

**Respuesta:** Sí, puedes elegir un enfoque como piernas, brazos o tren superior al personalizar tu entrenamiento.

**Palabras clave que la activan:** `enfocarme en piernas`, `rutina de piernas`, `enfoque muscular`

## 25. ¿Cómo registro mi peso?

**Respuesta:** En tu panel principal hay un campo para ingresar tu peso de hoy y guardarlo con un clic.

**Palabras clave que la activan:** `como registro mi peso`, `anotar mi peso`, `guardar mi peso`

## 26. ¿Dónde veo mi progreso?

**Respuesta:** En el panel principal aparece un gráfico con la evolución de tu peso a lo largo del tiempo.

**Palabras clave que la activan:** `donde veo mi progreso`, `grafico de peso`, `ver mi evolucion`

## 27. ¿Puedo borrar mi historial de peso?

**Respuesta:** Sí, hay un botón para borrar tu historial de progreso desde el panel principal.

**Palabras clave que la activan:** `borrar mi historial de peso`, `eliminar mis registros`, `reiniciar progreso`

## 28. ¿Qué es la racha (streak)?

**Respuesta:** Es un contador de días consecutivos usando la app, para ayudarte a mantener la constancia.

**Palabras clave que la activan:** `que es la racha`, `que es el streak`, `dias consecutivos`

## 29. ¿Cómo mantengo mi racha activa?

**Respuesta:** Solo necesitas iniciar sesión y usar la app al menos una vez cada día.

**Palabras clave que la activan:** `como mantengo mi racha`, `no perder la racha`, `seguir la racha activa`

## 30. ¿Qué pasa si pierdo mi racha?

**Respuesta:** Si dejas pasar un día sin usar la app, la racha vuelve a empezar desde cero.

**Palabras clave que la activan:** `que pasa si pierdo mi racha`, `se reinicia la racha`, `perdi mis dias seguidos`

## 31. ¿Qué es la Comunidad?

**Respuesta:** Es un chat en vivo donde usuarios de NutriAmigo se motivan entre sí, organizado por salas de país y una sala global.

**Palabras clave que la activan:** `que es la comunidad`, `para que sirve comunidad`, `seccion comunidad`, `hay chat de usuarios`, `puedo chatear con otros`, `red social de la app`

## 32. ¿Cómo entro al chat de la comunidad?

**Respuesta:** Desde el menú superior entra a "Comunidad"; necesitas haber iniciado sesión para escribir.

**Palabras clave que la activan:** `como entro al chat`, `acceder a la comunidad`, `abrir el chat`

## 33. ¿Puedo hablar con gente de otros países?

**Respuesta:** Sí, además de la sala de tu país puedes unirte a la sala Global con usuarios de todo el mundo.

**Palabras clave que la activan:** `hablar con gente de otros paises`, `chat internacional`, `usuarios de otros paises`

## 34. ¿El chat traduce los mensajes automáticamente?

**Respuesta:** Sí, cada mensaje se traduce automáticamente al idioma que tengas seleccionado.

**Palabras clave que la activan:** `el chat traduce`, `traduccion automatica`, `mensajes en otro idioma`

## 35. ¿Puedo ocultar mi país en el chat?

**Respuesta:** Sí, hay una opción para mostrar u ocultar tu país junto a tus mensajes.

**Palabras clave que la activan:** `ocultar mi pais`, `no mostrar de donde soy`, `privacidad en el chat`

## 36. ¿Hay moderadores en el chat?

**Respuesta:** Esta demo académica no incluye moderación humana en vivo; se recomienda un uso respetuoso de la comunidad.

**Palabras clave que la activan:** `hay moderadores`, `quien modera el chat`, `control del chat`

## 37. ¿Cómo reporto a alguien en el chat?

**Respuesta:** Por ahora esta función no está disponible en la demo; está planeada para una versión futura.

**Palabras clave que la activan:** `como reporto a alguien`, `reportar un mensaje`, `denunciar un usuario`

## 38. ¿La app tiene anuncios?

**Respuesta:** Sí, la versión gratuita incluye anuncios. La versión Premium los elimina por completo.

**Palabras clave que la activan:** `la app tiene anuncios`, `hay publicidad`, `anuncios en la version gratis`, `por que salen anuncios`, `anuncios molestos`, `publicidad en la app gratis`

## 39. ¿Cómo quito los anuncios?

**Respuesta:** Activando la membresía Premium desde la sección Premium de la app.

**Palabras clave que la activan:** `como quito los anuncios`, `eliminar publicidad`, `sin anuncios`

## 40. ¿Qué es el sistema de "rangos"?

**Respuesta:** Es un sistema de niveles disponible en Premium que reconoce tu constancia y progreso dentro de la app.

**Palabras clave que la activan:** `que es el modo rangos`, `sistema de rangos`, `niveles de la app`

## 41. ¿Cómo subo de rango?

**Respuesta:** Mantén tu racha activa y cumple tus registros de progreso; el rango sube automáticamente.

**Palabras clave que la activan:** `como subo de rango`, `subir de nivel`, `avanzar de rango`

## 42. ¿NutriAmigo funciona sin internet?

**Respuesta:** Puedes abrir la app instalada sin conexión, pero el login, el chat y la sincronización de datos necesitan internet.

**Palabras clave que la activan:** `funciona sin internet`, `modo offline`, `sin conexion`

## 43. ¿Hay una app para celular?

**Respuesta:** Sí, NutriAmigo se puede instalar en tu celular como aplicación desde el navegador.

**Palabras clave que la activan:** `hay app para celular`, `aplicacion movil`, `version para el telefono`

## 44. ¿Cómo instalo la app en mi celular?

**Respuesta:** Abre el sitio en tu navegador y elige "Agregar a pantalla de inicio" o "Instalar app" cuando el navegador lo sugiera.

**Palabras clave que la activan:** `como instalo la app en mi celular`, `agregar a pantalla de inicio`, `instalar como app`

## 45. ¿Funciona en iPhone y Android?

**Respuesta:** Sí, al ser una app web instalable funciona en ambos sistemas desde el navegador.

**Palabras clave que la activan:** `funciona en iphone`, `funciona en android`, `compatible con mi celular`

## 46. ¿Los planes reemplazan a un nutricionista?

**Respuesta:** No. NutriAmigo es una guía general y no reemplaza la asesoría de un nutricionista o médico.

**Palabras clave que la activan:** `reemplaza a un nutricionista`, `es lo mismo que un profesional`, `sustituye al medico`, `puedo confiar en el plan sin ver a un profesional`, `el plan es seguro sin nutricionista`

## 47. ¿Puedo hablar con un nutricionista real?

**Respuesta:** Esta versión no incluye asesoría humana en vivo; para condiciones médicas, consulta siempre a un profesional.

**Palabras clave que la activan:** `hablar con un nutricionista real`, `asesoria profesional`, `contactar un experto`

## 48. ¿Cómo cambio mi contraseña?

**Respuesta:** Como inicias sesión con Google, tu contraseña se administra directamente desde tu cuenta de Google.

**Palabras clave que la activan:** `como cambio mi contraseña`, `olvide mi clave`, `resetear password`

## 49. ¿Cómo elimino mi cuenta?

**Respuesta:** Escríbenos desde soporte y eliminaremos tu cuenta y tus datos asociados.

**Palabras clave que la activan:** `como elimino mi cuenta`, `borrar mi cuenta`, `darme de baja`

## 50. ¿Cómo contacto a soporte humano?

**Respuesta:** Si este asistente no resuelve tu duda, escribe a nuestro correo de soporte para que un miembro del equipo te ayude.

**Palabras clave que la activan:** `como contacto soporte`, `hablar con soporte humano`, `ayuda de una persona`
