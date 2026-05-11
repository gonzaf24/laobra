import re
import json

CATEGORIES_MAP = [
    {"id": "mat-cons", "nombre": "Materiales de Construcción", "start": 10},
    {"id": "ventanas", "nombre": "Ventanas, Puertas y Revestimientos", "start": 52},
    {"id": "cocinas", "nombre": "Cocinas", "start": 82},
    {"id": "madera", "nombre": "Madera", "start": 104},
    {"id": "almacenamiento", "nombre": "Almacenamiento y Equipamiento", "start": 112},
    {"id": "ceramica", "nombre": "Cerámica", "start": 120},
    {"id": "pintura", "nombre": "Pintura", "start": 156},
    {"id": "banos", "nombre": "Baños", "start": 192},
    {"id": "fontaneria", "nombre": "Fontanería", "start": 242},
    {"id": "clima", "nombre": "Calefacción y Climatización", "start": 294},
    {"id": "energia", "nombre": "Energía Renovable", "start": 328},
    {"id": "electricidad", "nombre": "Electricidad e Iluminación", "start": 338},
    {"id": "herramientas", "nombre": "Herramientas", "start": 386},
    {"id": "ferreteria", "nombre": "Ferretería", "start": 456},
]

def clean_name(name, header):
    name = re.sub(r'[\d,]+€', '', name)
    name = re.sub(r'\b\d{8}\b', '', name)
    name = re.sub(r'[¤\(\)\*\+]', '', name)
    name = name.strip()
    
    if not name or len(name) < 2:
        return header
    
    if header and header.upper() != name.upper():
        return f"{header} {name}".strip()
    
    return name

def extract_catalog():
    try:
        with open("Catalogo_2026_fixed.txt", "r", encoding="utf-8") as f:
            lines = f.readlines()
    except:
        with open("Catalogo 2026 - catalogo-2026-barcelona_22.txt", "r", encoding="utf-8") as f:
            lines = f.read().replace('\r', '\n').split('\n')

    extracted_data = []
    current_cat = CATEGORIES_MAP[0]
    last_header = ""
    current_page = 1
    
    for line in lines:
        line = line.strip()
        if not line: continue

        # Detectar cambio de categoría
        for cat in CATEGORIES_MAP:
            if cat["nombre"].upper() in line.upper() and len(line) < 60:
                current_cat = cat
                current_page = cat["start"]
                break

        # Intentar detectar página (opcional)
        page_match = re.search(r'Pág\.\s*(\d+)', line)
        if page_match:
            current_page = int(page_match.group(1))

        # Detectar headers (Mayúsculas, sin números)
        if line.isupper() and len(line) < 40 and not any(d.isdigit() for d in line):
            if len(line) > 5 and line not in [c["nombre"].upper() for c in CATEGORIES_MAP]:
                last_header = line

        skus = re.findall(r'\b\d{8}\b', line)
        for sku in skus:
            # Precios: buscar todos y quedarse con el último (actual)
            price_matches = re.findall(r'([\d,]+)€', line)
            price = 0.0
            if price_matches:
                try:
                    price = float(price_matches[-1].replace(',', '.'))
                except:
                    pass
            
            # Limpiar nombre
            name_part = line.replace(sku, "")
            for pm in price_matches:
                name_part = name_part.replace(pm + "€", "")
            
            final_name = clean_name(name_part.strip(), last_header)

            extracted_data.append({
                "sku": sku,
                "nombre": final_name,
                "categoriaId": current_cat["id"],
                "subcategoria": "General",
                "formato": "Unidad",
                "precioUnitario": price,
                "paginaCatalogo": current_page,
                "esEstandar": False
            })

    with open(".gemini/antigravity/scratch/extracted_catalog.json", "w", encoding="utf-8") as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)
    
    print(f"Extracted {len(extracted_data)} products.")

if __name__ == "__main__":
    extract_catalog()
