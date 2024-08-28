from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from firebase_admin import auth

# Ensures that the token is valid and decodes it, puts the token in the request state
# In every function, id can be retrieved from request.state.user['uid'], and other claims can be retrieved in a similar way
# We should only ever use the id in the backend that we get from the token, and not the id that is sent from the frontend
# this is because the id from the frontend can be tampered with, but the id from the token is secure

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return await call_next(request)
        print(f"Method: {request.method}, Path: {request.url.path}")
        authorization: str = request.headers.get("Authorization")
        if not authorization:
            return JSONResponse({"detail": "Authorization header is missing"}, status_code=401)

        token = authorization.split(" ")[1]
        try:
            print("Attempting to verify token...")
            # Decode the token
            decoded_token = auth.verify_id_token(token)
            print(f"Token verified: {decoded_token}")
            # Attach user info to request state
            request.state.user = decoded_token
        except Exception as e:
            print(f"Token verification failed: {e}")
            return JSONResponse({"detail": "Invalid token"}, status_code=403)

        response = await call_next(request)
        return response