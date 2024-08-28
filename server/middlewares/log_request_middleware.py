from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

class LogRequestBodyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        body = await request.body()
        print(f"Incoming request body: {body.decode()}")
        response = await call_next(request)
        return response