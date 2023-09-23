# Inventory Studio

## Referencias

La aplicacion usa Prime react version 8  
https://www.primefaces.org/primereact-v8/setup/

Next js 12  
Next Auth 4  
React 18  
Node 16

## Reglas basicas branching y pull request

la rama debe tomarse de master y llevar la siguiente nomenclatura  
feature/issue-numero-del-issue-nombre-del-issue  
Ejemplo  
feature/issue-01-cambia-color-del-boton-del-login  
feature/issue-01-new-color-login-button

Todos los commits deben llevar un mensaje/comentario descriptivo.  
Evitar los commit de tipo  
git commit -m "actualizacion"  
git commit -m "update"  
git commit -m "actualizacion de la pagina de login"

Tratar que los commits sean de este estilo  
git commit -m "Cambia el color del boton del login de verde a rojo"  
git commit -m "it changes the color of login button from green to red"

## Reglas basicas de Testing

Agregar tantos test como sean posibles  
Tratar de agrupar los test por functionalidad en los describe y los casos de prueba en los it.  
No usar test

## Reglas basicas de codigo.

Todo el codigo debe estar en ingles, no usar palabras en español. Solo los mensajes o etiqueytas pueden estar en español.

Ejemplo aceptados:

<loginbutton label="Iniciar sesion" >

const showMessage ()=>{
const message = "Este mensaje se mostrara en la pantallas";
console.log(message);
}

Ejmplos no aceptados  
<BotonInicioSession label="Iniciar sesion">  
const mostrarMensaje = ()=>{

    const mensaje = "Este mensaje se mostrara en la pantallas";
    console.log(mensaje);

}

No usar function en lugar de ellos usar una funcion anoninma y asignartla a una constante.  
No usar var, usar const o let.

Usar solo functional components, no usar componentes basados en clases.

Usa prettier con las configuraciones ya especificas.

## Reglas de Librerias

No agregar librerias cuyas funcionalidades ya existan de forma nativa.  
Ejemplo no aceptados: Agregar axios si ya existe fetch.  
Ejemplos aceptados: Agregar loadash por que el clone profundo es apartir de node 18.

## gitignore

El archivo env.development.local es un template modificalo de acuerdo a tu local y no lo agregues al commit.

## Sugerencias

Agregar el mensaje de tu commit en ingles.  
Agregar el nombre de tu branch en ingles.
