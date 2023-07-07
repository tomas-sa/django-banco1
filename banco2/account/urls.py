from django.urls import include, path
from rest_framework import routers
from .views import CuentaViewSet, TransferenciaAPIView, UserCreateAPIView, UserViewSet

router = routers.DefaultRouter()
router.register(r'ahorros', CuentaViewSet)
router.register(r'usuarios', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('transferencia/', TransferenciaAPIView.as_view(), name='transferencia'),
    path('createuser/', UserCreateAPIView.as_view(), name='createuser')
]
