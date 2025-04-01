from django import forms
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['apM', 'apP', 'name', 'email', 'password', 'url_photo']
