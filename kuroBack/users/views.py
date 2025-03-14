from django.http import JsonResponse
from .models import User
import json


# Create your views here.
def findAll(request):
    users = User.objects.all()
    data = [
        {
            "apM": u.apM,
            "apP": u.apP,
            "name": u.name,
            "email": u.email,
            "password": u.password,
            "url_photo": u.url_photo,
        }
        for u in users
    ]
    return JsonResponse(data, safe=False)

def findOne(request, id):
    user = User.objects.get(id=id)
    data = {
        "apM": user.apM,
        "apP": user.apP,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "url_photo": user.url_photo,
    }
    return JsonResponse(data, safe=False)

def update(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=data['id'])
            user.apM = data['apM']
            user.apP = data['apP']
            user.name = data['name']
            user.email = data['email']
            user.password = data['password']
            user.url_photo = data['url_photo']
            user.save()
            return JsonResponse({
                'mensaje': 'Usuario actualizado'
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
            nuevo_usuario = User.objects.create(
            apM=data['apM'],
            apP=data['apP'],
            name=data['name'],
            email=data['email'],
            password=data['password'],
            url_photo=data['url_photo']
            )
            return JsonResponse({
                'mensaje': 'Registro exitoso',
                'id': nuevo_usuario.id
            }, status=201
            )
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es POST'

    }, status=405)

def kill (request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            User.objects.filter(id=data['id']).delete()
            return JsonResponse({
                'mensaje': 'Usuario eliminado'
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=400)
    return JsonResponse({
        'error': 'Método no es DELETE'
    }, status=405)
