import httpx
try:
    r = httpx.get('http://localhost:8000/api/health')
    print(f"Health Check: {r.status_code} - {r.json()}")
except Exception as e:
    print(f"Backend Offline: {e}")
