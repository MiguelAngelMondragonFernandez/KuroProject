from django import forms
from .models import ConfiguracionAplicacion

class ConfiguracionAplicacionForm(forms.ModelForm):
    class Meta:
        model = ConfiguracionAplicacion
        fields = ['colorPricipal', 'tema', 'idioma', 'usuario']