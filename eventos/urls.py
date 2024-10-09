from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from eventos import views

router = routers.DefaultRouter()
router.register("eventos", views.EventoView, "eventos")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Eventos API"))
]