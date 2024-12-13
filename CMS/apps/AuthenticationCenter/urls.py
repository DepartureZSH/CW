# urls.py in app
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.AuthenticationPage.as_view(), name='Auth'),
    path('Login/', views.AuthenticationPage.as_view(), name='Auth'),
    path('Register/', views.RegisterPage.as_view(), name='Register')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)