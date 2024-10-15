from rest_framework import serializers, viewsets
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from .models import Evento
# from .models import User
from .models import Role
from .models import RolesUsuario

class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'usua_id', 'nombre' 'celular' 'info_visita' 'descripcion' 'estado')
        model = Evento
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

# class UsuarioLoginSerializer(serializers.Serializer):
#     correo = serializers.CharField(max_length=300)
#     password = serializers.CharField(max_length=300)

#     def validate(self, data):
#         correo = data.get('correo')
#         password = data.get('password')

#         try:
#             usuario = User.objects.get(email=correo)
#             print(f"validación {usuario}")
#         except User.DoesNotExist:
#             raise serializers.ValidationError('El correo no está registrado.')

#         if not check_password(password, usuario.password):
#             raise serializers.ValidationError('Contraseña incorrecta.')

#         return {'usuario': usuario}



class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'nombre')
        model = Role
        fields = '__all__'

class RolesUsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'usua_id', 'role_id')
        model = RolesUsuario
        fields = '__all__'