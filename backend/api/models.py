from django.db import models

# Create your models here.
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User

# Datos adicionales en otra tabla
class ExtentUser(models.Model):
  # extentUser_id = models.AutoField(primary_key=True)
  user_id = models.OneToOneField(User,primary_key=True,related_name='extentuser', to_field='id',db_column='user_id',on_delete=models.CASCADE,verbose_name='Usuario')
  extentUser_dni = models.CharField(max_length=8,null=True,blank=True)
  extentUser_cellphone = models.CharField(max_length=9,null=True,blank=True)
  cellphone_str = str(extentUser_cellphone)
  def __str__(self):
    return self.cellphone_str

# Tablas para Carro
class Make(models.Model):
  make_id = models.AutoField(primary_key=True)
  make_type = models.CharField(max_length=200,verbose_name='Marca',null=True,blank=True)

  def __str__(self):
    return self.make_type

class Model(models.Model):
  model_id = models.AutoField(primary_key=True)
  model_type = models.CharField(max_length=200,verbose_name='Modelo',null=True,blank=True)
  make_id = models.ForeignKey(Make,related_name='make_models',to_field='make_id',on_delete=models.CASCADE,db_column='make_id',verbose_name='Marca')

  def __str__(self):
    return self.model_type

class Category(models.Model):
  category_id = models.AutoField(primary_key=True)
  category_type = models.CharField(max_length=200,verbose_name='Categoria',null=True,blank=True)

  def __str__(self):
    return self.category_type

class Transmission(models.Model):
  transmission_id = models.AutoField(primary_key=True)
  transmission_type = models.CharField(max_length=200,verbose_name='Transmisión',null=True,blank=True)

  def __str__(self):
    return self.transmission_type

class Fuel(models.Model):
  fuel_id = models.AutoField(primary_key=True)
  fuel_type = models.CharField(max_length=200,verbose_name='combustible',null=True,blank=True)

  def __str__(self):
    return self.fuel_type

# Region
class Region(models.Model):
  region_id = models.AutoField(primary_key=True)
  region_type = models.CharField(max_length=200,verbose_name='Region',null=True,blank=True)

  def __str__(self):
    return self.region_type

# Publicación
class SalePost(models.Model):
  salePost_id = models.AutoField(primary_key=True)
  salePost_description = models.CharField(max_length=200,verbose_name='Descripción')
  salePost_yearModel = models.IntegerField(verbose_name='Año modelo')
  salePost_yearManufacturing = models.IntegerField(verbose_name='Año de fabricación')
  salePost_kilometer = models.IntegerField(verbose_name='Kilometraje')
  salePost_cylinder = models.CharField(max_length=200,verbose_name='Cilindrada')
  salePost_door = models.IntegerField(verbose_name='Número de puertas')
  salePost_color = models.CharField(max_length=200,verbose_name='Color')
  salePost_price = models.IntegerField(verbose_name='Precio dólares')
  salePost_newCar = models.BooleanField(verbose_name='Auto nuevo')
  salePost_datePost = models.DateTimeField(null=True,verbose_name='Fecha de publicación')
  user_id = models.ForeignKey(User,to_field='id',db_column='user_id',on_delete=models.CASCADE,verbose_name='Usuario')
  model_id = models.ForeignKey(Model,to_field='model_id',db_column='model_id',on_delete=models.CASCADE,verbose_name='Modelo')
  category_id = models.ForeignKey(Category,to_field='category_id',db_column='category_id',on_delete=models.CASCADE,verbose_name='Categoria')
  transmission_id = models.ForeignKey(Transmission,to_field='transmission_id',db_column='transmission_id',on_delete=models.CASCADE,verbose_name='Transmisión')
  fuel_id = models.ForeignKey(Fuel,to_field='fuel_id',db_column='fuel_id',on_delete=models.CASCADE,verbose_name='Combustible')
  region_id = models.ForeignKey(Region,to_field='region_id',db_column='region_id', on_delete=models.CASCADE,verbose_name='Region')
  # salePost_photo = models.CharField(max_length=255,verbose_name="photos",null=True,blank=True)

  def __str__(self):
    return self.salePost_description

  # @property
  # def photos(self):
  #     return self.photo_set.all()

# Photos
class Photo(models.Model):
  photo_id = models.AutoField(primary_key=True)
  # photos_url = CloudinaryField('image',default='')
  photo_url = models.CharField(max_length=200,verbose_name='URLS de fotos',null=True,blank=True)
  salePost_id = models.ForeignKey(SalePost,related_name='photos', to_field='salePost_id',db_column='salePost_id',on_delete=models.CASCADE,verbose_name='Publicación')