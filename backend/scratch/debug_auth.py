import httpx
import asyncio

async def main():
    url = "https://ai-travel-planner-olui.onrender.com/api/auth/register"
    headers = {
        "Origin": "https://ai-travel-planner-puce-three.vercel.app",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type"
    }
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        print("--- Testing Options (CORS Preflight) ---")
        try:
            res_opt = await client.options(url, headers=headers)
            print("OPTIONS Status:", res_opt.status_code)
            print("OPTIONS Headers:", dict(res_opt.headers))
        except Exception as e:
            print("OPTIONS failed:", e)

        print("\n--- Testing Registration with ayanghoshmyself@gmail.com ---")
        payload = {
            "email": "ayanghoshmyself@gmail.com",
            "password": "Password123!",
            "full_name": "Ayan Ghosh"
        }
        try:
            res = await client.post(url, json=payload, headers={"Origin": "https://ai-travel-planner-puce-three.vercel.app"})
            print("POST Status:", res.status_code)
            print("POST Headers:", dict(res.headers))
            print("POST Body:", res.text)
        except Exception as e:
            print("POST failed:", e)

if __name__ == "__main__":
    asyncio.run(main())
