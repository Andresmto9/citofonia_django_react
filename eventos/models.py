from django.db import models

# Create your models here.

class Evento(models.Model): 
    usua_id = models.IntegerField
    nombre = models.CharField(max_length=300)
    celular = models.BigIntegerField
    info_visita = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    estado = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    nombre = models.CharField(max_length=300)
    correo = models.CharField(max_length=300)
    password = models.CharField(max_length=300)
    estado = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Role(models.Model):
    nombre = models.CharField(max_length=300)
    
    def __str__(self):
        return self.nombre

class RolesUsuario(models.Model):
    usua_id =  models.IntegerField
    role_id =  models.IntegerField

    def __str__(self):
        return self.nombre
