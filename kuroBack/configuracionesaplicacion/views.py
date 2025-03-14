from django.http import JsonResponse
from .models import ConfiguracionAplicacion
import json


# Create your views here.
def findAll(request):
    configuracionesaplicacion = ConfiguracionAplicacion.objects.all()
    data = [
        {
            "colorPricipal": c.colorPricipal,
            "tema": c.tema,
            "idioma": c.idioma,
            "usuario": c.usuario,
        }
        for c in configuracionesaplicacion
    ]
    return JsonResponse(data, safe=False)

def findOne(request):
    configuracionesaplicacion = ConfiguracionAplicacion.objects.get(id=id)
    data = {
        "colorPricipal": configuracionesaplicacion.colorPricipal,
        "tema": configuracionesaplicacion.tema,
        "idioma": configuracionesaplicacion.idioma,
        "usuario": configuracionesaplicacion.usuario,
    }
    return JsonResponse(data, safe=False)

def update(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            configuracionesaplicacion = ConfiguracionAplicacion.objects.get(id=data['id'])
            configuracionesaplicacion.colorPricipal = data['colorPricipal']
            configuracionesaplicacion.tema = data['tema']
            configuracionesaplicacion.idioma = data['idioma']
            configuracionesaplicacion.usuario = data['usuario']
            configuracionesaplicacion.save()
            return JsonResponse({
                'mensaje': 'ConfiguracionAplicacion actualizado'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es PUT'
    }, status=405)

def create(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            configuracionesaplicacion = ConfiguracionAplicacion.objects.create(
                colorPricipal = data['colorPricipal'],
                tema = data['tema'],
                idioma = data['idioma'],
                usuario = data['usuario'],
            )
            return JsonResponse({
                'mensaje': 'ConfiguracionAplicacion creado'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es POST'
    }, status=405)

def kill(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            configuracionesaplicacion = ConfiguracionAplicacion.objects.get(id=data['id'])
            configuracionesaplicacion.delete()
            return JsonResponse({
                'mensaje': 'ConfiguracionAplicacion eliminado'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es DELETE'
    }, status=405)