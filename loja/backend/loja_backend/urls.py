from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from users.api import router
from loja.api import router as loja_router

api = NinjaAPI()

# endpoints de autenticacao
api.add_router("/users/", router)

# endpoints da loja
api.add_router("/loja/", loja_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
