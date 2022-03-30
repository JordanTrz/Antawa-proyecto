# Antawa-proyecto

Es un página web para publicar y vender autos de segunda mano. Esta idea nació a partir de que, a raíz de la pandemia, se vio un aumento significativo en la compra de vehículos para transporte privado, ya que las familias querían evitar el contagio en los trasportes públicos. El Frontend se realizó en React y el backend en Django.

## Registro

![image](https://res.cloudinary.com/dlhsturyl/image/upload/v1648669511/portfolio_photos/GIF/antawa/antawa_registro_x1i74c.gif)

## Catálogo y Filtrado de autos

![image](https://res.cloudinary.com/dlhsturyl/image/upload/v1648669514/portfolio_photos/GIF/antawa/antawa_catalogo_cng6nq.gif)

![image](https://res.cloudinary.com/dlhsturyl/image/upload/v1648669513/portfolio_photos/GIF/antawa/antawa_filtrado_vnihzb.gif)

# Publicación y actualización de autos

![image](https://res.cloudinary.com/dlhsturyl/image/upload/v1648669511/portfolio_photos/GIF/antawa/antawa_publicacion_owq4ip.gif)

![image](https://res.cloudinary.com/dlhsturyl/image/upload/v1648669512/portfolio_photos/GIF/antawa/antawa_actualizacion_umdrcu.gif)

## Frontend
Se trabajó con REACT.

Para que funcione se debe instalar dentro de la carpeta de frontend:

1. `npm install`
2. `npm i react-router-dom@5.3.0`
3. `npm install react-redux`
4. `npm install redux-persist`
5. `npm install react-slick --save` --> Esto es para el carrusel
6. `npm install --save styled-components`
7. `npm install node-sass`

Una vez instalado se ejecuta el proyecto:

`npm start`

## Backend
Se trabajó con django

Para que funcione se debe tener instalado python. Una vez ubicado en la carpeta backend se instala:

Entorno virtual:
- `python -m venv venv`

Se ingresa al entorno virtual:
- `source venv/scripts/activate`

Una vez que se activa el entorno virtual, se hace la instalación de los requirements:
- `pip install -r requirements.txt`

Una vez instalado todos los requirements se ejecuta el backend:
- `python manage.py runserver`