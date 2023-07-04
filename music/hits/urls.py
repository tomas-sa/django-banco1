from django.urls import include, path
from rest_framework import routers
from .views import AlbumViewSet, TrackViewSet

router = routers.DefaultRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'tracks', TrackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
