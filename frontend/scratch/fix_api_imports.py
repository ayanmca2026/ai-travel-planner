import os

api_dir = r"d:\MyProject\ai-travel-planner\frontend\src\api"

for filename in os.listdir(api_dir):
    if filename.endswith(".ts") and filename != "client.ts":
        filepath = os.path.join(api_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content.replace("import api from './api';", "import api from './client';")
        
        if content != new_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed: {filename}")
