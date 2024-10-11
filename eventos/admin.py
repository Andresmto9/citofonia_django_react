from django.contrib import admin
from .models import Evento
from .models import User

# Register your models here.
admin.site.register(Evento)
admin.site.register(User)