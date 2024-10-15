from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User

#Creación del modelo para la creación de los usuarios
# class User(models.Model):
#     nombre = models.CharField(max_length=300)
#     email = models.EmailField(max_length=300, unique=True)  # Asegúrate de que sea único
#     password = models.CharField(max_length=300)
#     estado = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['nombre']

#     def save(self, *args, **kwargs):
#         if self.password:
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return self.nombre

# Creación del modelo para los eventos del sistema
class Evento(models.Model): 
    usua_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=300)
    celular = models.BigIntegerField
    info_visita = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    estado = models.BooleanField(default=False)
    # ForeignKey(Usuario, related_name="usua_eventos", blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# Creación del modelo para los roles usados en el sistema
class Role(models.Model):
    nombre = models.CharField(max_length=300)
    
    def __str__(self):
        return self.nombre

# Creación del modelo para la relación entre el usuario y los roles
class RolesUsuario(models.Model):
    usua_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)
    # ForeignKey(Usuario, on_delete=models.CASCADE)
