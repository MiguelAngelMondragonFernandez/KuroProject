# kuroBack/users/views.py
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Token, User, TokenRecovery
from .serializers import UserSerializer
from datetime import datetime, timedelta
from .permissions import IsTokenValid
from django.core.mail import send_mail


def create_token_recovery(user):
    if not TokenRecovery.objects.filter(user=user).exists():
        token_recovery = TokenRecovery.objects.create(user=user)
        return token_recovery
    else:
        return TokenRecovery.objects.get(user=user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsTokenValid]	


class LoginView(APIView):
    @staticmethod
    def auth(email, password):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users_user WHERE email = %s", [email])
                user_id = cursor.fetchone()
                if user_id is None:
                    return None
                else:
                    if user_id[2] != password:
                        return None
                    else:
                        cursor.execute(
                            "SELECT * FROM users_token WHERE user_id = %s", [user_id[0]]
                        )
                        token = cursor.fetchone()
                        is_expired = token[4] < datetime.now()
                        if is_expired:
                            new_date_expired = datetime.now() + timedelta(minutes=100)
                            cursor.execute(
                                "UPDATE users_token SET expired = %s WHERE user_id = %s",
                                [new_date_expired, user_id[0]],
                            )
                            result = cursor.fetchone()
                        return token[1]
        except User.DoesNotExist:
            return None

    @staticmethod
    def get_user(email, token):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users_user WHERE email = %s", [email])
                user_id = cursor.fetchone()
                if user_id is None:
                    return None
                else:
                    cursor.execute(
                        "SELECT * FROM users_user WHERE id = %s", [user_id[0]]
                    )
                    user = cursor.fetchone()
                    print(user)
                    user = {
                        "id": user[0],
                        "email": user[1],
                        "name": user[10],
                        "first_name": user[3],
                        "last_name": user[8],
                        "is_active": user[4],
                        "is_staff": user[5],
                        "url_photo": user[9],
                        "access_token": token,
                    }
            return user
        except User.DoesNotExist:
            return None

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        token = self.auth(email, password)
        user = self.get_user(email, token)
        if user is None:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if token is None:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        else:
            return Response({"user": user}, status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)
            create_token_recovery(user)
            return Response(
                {"token": str(token.key_pass), "user": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendMail(APIView):
    def post(self, request):
        email = request.data.get("email")
        with connection.cursor() as cursor:
            cursor.execute("SELECT id FROM users_user where email = %s", [email])
            idUser = cursor.fetchone()
            if idUser is None:
                return Response(
                    {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            print(idUser)
            cursor.execute(
                "SELECT key_recovery FROM users_tokenrecovery WHERE user_id = %s",
                [idUser[0]],
            )
            token = cursor.fetchone()
            if token is None:
                return Response(
                    {"error": "Token not found"}, status=status.HTTP_404_NOT_FOUND
                )
            token = token[0]
            reset_link = f"http://localhost:5173/reset/{token}"

            # Envio de correo
            send_mail(
                subject="🔐 Recuperación de contraseña",
                message=f"Hola, usa este enlace para restablecer tu contraseña: {reset_link}",  # Texto plano (fallback)
                from_email="no-reply@errorpages.com",
                recipient_list=[email],
                fail_silently=False,
                html_message=f"""
                <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #0066cc;">Recuperación de contraseña</h2>
                    <p>Hola,</p>
                    <p>Has solicitado restablecer tu contraseña. Para continuar, haz clic en el siguiente botón:</p>
                    <p>
                        <a href="{reset_link}" 
                        style="display: inline-block; padding: 10px 20px; background-color: #0066cc; color: #ffffff; 
                                text-decoration: none; font-weight: bold; border-radius: 5px;">
                            Restablecer contraseña
                        </a>
                    </p>
                    <p>O copia y pega este enlace en tu navegador:</p>
                    <p><a href="{reset_link}" style="color: #0066cc;">{reset_link}</a></p>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                    <p>Saludos,<br>El equipo de ErrorPages</p>
                </body>
                </html>
                """,
            )
            return Response(
                {"message": "Correo enviado con exito"}, status=status.HTTP_200_OK
            )


class Reset(APIView):
    def post(self, request, token):
        password = request.data.get("password")
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT user_id FROM users_tokenrecovery WHERE key_recovery = %s",
                [token],
            )
            idUser = cursor.fetchone()
            if idUser is None:
                return Response(
                    {"error": "Token not found"}, status=status.HTTP_404_NOT_FOUND
                )
            cursor.execute("SELECT * FROM users_user WHERE id = %s", [idUser[0]])
            user = cursor.fetchone()
            if user is None:
                return Response(
                    {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            cursor.execute(
                "UPDATE users_user SET password = %s WHERE id = %s",
                [password, idUser[0]],
            )
            return Response(
                {"message": "Password updated successfully"}, status=status.HTTP_200_OK
            )

class GetUserByEmail(APIView):

    def get(self, request, email):
        print(request.headers)
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, email, name FROM users_user WHERE email = %s", [email])
                user = cursor.fetchone()
                if user is None:
                    return Response({'error': 'Usuario no encontrado.'}, status=404)

                user_data = {
                    'id': user[0],
                    'email': user[1],
                    'name': user[2],
                }
                return Response(user_data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class UpdateUserInfo(APIView):
    permission_classes = [IsTokenValid]  

    def put(self, request, user_id):
        email = request.data.get("email")
        name = request.data.get("name")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        url_photo = request.data.get("url_photo") 

        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id FROM users_user WHERE id = %s", [user_id])
                user = cursor.fetchone()
                if user is None:
                    return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

                user_id = user[0]

                cursor.execute("""
                    UPDATE users_user 
                    SET name = %s, first_name = %s, last_name = %s, url_photo = %s
                    WHERE id = %s
                """, [name, first_name, last_name, url_photo, user_id])

                return Response({"message": "User updated successfully."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateIsActive(APIView):
    def patch(self, request, user_id):
        is_active = request.data.get("is_active")
        if is_active not in [0, 1]:
            return Response(
                {"error": "Invalid value for is_active. Must be 0 or 1."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE users_user SET is_active = %s WHERE id = %s",
                    [is_active, user_id],
                )
                if cursor.rowcount == 0:
                    return Response(
                        {"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND
                    )
            return Response(
                {"message": "is_active actualizado con éxito."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
class UpdatePassword(APIView):
    permission_classes = [IsTokenValid]  

    def put(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with connection.cursor() as cursor:
                # Verificar que el usuario exista
                cursor.execute("SELECT id FROM users_user WHERE email = %s", [email])
                user = cursor.fetchone()
                if user is None:
                    return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

                user_id = user[0]

                # Actualizar la contraseña
                cursor.execute("""
                    UPDATE users_user 
                    SET password = %s
                    WHERE id = %s
                """, [password, user_id])

                return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
