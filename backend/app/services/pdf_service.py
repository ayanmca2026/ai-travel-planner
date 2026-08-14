class PDFService:
    @staticmethod
    def generate_trip_pdf(trip_data: dict) -> bytes:
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        import io
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        
        styles = getSampleStyleSheet()
        title_style = styles['Heading1']
        title_style.alignment = 1
        
        heading2 = styles['Heading2']
        normal = styles['Normal']
        
        elements = []
        
        # Header
        elements.append(Paragraph(f"TripWise AI Itinerary: {trip_data.get('title', 'Your Trip')}", title_style))
        elements.append(Spacer(1, 12))
        
        # Details
        elements.append(Paragraph(f"<b>Destination:</b> {trip_data.get('destination')}", normal))
        elements.append(Paragraph(f"<b>Dates:</b> {trip_data.get('start_date')} to {trip_data.get('end_date')}", normal))
        elements.append(Paragraph(f"<b>Travelers:</b> {trip_data.get('num_travelers')}", normal))
        budget = trip_data.get('total_budget')
        curr = trip_data.get('currency', 'INR')
        if budget:
            elements.append(Paragraph(f"<b>Total Budget:</b> {budget} {curr}", normal))
            
        elements.append(Spacer(1, 24))
        
        # Itinerary
        itinerary = trip_data.get('itinerary', {})
        days = itinerary.get('days', [])
        
        for day in days:
            elements.append(Paragraph(f"Day {day['day_number']}: {day['date']} - {day['title']}", heading2))
            if day.get('theme'):
                elements.append(Paragraph(f"<i>Theme: {day['theme']}</i>", normal))
            elements.append(Spacer(1, 6))
            
            data = [['Time', 'Activity', 'Category', f'Cost ({curr})']]
            for item in day.get('items', []):
                time_str = f"{item.get('start_time', '')} - {item.get('end_time', '')}"
                data.append([
                    time_str,
                    item.get('title', ''),
                    item.get('category', ''),
                    str(item.get('estimated_cost', 0))
                ])
                
            if len(data) > 1:
                t = Table(data, colWidths=[100, 200, 100, 68])
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#3f51b5")),
                    ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                    ('BOTTOMPADDING', (0,0), (-1,0), 12),
                    ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f5f5f5")),
                    ('GRID', (0,0), (-1,-1), 1, colors.black),
                ]))
                elements.append(t)
            else:
                elements.append(Paragraph("No activities planned yet.", normal))
            elements.append(Spacer(1, 18))
            
        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()
