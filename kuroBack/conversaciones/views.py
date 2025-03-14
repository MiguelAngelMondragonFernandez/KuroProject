from django.http import JsonResponse
from .models import Conversacion
import json

def findAll(request):
    conversaciones = Conversacion.objects.all()
    data = [
        {
            "participantes": c.participantes,
            "fecha": c.fecha,
        }
        for c in conversaciones
    ]
    return JsonResponse(data, safe=False)

def findOne(request, id):
    conversacion = Conversacion.objects.get(id=id)
    data = {
        "participantes": conversacion.participantes,
        "fecha": conversacion.fecha,
    }
    return JsonResponse(data, safe=False)

def update(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            conversacion = Conversacion.objects.get(id=data['id'])
            conversacion.participantes = data['participantes']
            conversacion.fecha = data['fecha']
            conversacion.save()
            return JsonResponse({
                'mensaje': 'Conversación actualizada'
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
            conversacion = Conversacion(
                participantes=data['participantes'],
                fecha=data['fecha'],
            )
            conversacion.save()
            return JsonResponse({
                'mensaje': 'Conversación creada'
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
            conversacion = Conversacion.objects.get(id=data['id'])
            conversacion.delete()
            return JsonResponse({
                'mensaje': 'Conversación eliminada'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es DELETE'
    }, status=405)