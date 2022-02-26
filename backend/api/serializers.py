from rest_framework import serializers
from .models import *
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
    return salepost

  # def update(self,instance,validated_data):
  #   photos = validated_data.pop('photos')
  #   # salepost = SalePost.objects.create(**validated_data)
  #   instance.salePost_color = validated_data.get("salePost_color",instance.salePost_color)
  #   instance.save()
  #   keep_photos = []
  #   # existing_ids = [p.photo_id for p in instance.photos]
  #   for photo in photos:
  #     if "photo_id" in photo.keys():
  #       if Photo.objects.filter(pk=photo["photo_id"]).exists():
  #         p = Photo.objects.get(pk=photo["photo_id"])
  #         p.save()
  #         keep_photos.append(p.photo_id)
  #       else:
  #         continue
  #     else:
  #       p = Photo.objects.create(**photo, salePost_id=instance)
  #       keep_photos.append(p.photo_id)

  #   # for photo in instance.photos:
  #   #   if photo.photo_id not in keep_photos:
  #   #       photo.delete()
  #   print("viendo el instance")
  #   print(instance)
  #   return instance

class ExtentUserSerializer(serializers.ModelSerializer):
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
    user = User.objects.create(**validated_data)
    ExtentUser.objects.create(**extent_user, user_id=user)
    return user

  # def update(self, instance, validated_data):
  #   extent_user = validated_data.pop('extentuser')
  #   instance.extentUser_dni = validated_data.get('extentUser_dni',instance.extentUser_dni)
  #   instance.save()
  #   keep_extent_user = []
  #   existing_ids = [instance.user_id]

