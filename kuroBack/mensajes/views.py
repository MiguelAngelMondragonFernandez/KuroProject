from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Mensaje
from .serializers import MensajeSerializer
from users.permissions import IsTokenValid
from rest_framework.response import Response
from django.db import connection

class MensajeViewSet(viewsets.ModelViewSet):
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer
    permission_classes = [IsTokenValid]

class mensajesByIdConversacion(APIView):
    permission_classes = [IsTokenValid]
    
    def get(self, request,id_conversacion):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM mensajes_mensaje WHERE conversacion_id = %s", [id_conversacion])
                rows = cursor.fetchmany()
                print(rows)
                dataMensajes = []
                for row in rows:
                    dataMensajes.append({
                       'id': row[0],
                        'mensaje': row[1],
                        'fecha': row[2],
                        'url_photo': row[3],
                        'user': row[4],
                        'conversacion': row[5],
                    })

            return Response({'mensajes': dataMensajes}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class AddUserToConversation(APIView):
    permission_classes = [IsTokenValid]

    def post(self, request):
        try:
            user_id = request.data.get('userId')
            conversation_id = request.data.get('conversationId')

            if not user_id or not conversation_id:
                return Response({'error': 'Faltan datos requeridos.'}, status=400)

            with connection.cursor() as cursor:
                # Verifica si el usuario ya está en la conversación
                cursor.execute(
                    "SELECT * FROM mensajes_conversacion_usuarios WHERE conversacion_id = %s AND user_id = %s",
                    [conversation_id, user_id]
                )
                existing = cursor.fetchone()
                if existing:
                    return Response({'message': 'El usuario ya está en la conversación.'}, status=200)

                # Agrega el usuario a la conversación
                cursor.execute(
                    "INSERT INTO mensajes_conversacion_usuarios (conversacion_id, user_id) VALUES (%s, %s)",
                    [conversation_id, user_id]
                )
                return Response({'message': 'Usuario agregado a la conversación.'}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=500)