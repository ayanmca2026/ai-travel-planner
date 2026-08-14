from ai.providers.base_provider import AIProvider
from typing import Dict, Any
import json
from datetime import timedelta

class DemoProvider(AIProvider):
    def _generate_generic_day(self, day_num: int) -> dict:
        return {
            "day_number": day_num,
            "title": "Explore the City",
            "theme": "Local Discovery",
            "notes": "A generic day full of exploration.",
            "total_estimated_cost": 2500,
            "items": [
                {"title": "Morning Walk", "description": "Explore the center", "category": "ACTIVITY", "start_time": "09:00", "end_time": "10:30", "duration_minutes": 90, "estimated_cost": 0},
                {"title": "Museum Visit", "description": "Local history museum", "category": "ATTRACTION", "start_time": "11:00", "end_time": "13:00", "duration_minutes": 120, "estimated_cost": 500},
                {"title": "Local Lunch", "description": "Authentic food", "category": "RESTAURANT", "start_time": "13:30", "end_time": "14:30", "duration_minutes": 60, "estimated_cost": 800},
                {"title": "Market Shopping", "description": "Souvenirs", "category": "SHOPPING", "start_time": "15:00", "end_time": "17:00", "duration_minutes": 120, "estimated_cost": 1200}
            ]
        }
        
    def _get_destination_pool(self, dest_name: str) -> list:
        # Pre-built realistic activities for 10 destinations
        pools = {
            "darjeeling": [
                {"title": "Tiger Hill Sunrise", "category": "ATTRACTION", "cost": 300},
                {"title": "Batasia Loop", "category": "ATTRACTION", "cost": 100},
                {"title": "Tea Garden Tour", "category": "ACTIVITY", "cost": 500},
                {"title": "Toy Train Ride", "category": "TRANSPORT", "cost": 1500},
                {"title": "Glenary's Cafe", "category": "RESTAURANT", "cost": 800},
            ],
            "goa": [
                {"title": "Baga Beach", "category": "ATTRACTION", "cost": 0},
                {"title": "Fort Aguada", "category": "ATTRACTION", "cost": 50},
                {"title": "Dudhsagar Trek", "category": "ACTIVITY", "cost": 1500},
                {"title": "Seafood Shack Lunch", "category": "RESTAURANT", "cost": 1200},
                {"title": "Flea Market", "category": "SHOPPING", "cost": 2000},
            ],
            "jaipur": [
                {"title": "Amer Fort", "category": "ATTRACTION", "cost": 500},
                {"title": "Hawa Mahal", "category": "ATTRACTION", "cost": 200},
                {"title": "Chokhi Dhani", "category": "RESTAURANT", "cost": 1200},
                {"title": "Johari Bazaar", "category": "SHOPPING", "cost": 2000},
                {"title": "Jantar Mantar", "category": "ATTRACTION", "cost": 250},
            ],
            "manali": [
                {"title": "Solang Valley", "category": "ACTIVITY", "cost": 2000},
                {"title": "Rohtang Pass", "category": "ATTRACTION", "cost": 3000},
                {"title": "Hidimba Temple", "category": "ATTRACTION", "cost": 50},
                {"title": "Mall Road", "category": "SHOPPING", "cost": 1000},
                {"title": "Cafe 1947", "category": "RESTAURANT", "cost": 900},
            ],
            "rishikesh": [
                {"title": "River Rafting", "category": "ACTIVITY", "cost": 1500},
                {"title": "Ganga Aarti", "category": "ATTRACTION", "cost": 0},
                {"title": "Laxman Jhula", "category": "ATTRACTION", "cost": 0},
                {"title": "Beatles Ashram", "category": "ATTRACTION", "cost": 600},
                {"title": "Chotiwala Restaurant", "category": "RESTAURANT", "cost": 500},
            ],
            "delhi": [
                {"title": "Red Fort", "category": "ATTRACTION", "cost": 250},
                {"title": "Qutub Minar", "category": "ATTRACTION", "cost": 250},
                {"title": "Chandni Chowk", "category": "ACTIVITY", "cost": 1000},
                {"title": "India Gate", "category": "ATTRACTION", "cost": 0},
                {"title": "Paranthe Wali Gali", "category": "RESTAURANT", "cost": 400},
            ],
            "mumbai": [
                {"title": "Gateway of India", "category": "ATTRACTION", "cost": 0},
                {"title": "Marine Drive", "category": "ATTRACTION", "cost": 0},
                {"title": "Elephanta Caves", "category": "ACTIVITY", "cost": 800},
                {"title": "Colaba Causeway", "category": "SHOPPING", "cost": 1500},
                {"title": "Leopold Cafe", "category": "RESTAURANT", "cost": 1200},
            ],
            "bengaluru": [
                {"title": "Lalbagh Botanical Garden", "category": "ATTRACTION", "cost": 100},
                {"title": "Bangalore Palace", "category": "ATTRACTION", "cost": 250},
                {"title": "Cubbon Park", "category": "ATTRACTION", "cost": 0},
                {"title": "Commercial Street", "category": "SHOPPING", "cost": 1500},
                {"title": "CTR Dosa", "category": "RESTAURANT", "cost": 300},
            ],
            "gangtok": [
                {"title": "Rumtek Monastery", "category": "ATTRACTION", "cost": 50},
                {"title": "Nathula Pass", "category": "ACTIVITY", "cost": 2500},
                {"title": "MG Marg", "category": "SHOPPING", "cost": 1000},
                {"title": "Tsomgo Lake", "category": "ATTRACTION", "cost": 1500},
                {"title": "Taste of Tibet", "category": "RESTAURANT", "cost": 600},
            ],
            "shillong": [
                {"title": "Umiam Lake", "category": "ATTRACTION", "cost": 100},
                {"title": "Elephant Falls", "category": "ATTRACTION", "cost": 50},
                {"title": "Shillong Peak", "category": "ATTRACTION", "cost": 30},
                {"title": "Police Bazar", "category": "SHOPPING", "cost": 1000},
                {"title": "Cafe Shillong", "category": "RESTAURANT", "cost": 700},
            ],
        }
        
        dest_lower = dest_name.lower()
        for k, v in pools.items():
            if k in dest_lower:
                return v
        return []

    async def generate_itinerary(self, context: Dict[str, Any]) -> str:
        dest_name = context.get('destination', '')
        start_date = context.get('start_date')
        end_date = context.get('end_date')
        
        from datetime import datetime, date
        if isinstance(start_date, str):
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        if isinstance(end_date, str):
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
            
        num_days = (end_date - start_date).days + 1 if start_date and end_date else 3

        pool = self._get_destination_pool(dest_name)
        
        days = []
        for i in range(num_days):
            day_num = i + 1
            if not pool:
                days.append(self._generate_generic_day(day_num))
            else:
                items = []
                cost_sum = 0
                for j in range(5):  # 5 activities per day
                    act = pool[(i * 5 + j) % len(pool)]
                    start_h = 9 + (j * 2)
                    items.append({
                        "title": act["title"],
                        "description": f"Enjoy the best of {dest_name}",
                        "category": act["category"],
                        "start_time": f"{start_h:02d}:00",
                        "end_time": f"{start_h+1:02d}:30",
                        "duration_minutes": 90,
                        "estimated_cost": act["cost"]
                    })
                    cost_sum += act["cost"]
                
                days.append({
                    "day_number": day_num,
                    "title": f"Discovering {dest_name} - Day {day_num}",
                    "theme": "Exploration",
                    "notes": "Enjoy the local sights.",
                    "total_estimated_cost": cost_sum,
                    "items": items
                })

        return json.dumps({"days": days})

    async def chat(self, messages: list) -> str:
        last_msg = messages[-1]['content'].lower()
        if "budget" in last_msg:
            return "For an Indian student budget, I recommend taking local transport and eating at local dhabas."
        elif "pack" in last_msg:
            return "Pack comfortable clothes, a reusable water bottle, and a good power bank."
        return "I am your AI travel assistant. Feel free to ask about your itinerary or budget tips!"
