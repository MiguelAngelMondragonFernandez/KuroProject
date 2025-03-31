from .serializers import ConversacionSerializer
from .models import Conversacion
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from users.permissions import IsTokenValid
from django.db import connection

class ConversacionViewSet(viewsets.ModelViewSet):
    queryset = Conversacion.objects.all()
    serializer_class = ConversacionSerializer
    permission_classes = [IsTokenValid]

class getConversacionesByIdUser(APIView):
    permission_classes = [IsTokenValid]
    
    def get(self, request, id_user):
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT id, alias_grupo, participantes FROM conversaciones_conversacion WHERE FIND_IN_SET(%s, participantes) > 0;", [id_user]
                )
                rows = []
                for row in cursor.fetchall():
                    url_photo = None
                    id_conversacion, alias_grupo, participantes = row
                    if not alias_grupo:  # Si alias_grupo está vacío
                        participantes_list = participantes.split(',')
                        other_user_id = next((p for p in participantes_list if p != str(id_user)), None)
                        if other_user_id:
                            cursor.execute(
                                "SELECT name, last_name, url_photo FROM users_user WHERE id = %s;", [other_user_id]
                            )
                            other_user_name = cursor.fetchone()
                            alias_grupo = other_user_name[0] + ' ' + other_user_name[1] if other_user_name else "Desconocido"
                            url_photo = other_user_name[2] if other_user_name else None
                    rows.append({"id": id_conversacion, "nombre_conversacion": alias_grupo, "url_photo": url_photo})
                if not rows:
                    return Response({"error": "No se encontraron conversaciones"}, status=404)
                return Response({"conversaciones": rows}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)