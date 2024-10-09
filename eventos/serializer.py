from rest_framework import serializers
from .models import Evento
from .models import Usuario
from .models import Role
from .models import RolesUsuario

class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'usua_id', 'nombre' 'celular' 'info_visita' 'descripcion' 'estado')
        model = Evento
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'nombre', 'correo', 'password', 'estado')
        model = Usuario
        fields = '__all__'

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