from rest_framework.permissions import BasePermission
from django.db import connection
from datetime import datetime

class IsTokenValid(BasePermission):
    def has_permission(self, request, view):
            header = request.headers.get('Authorization')
            if header is not None:
                token = header.split(' ')[1]
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM users_token WHERE key_pass = %s", [token])
                    result = cursor.fetchone()
                    if result is None:
                        self.detail = 'Token not found'
                        return False
                    else:
                        is_expired = result[4] < datetime.now()
                        if is_expired:
                            self.message = 'Token expired'
                            return False
                        else:
                            
                            return True