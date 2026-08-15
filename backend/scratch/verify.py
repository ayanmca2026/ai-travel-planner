import httpx
import asyncio
import traceback

async def test_api():
    base_url = "https://ai-travel-planner-olui.onrender.com/api"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        print(f"Testing Health: {base_url}/health")
        try:
            r = await client.get(f"{base_url}/health")
            print(f"Health Response: {r.status_code} - {r.text}")
        except Exception as e:
            print(f"Health check failed: {e}")
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_api())
