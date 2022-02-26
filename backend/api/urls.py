from django.urls import path,re_path
from django.conf.urls import url

from . import views

urlpatterns = [
  path('',views.IndexView.as_view(),name='index'),
  path('make',views.MakeView.as_view(),name='make'),
  path('model',views.ModelView.as_view(),name='model'),
  path('category',views.CategoryView.as_view(),name='category'),
  path('fuel',views.FuelView.as_view(),name='fuel'),
  path('transmission',views.TransmissionView.as_view(),name='transmission'),
  path('region',views.RegionView.as_view(),name='region'),
  path('user',views.UserView.as_view(),name='create_user'),
  path('user/<int:user_id>',views.UserDetailView.as_view(),name='get_user'),
  path('salepost',views.SalePostView.as_view(),name='sale'),
  path('salepost/<int:sale_id>',views.SalePostDetailView.as_view(),name='salepost_id'),
  path('salepost/user/<int:user_id>',views.SalePostUserView.as_view(),name='salepost_user'),
  path('photo',views.PhotoView.as_view(),name='photos'),
]