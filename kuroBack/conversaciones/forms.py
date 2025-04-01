from django import forms
from .models import Conversacion

class ConversacionForm(forms.ModelForm):
    class Meta:
        model = Conversacion
        fields = ['participantes']