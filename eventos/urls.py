from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from eventos import views
from .views import LoginView


router = routers.DefaultRouter()
router.register("eventos", views.EventoView, "eventos")
router.register("usuarios", views.UsuarioView, "usuarios")
# router.register("login", views.LoginView, "login")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Eventos API")),
    path('api/login/', LoginView.as_view(), name='login'),
]