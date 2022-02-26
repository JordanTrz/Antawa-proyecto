from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Model)
admin.site.register(Make)
admin.site.register(Category)
admin.site.register(Fuel)
admin.site.register(Transmission)
admin.site.register(Region)
admin.site.register(SalePost)
admin.site.register(ExtentUser)
admin.site.register(Photo)

# class CustomUserAdmin(admin.ModelAdmin):
#   model = CustomUser

# admin.site.register(CustomUser,CustomUserAdmin)