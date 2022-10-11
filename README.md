# Weather APP 

Este proyecto fue creado por [Benjamin Zapata](https://www.linkedin.com/in/benjaminzapata/), utilizando React y la API de [OpenWeather](https://openweathermap.org/).

## Descripción

Esta SPA nos permite consultar el estado meteorologico de distintas ubicaciones a lo largo del globo.

Es tan simple como ingresar una ubicacion dentro del input y presionar ENTER.

Realizamos un fetch de la información a traves de [Axios](https://axios-http.com/docs/intro), en caso de no poder encontrar informacion sobre la ubicacion ingresada desplegamos una alerta mediante [Toastify](https://www.npmjs.com/package/react-toastify) indicandole al usuario de dicho error. Caso contrario, desplegamos la informacion de manera ordenada. Existe ademas un boton que nos permite visualizar informacion extra en caso de que asi lo disponga el usuario.