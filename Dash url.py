from members.views import MemberListView

urlpatterns = [
    # ... other paths ...
    path('api/members/', MemberListView.as_view(), name='members'),
]
