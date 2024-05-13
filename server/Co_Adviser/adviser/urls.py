from django.urls import path
from . import views
urlpatterns = [
    path('ehsan-api', views.index, name='index'),
]