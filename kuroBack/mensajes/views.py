from django.http import JsonResponse
from .models import Mensaje
import json

def findAll(request):
    mensajes = Mensaje.objects.all()
    data = [
        {
            "contenido": m.contenido,
            "usuario": m.usuario,
            "fecha": m.fecha,
        }
        for m in mensajes
    ]
    return JsonResponse(data, safe=False)

def findOne(request, id):
    mensaje = Mensaje.objects.get(id=id)
    data = {
        "contenido": mensaje.contenido,
        "usuario": mensaje.usuario,
        "fecha": mensaje.fecha,
    }
    return JsonResponse(data, safe=False)

def update(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            mensaje = Mensaje.objects.get(id=data['id'])
            mensaje.contenido = data['contenido']
            mensaje.usuario = data['usuario']
            mensaje.fecha = data['fecha']
            mensaje.save()
            return JsonResponse({
                'mensaje': 'Mensaje actualizado'
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
            mensaje = Mensaje(
                contenido=data['contenido'],
                usuario=data['usuario'],
                fecha=data['fecha'],
            )
            mensaje.save()
            return JsonResponse({
                'mensaje': 'Mensaje creado'
            }, status=201)
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
            mensaje = Mensaje.objects.get(id=data['id'])
            mensaje.kill()
            return JsonResponse({
                'mensaje': 'Mensaje eliminado'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es DELETE'
    }, status=405)