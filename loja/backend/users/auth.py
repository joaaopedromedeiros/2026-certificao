from ninja.security import HttpBearer
import jwt
from django.conf import settings
from .models import Usuario


class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )

            user = Usuario.objects.get(id=payload["user_id"])
            return user

        except Usuario.DoesNotExist:
            return None
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None