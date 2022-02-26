from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

from .models import *
from .serializers import *

from rest_framework import status, permissions
class IndexView(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self,request):
    context = {
      'ok':True,
      'message':'El servidor está activo!'
    }
    return Response(context)

class ModelView(APIView):
  def get(self,request):
    dataModel = Model.objects.all()
    serCategoria = ModelSerializer(dataModel,many=True)
    context = {
      'ok':True,
      'content':serCategoria.data
    }
    return Response(context)

class MakeView(APIView):
  def get(self,request):
    dataBrand = Make.objects.all()
    serBrand = MakeSerializer(dataBrand,many=True)
    context = {
      'ok':True,
      'content':serBrand.data
    }

    return Response(context)

class CategoryView(APIView):
  def get(self,request):
    dataCategory = Category.objects.all()
    serCategory = CategorySerializer(dataCategory,many=True)
    context={
      'ok':True,
      'content':serCategory.data
    }
    return Response(context)

class FuelView(APIView):
  def get(self,request):
    dataFuel = Fuel.objects.all()
    serFuel = FuelSerializer(dataFuel,many = True)
    context = {
      'ok':True,
      'content':serFuel.data
    }
    return Response(context)

class TransmissionView(APIView):
  def get(self,request):
    dataTransmission = Transmission.objects.all()
    serTransmission = TransmissionSerializer(dataTransmission,many=True)
    context = {
      'ok':True,
      'content':serTransmission.data
    }
    return Response(context)

class RegionView(APIView):
  def get(self,request):
    dataRegion = Region.objects.all()
    serRegion = RegionSerializer(dataRegion,many=True)
    context = {
      'ok':True,
      'content':serRegion.data
    }
    return Response(context)

class SalePostView(APIView):
  def get(self,request):
    dataSalePost = SalePost.objects.all()
    serSalePost = SalePostSerializer(dataSalePost,many=True)
    context = {
      'ok':True,
      'content':serSalePost.data
    }
    return Response(context)

  def post(self,request):
    serSalePost = SalePostSerializer(data=request.data)
    serSalePost.is_valid(raise_exception=True);
    serSalePost.save();
    context = {
     'ok':True,
     'content':serSalePost.data
    }
    return Response(context)

class SalePostDetailView(APIView):
  # permission_classes = (IsAuthenticated,)
  def get(self,request,sale_id):
    dataSalePost = SalePost.objects.get(pk=sale_id)
    serSalePost = SalePostSerializer(dataSalePost)
    context = {
      'ok':True,
      'content':serSalePost.data
    }
    return Response(context)

  def put(self,request,sale_id):
    dataSalePost = SalePost.objects.get(pk=sale_id)
    serSalePost = SalePostSerializer(dataSalePost,data=request.data)
    serSalePost.is_valid()
    serSalePost.save()
    context = {
      'ok':True,
      'content':serSalePost.data
    }
    return Response(context)

  def delete(self,request,sale_id):
    dataSalePost = SalePost.objects.delete(pk=sale_id)
    serSalePost = SalePostSerializer(dataSalePost)
    context = {
      'ok':True,
      'content':serSalePost.data
    }
    return Response(context)

class SalePostUserView(APIView):
  def get(self,request,user_id):
    dataSalePostUSer = SalePost.objects.filter(user_id=user_id)
    serSalePostUser = SalePostSerializer(dataSalePostUSer,many=True)
    context = {
      'ok':True,
      'content':serSalePostUser.data
    }
    return Response(context)

  # def delete(self,request,sale_id):
  #   dataPost = SalePost.objects.delete(pk=sale_id)
  #   serPost = SalePostSerializer(dataPost)
  #   context = {
  #     'ok':True,
  #     'content':serPost.data
  #   }
  #   return Response(context)

class UserView(APIView):
  # permission_classes = (permissions.AllowAny,)
  def get(self,request):
    dataUser = User.objects.all()
    serUser = UserSerializer(dataUser,many=True)
    context = {
      'ok':True,
      'content':serUser.data
    }
    return Response(context)

  def post(self,request):
    serUser = UserSerializer(data=request.data)
    if serUser.is_valid(raise_exception=True):
      password = serUser.validated_data.get('password')
      # Revisar creación de password. Incluir en serializer
      serUser.validated_data['password'] = make_password(password)
      new_user = serUser.save()

      if new_user:
        context = {
          'ok':True,
          'content': serUser.data
        }
        return Response(context)
      return Response(serUser.errors,status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
  # permission_classes = (IsAuthenticated,)
  def get(self,request,user_id):
    dataUser = User.objects.get(pk=user_id)
    serUser = UserSerializer(dataUser)
    context = {
      'ok':True,
      'content':serUser.data
    }
    return Response(context)

  def put(self,request,user_id):
    dataUser = User.objects.get(pk=user_id)
    serUser = UserSerializer(dataUser, data=request.data)
    serUser.is_valid(raise_exception=True)
    serUser.save()
    context = {
      'ok':True,
      'content':serUser.data
    }
    return Response(context)

  def delete(self,request,user_id):
    dataUser = User.objects.delete(pk=user_id)
    serUser = UserSerializer(dataUser)
    context = {
      'ok':True,
      'content': serUser.data
    }
    return Response(context)

class ExtentUserView(APIView):
  # permission_classes = (IsAuthenticated,)
  def get(self,request):
    dataExtentUser = ExtentUser.objects.all()
    serExtentUser = ExtentUserSerializer(dataExtentUser,many=True)
    context = {
      'ok':True,
      'content':serExtentUser.data
    }
    return Response(context)

  def post(self,request):
    serExtentUser = ExtentUserSerializer(data=request.data)
    serExtentUser.is_valid(raise_exception=True)
    serExtentUser.save()
    context = {
      'ok':True,
      'content':serExtentUser.data
    }
    return Response(context)

class PhotoView(APIView):
  # permission_classes = (IsAuthenticated,)
  def get(self,request):
    dataPhoto = Photo.objects.all()
    serPhoto = PhotoSerializer(dataPhoto,many=True)
    context = {
      'ok':True,
      'Content':serPhoto.data
    }
    return Response(context)