from django.urls import include, path
from rest_framework import routers
from .views import AhorrosViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'ahorros', AhorrosViewSet)
router.register(r'usuarios', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
