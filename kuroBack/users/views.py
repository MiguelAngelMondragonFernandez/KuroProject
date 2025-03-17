# kuroBack/users/views.py
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Token, User, TokenRecovery
from .serializers import UserSerializer
from datetime import datetime, timedelta
from .permissions import IsTokenValid

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
                        cursor.execute("SELECT * FROM users_token WHERE user_id = %s", [user_id[0]])
                        token = cursor.fetchone()
                        is_expired = token[4] < datetime.now()
                        if is_expired:
                            new_date_expired = datetime.now() + timedelta(minutes=1)
                            cursor.execute("UPDATE users_token SET expired = %s WHERE user_id = %s", [new_date_expired, user_id[0]])
                            result = cursor.fetchone()
                        return token[1]
        except User.DoesNotExist:
            return None

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = self.auth(email, password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'token': user}, status=status.HTTP_200_OK)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)
            create_token_recovery(user)
            return Response({'token': str(token.key_pass), 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)