from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Department)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Admin)
