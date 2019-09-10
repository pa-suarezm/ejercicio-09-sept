# Pablo Suárez - 201632293
Descripción: Aplicación web para manejar información socioeconómica de un grupo de países

Instrucciones: El nombre de la base de datos de mongo (desplegada en localhost:27017) es "poblaciones" y el nombre de la colección que contiene a los paises se llama "paises". Para poblar la colección se usa el comando "mongoimport --db poblaciones --collection paises --file countriesall.json --jsonArray" desde la linea de comando en el mismo directorio que este README. Después, desde la misma línea de comando, usar el comando "node app.js" y dirigirse al navegador de su preferencia.

Rutas:
    - http://localhost:8080/countries GET ALL, POST (requiere un body de json)
    - http://localhost:8080/countries/:nombre GET, PUT, DELETE pais con nombre = :nombre

Ejemplo de body para hacer POST:
{
"country":"Genovia",
"population":9923,
"continent":"Europa",
"lifeExpectancy":43.8,
"purchasingPower":974.58
}