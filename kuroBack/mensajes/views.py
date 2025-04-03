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
                print(id_conversacion)
                cursor.execute("SELECT * FROM mensajes_mensaje WHERE conversacion_id = %s", [id_conversacion])
                rows = cursor.fetchall()
                print(rows)
                dataMensajes = []
                for row in rows:
                    dataMensajes.append({
                       'id': row[0],
                        'mensaje': row[1],
                        'fecha': row[2],
                        'url_photo': row[5],
                        'user': row[3],
                        'conversacion': row[4],
                    })

            return Response({'mensajes': dataMensajes}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)