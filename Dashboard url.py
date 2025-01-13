from dashboard.views import DashboardView

urlpatterns = [
    # ... other paths ...
    path('api/dashboard/', DashboardView.as_view(), name='dashboard'),
]
