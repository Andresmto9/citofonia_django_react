from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register("eventos", views.EventoView, "eventos")
router.register("usuarios", views.UsuariosView, "usuarios")
router.register("roles", views.RoleView, "roles")
router.register("usua_roles", views.RoleUsuaView, "usua_roles")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Eventos API")),
    re_path('login/', views.login),
    re_path('registro/', views.registro),
    re_path('perfil/', views.perfil)
]