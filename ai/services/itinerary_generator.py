from sqlalchemy.ext.asyncio import AsyncSession
from ai.providers.base_provider import get_ai_provider
from app.services.trip_service import TripService
from app.models.trip import TripStatus
from app.models.itinerary import ItineraryDay, ItineraryItem
from app.models.ai_generation import AIGeneration, GenerationStatus
from ai.schemas.itinerary_schema import AIGeneratedTrip
from ai.prompts.itinerary_prompt import ITINERARY_GENERATION
import json
from datetime import timedelta

class TripPlanner:
    def __init__(self, db: AsyncSession, user_id: int, trip_id: int):
        self.db = db
        self.user_id = user_id
        self.trip_id = trip_id
        self.provider = get_ai_provider()

    async def generate(self) -> bool:
        trip = await TripService.get_trip(self.db, self.trip_id, self.user_id)
        
        context = {
            "destination": trip.destination,
            "start_date": trip.start_date,
            "end_date": trip.end_date,
            "num_travelers": trip.num_travelers,
            "budget": trip.total_budget,
            "currency": trip.currency,
            "travel_style": trip.travel_style,
            "interests": trip.interests
        }
        
        gen_record = AIGeneration(user_id=self.user_id, trip_id=self.trip_id, prompt_type="ITINERARY_GENERATION")
        self.db.add(gen_record)
        await self.db.commit()

        try:
            # Fallback to demo for robust testing without keys
            response_text = await self.provider.generate_itinerary(context)
            parsed_data = AIGeneratedTrip.model_validate_json(response_text)
            
            # Save to DB
            for day_data in parsed_data.days:
                day_date = trip.start_date + timedelta(days=day_data.day_number - 1)
                day = ItineraryDay(
                    trip_id=self.trip_id,
                    day_number=day_data.day_number,
                    date=day_date,
                    title=day_data.title,
                    theme=day_data.theme,
                    notes=day_data.notes,
                    total_estimated_cost=day_data.total_estimated_cost
                )
                self.db.add(day)
                await self.db.flush()
                
                for idx, item_data in enumerate(day_data.items):
                    item = ItineraryItem(
                        day_id=day.id,
                        title=item_data.title,
                        description=item_data.description,
                        place_name=item_data.place_name,
                        category=item_data.category,
                        start_time=item_data.start_time,
                        end_time=item_data.end_time,
                        duration_minutes=item_data.duration_minutes,
                        estimated_cost=item_data.estimated_cost,
                        tips=item_data.tips,
                        sort_order=idx
                    )
                    self.db.add(item)

            trip.status = TripStatus.GENERATED
            gen_record.status = GenerationStatus.SUCCESS
            await self.db.commit()
            return True
            
        except Exception as e:
            gen_record.status = GenerationStatus.FAILED
            gen_record.error_message = str(e)
            await self.db.commit()
            raise e
