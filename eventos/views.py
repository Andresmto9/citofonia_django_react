from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializer import UsuarioLoginSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from .serializer import EventosSerializer
from .models import Evento
from .serializer import UsuariosSerializer
from .models import User
from .serializer import RolesSerializer
from .models import Role
from .serializer import RolesUsuariosSerializer
from .models import RolesUsuario

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioLoginSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.validated_data['usuario']
            
            print(f"usuario {usuario}")

            token, created = Token.objects.get_or_create(user=usuario)
            
            return Response({
                'token': token.key,
                'mensaje': 'Token creado exitosamente.' if created else 'Token existente retornado.'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Create your views here.

class EventoView(viewsets.ModelViewSet):
    serializer_class = EventosSerializer
    queryset = Evento.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = User.objects.all()
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]

class RoleView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Role.objects.all()

class RoleUsuaView(viewsets.ModelViewSet):
    serializer_class = RolesUsuariosSerializer
    queryset = RolesUsuario.objects.all()