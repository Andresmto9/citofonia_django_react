from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializer import EventosSerializer
from .models import Evento
from .serializer import RolesSerializer
from .models import Role
from .serializer import RolesUsuariosSerializer
from .models import RolesUsuario
from .serializer import UsuariosSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):

    user = get_object_or_404(User, email=request.data["email"])

    if not user.check_password(request.data["password"]):
        return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)

    roles_usuario = RolesUsuario.objects.filter(usua_id=user)
    roles = [role.role_id.nombre for role in roles_usuario]

    serializer = UsuariosSerializer(instance=user)

    return Response({
        "token": token.key, 
        "user": serializer.data,
        "roles": roles
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def registro(request):
    serializer = UsuariosSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data["username"])
        user.set_password(serializer.data["password"])
        user.save()

        role_name = request.data.get('rol')
        if role_name:
            try:
                role = Role.objects.get(nombre=role_name) 
                RolesUsuario.objects.create(usua_id=user, role_id=role)
            except Role.DoesNotExist:
                return Response({'error': 'El rol especificado no existe.'}, status=status.HTTP_400_BAD_REQUEST)

        token = Token.objects.create(user=user)

        return Response({'token':token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def perfil(request):
    serializer = UsuariosSerializer(instance=request.user)

    return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.

class UsuariosView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = User.objects.filter(is_staff=False)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        usuarios = []
        for data in serializer.data:
            user = User.objects.get(id=data['id'])
            roles_usuario = RolesUsuario.objects.filter(usua_id=user)
            roles = [role.role_id.nombre for role in roles_usuario]
            data['rol'] = roles
            usuarios.append(data)

        return Response(usuarios)
    
    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_object()
        serializer = self.get_serializer(queryset)

        user = serializer.data
        roles_usuario = RolesUsuario.objects.filter(usua_id=queryset)
        roles = [role.role_id.nombre for role in roles_usuario]

        user['roles'] = roles

        return Response(user)
    
    def update(self, request, *args, **kwargs):
        queryset = self.get_object()
        serializer = self.get_serializer(queryset, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if 'rol' in request.data:
            rol = request.data['rol']

            try:
                nuevo_rol = Role.objects.get(nombre=rol)

                RolesUsuario.objects.update_or_create(
                    usua_id=queryset,
                    defaults={'role_id': nuevo_rol}
                )

            except Role.DoesNotExist:
                return Response({'error': 'El rol no existe.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)

class EventoView(viewsets.ModelViewSet):
    serializer_class = EventosSerializer
    queryset = Evento.objects.all()

class RoleView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Role.objects.all()

class RoleUsuaView(viewsets.ModelViewSet):
    serializer_class = RolesUsuariosSerializer
    queryset = RolesUsuario.objects.all()