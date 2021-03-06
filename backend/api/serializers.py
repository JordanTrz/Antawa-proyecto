from calendar import c
import enum
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

from .forms import *
from cloudinary.forms import cl_init_js_callbacks

class ModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Model
    fields = '__all__'

class MakeSerializer(serializers.ModelSerializer):
  make_models = ModelSerializer(many=True)
  class Meta:
    model = Make
    # fields = '__all__'
    fields = ['make_id','make_type','make_models']

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'

class FuelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Fuel
    fields = '__all__'

class TransmissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transmission
    fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Region
    fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
  photo_id = serializers.IntegerField(required=False)
  class Meta:
    model = Photo
    fields = '__all__'
    read_only_fields = ('salePost_id',)

class SalePostSerializer(serializers.ModelSerializer):
  photos = PhotoSerializer(many=True)
  model_type = serializers.ReadOnlyField(source='model_id.model_type')
  make_type = serializers.ReadOnlyField(source='model_id.make_id.make_type')
  category_type = serializers.ReadOnlyField(source='category_id.category_type')
  transmission_type = serializers.ReadOnlyField(source='transmission_id.transmission_type')
  fuel_type = serializers.ReadOnlyField(source='fuel_id.fuel_type')
  region_type = serializers.ReadOnlyField(source='region_id.region_type')

  class Meta:
    model = SalePost
    fields = '__all__'

  def create(self, validated_data):
    photos = validated_data.pop('photos')
    salepost = SalePost.objects.create(**validated_data)
    print(salepost)
    for photo in photos:
        Photo.objects.create(**photo, salePost_id=salepost)
        print("photos cloudinary", photo)
    return salepost

  def update(self,instance,validated_data):
    instance.salePost_description = validated_data.get('salePost_description', instance.salePost_description)
    instance.salePost_yearModel = validated_data.get('salePost_yearModel', instance.salePost_yearModel)
    instance.salePost_yearManufacturing = validated_data.get('salePost_yearManufacturing', instance.salePost_yearManufacturing)
    instance.salePost_kilometer = validated_data.get('salePost_kilometer', instance.salePost_kilometer)
    instance.salePost_cylinder = validated_data.get('salePost_cylinder', instance.salePost_cylinder)
    instance.salePost_door = validated_data.get('salePost_door', instance.salePost_door)
    instance.salePost_color = validated_data.get('salePost_color', instance.salePost_color)
    instance.salePost_price = validated_data.get('salePost_price', instance.salePost_price)
    instance.model_id = validated_data.get('model_id', instance.model_id)
    instance.category_id = validated_data.get('category_id', instance.category_id)
    instance.transmission_id = validated_data.get('transmission_id', instance.transmission_id)
    instance.fuel_id = validated_data.get('fuel_id', instance.fuel_id)
    instance.region_id = validated_data.get('region_id', instance.region_id)
    instance.save()
    photos = validated_data.pop('photos')
    keep_photos = []
    # existing_photos = [p.photo_id for p in instance.photos]

    for photo in photos:
      if "photo_id" in photo.keys():
        print("s?? existe")
        if Photo.objects.filter(pk=photo["photo_id"]).exists():
          p = Photo.objects.get(pk=photo["photo_id"])
          print(p)
          p.photo_url = photo.get('photo_url', p.photo_url)
          p.save()
          keep_photos.append(p.photo_id)
          print(keep_photos)
        else:
          continue
      else:
        print("no tiene id")
        p = Photo.objects.create(**photo,salePost_id=instance)
        keep_photos.append(p.photo_id)
        print(keep_photos)

    print(photo)

    for photo in instance.photos.values():
      print(photo["photo_id"])
      if photo["photo_id"] not in keep_photos:
        pp = Photo.objects.get(pk=photo["photo_id"])
        pp.delete()

    return instance
class ExtentUserSerializer(serializers.ModelSerializer):
  # user_id = serializers.IntegerField(required=False)
  class Meta:
    model = ExtentUser
    fields = '__all__'
    read_only_fields = ('user_id',)

class UserSerializer(serializers.ModelSerializer):
  extentuser = ExtentUserSerializer()

  class Meta:
    model = User
    fields = '__all__'
    # fields = ['id','first_name','last_name','email','username','password','extentuser']

  def create(self,validated_data):
    extent_user = validated_data.pop('extentuser')
    password = validated_data.pop('password')
    validated_data['password'] = make_password(password)
    user = User.objects.create(**validated_data)
    ExtentUser.objects.create(**extent_user, user_id=user)
    return user

  def update(self, instance, validated_data):
    print(instance.id)
    extent_user = validated_data.pop('extentuser')
    instance.first_name = validated_data.get("first_name", instance.first_name)
    instance.last_name = validated_data.get("last_name", instance.last_name)
    instance.username = validated_data.get("username", instance.username)
    instance.email = validated_data.get("email", instance.email)
    password = validated_data.pop('password')
    validated_data['password'] = make_password(password)
    instance.password = validated_data.get("password", instance.password)
    instance.extentuser = validated_data.get("extentuser", instance.extentuser)
    instance.save()
    new_extentuser = ExtentUser.objects.get(pk=instance.id)
    new_extentuser.extentUser_dni = extent_user.get('extentUser_dni',new_extentuser.extentUser_dni)
    new_extentuser.extentUser_cellphone = extent_user.get('extentUser_cellphone',new_extentuser.extentUser_cellphone)

    new_extentuser.save()
    return instance