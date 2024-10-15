# Presentación Prueba Técnica Citoplus

## 1. Clonación del Repositorio para ser Ejecutado en Visual Studio

- Abre una terminal y navega a un directorio donde clonarás el repositorio.
- Dirígete a la pestaña **Clonar un repositorio**.
- En el apartado de **Ubicación del repositorio**, coloca la URL de clonación HTTPS desde GitHub: [https://github.com/Andresmto9/citoplus_django](https://github.com/Andresmto9/citoplus_django).
- Haz clic en el botón **Clonar** y espera a que el proyecto sea clonado.
- Abre el proyecto en **Visual Studio Code** (recomendado).

## 2. Configuración del Entorno Django

- Desde la terminal, navega a la carpeta `citoplus_django`.
  
- Realiza la instalación de un entorno virtual (venv) si es necesario:
  ### Comando para Windows
  python -m venv {nombre del directorio venv}
  ### Alternativa para Linux
  python3 -m venv {nombre del directorio venv}

- Configura la terminal para el interpretador de Python
  1. Abre **Visual Studio Code** y presiona `F1` para abrir la paleta de comandos.
  2. En la barra de búsqueda, escribe y selecciona `> Python: Select Interpreter`.
  3. Aparecerá una lista de opciones, selecciona la opción correspondiente a tu entorno virtual `{versión de Python} (.venv)` o la que hayas configurado.
  4. Abre una nueva terminal dentro de **Visual Studio Code** para confirmar que estás utilizando el intérprete de Python correcto.
     
- Instala pip para virtualenv:
  ### Comando para Windows
  pip install virtualenv
  ### Alternativa para Linux
  venv/bin/pip install virtualenv
  
- Instala Django:
  ### Comando para Windows
  pip install django
  ### Alternativa para Linux
  venv/bin/pip install django
  
- Instala Django Rest Framework:
  ### Comando para Windows
  pip install djangorestframework
  ### Alternativa para Linux
  venv/bin/pip install djangorestframework
  
- Instala herramientas de Django Rest Framework:
  ### Comando para Windows
  pip install setuptools
  ### Alternativa para Linux
  venv/bin/pip install setuptools
  
- Instala Django Cors Headers:
  ### Comando para Windows
  pip install django-cors-headers
  ### Alternativa para Linux
  venv/bin/pip install django-cors-headers
  
- Instala CoreAPI:
  ### Comando para Windows
  pip install coreapi
  ### Alternativa para Linux
  venv/bin/pip install coreapi
  
## 3. Configuración de Migraciones

1. Verifica si existe la carpeta `migrations` dentro de la carpeta `eventos` del proyecto.
   
   - Si la carpeta no existe, crea las migraciones ejecutando el siguiente comando en la terminal:
     #### Comando para Windows
     python manage.py makemigrations {nombre de la migración}
     #### Alternativa para Linux
     python3 manage.py makemigrations {nombre de la migración}
     
3. Si la carpeta `migrations` ya existe o has creado nuevas migraciones, procede a aplicar las migraciones con el siguiente comando:
   #### Comando para Windows
   python manage.py migrate
   #### Alternativa para Linux
   python3 manage.py migrate
   
## 4. Levantamiento del Servidor Django para el Consumo de API

1. Abre una terminal dentro del directorio raíz de tu proyecto Django.
   
2. Ejecuta el siguiente comando para iniciar el servidor de desarrollo de Django:
   #### Comando para Windows
   python manage.py runserver
   #### Alternativa para Linux
   python3 manage.py runserver

3. El servidor se ejecutará en la dirección 127.0.0.1:8000 por defecto.

4. Si deseas especificar un puerto diferente, puedes hacerlo añadiendo el número de puerto al comando, por ejemplo:
   python manage.py runserver 8080

5. Una vez que el servidor esté en ejecución, podrás acceder a la API desde tu navegador web o desde herramientas como Postman, utilizando la URL http://127.0.0.1:8000.

## 5. Levantamiento del Servidor para el Cliente

1. Abre una terminal y navega al directorio del cliente, generalmente llamado `{cliente_citoplus}`.

2. Ejecuta el siguiente comando para instalar las dependencias necesarias utilizando npm:
   #### Comando para Windows - Linux
   npm install

3. Una vez que las dependencias se hayan instalado correctamente, levanta el servidor de desarrollo con el siguiente comando:
  npm run dev

4. El servidor se ejecutará en la dirección 127.0.0.1:5173 por defecto.
5. Ahora puedes visualizar y probar el proyecto accediendo a la URL http://127.0.0.1:5173 en tu navegador.

