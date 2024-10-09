from rest_framework import viewsets
from .serializer import EventosSerializer
from .models import Evento
from .serializer import UsuariosSerializer
from .models import Usuario
from .serializer import RolesSerializer
from .models import Role
from .serializer import RolesUsuariosSerializer
from .models import RolesUsuario

# Create your views here.

class EventoView(viewsets.ModelViewSet):
    serializer_class = EventosSerializer
    queryset = Evento.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuario.objects.all()

class RoleView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Role.objects.all()

class RoleUsuaView(viewsets.ModelViewSet):
    serializer_class = RolesUsuariosSerializer
    queryset = RolesUsuario.objects.all()