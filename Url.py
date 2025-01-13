from django.contrib import admin
from django.urls import path, include
from authentication.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
]
