from django.urls import include, path
from rest_framework import routers
from .views import CuentaViewSet, UserViewSet, TransferenciaViewSet

router = routers.DefaultRouter()
router.register(r'ahorros', CuentaViewSet)
router.register(r'usuarios', UserViewSet)
router.register(r'transferencia', TransferenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
