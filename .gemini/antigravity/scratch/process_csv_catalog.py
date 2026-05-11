import csv
import re
import json
import os

# Materiales clave de "la obra" (basados en src/lib/materials-data.ts)
CORE_MATERIALS = [
    {"name": "Mortero Seco M-7,5", "category": "materiales", "keywords": ["mortero", "m7,5", "m-7,5", "m7.5"]},
    {"name": "Mortero Seco M-5", "category": "materiales", "keywords": ["mortero", "m5", "m-5"]},
    {"name": "Cemento Cola C2", "category": "materiales", "keywords": ["cemento cola", "c2", "porcelanico"]},
    {"name": "Placa Pladur Blanca", "category": "materiales", "keywords": ["placa", "pladur", "blanca", "estandar"]},
    {"name": "Ladrillo Hueco Doble", "category": "materiales", "keywords": ["ladrillo", "hueco", "doble", "totxana"]},
    {"name": "Pintura Plástica Blanca", "category": "pintura", "keywords": ["pintura", "plastica", "blanca"]},
    {"name": "Yeso Manual", "category": "materiales", "keywords": ["yeso", "manual"]},
    {"name": "Gres Porcelánico", "category": "ceramica", "keywords": ["porcelanico", "60x60"]},
    {"name": "Perfil Montante 48", "category": "materiales", "keywords": ["montante", "48mm"]},
    {"name": "Canal 48", "category": "materiales", "keywords": ["canal", "48mm"]},
    {"name": "Inodoro Pack WC", "category": "banos", "keywords": ["pack wc", "porcelana"]},
    {"name": "Grifo Lavabo", "category": "banos", "keywords": ["grifo", "lavabo"]},
    {"name": "Encimera Cocina", "category": "cocinas", "keywords": ["encimera"]},
    {"name": "Fregadero", "category": "cocinas", "keywords": ["fregadero"]},
    {"name": "Cable Eléctrico 1,5mm", "category": "electricidad", "keywords": ["cable", "1,5mm", "seccion"]},
    {"name": "Tubo PVC 110", "category": "fontaneria", "keywords": ["tubo", "pvc", "110"]}
]

CATEGORIES = [
    {"id": "materiales", "name": "Materiales de Construcción"},
    {"id": "ventanas", "name": "Ventanas, Puertas y Armarios"},
    {"id": "cocinas", "name": "Cocinas"},
    {"id": "madera", "name": "Madera"},
    {"id": "ceramica", "name": "Cerámica"},
    {"id": "pintura", "name": "Pintura"},
    {"id": "banos", "name": "Baños"},
    {"id": "fontaneria", "name": "Fontanería"},
    {"id": "climatizacion", "name": "Calefacción y Climatización"},
    {"id": "electricidad", "name": "Electricidad e Iluminación"},
    {"id": "herramientas", "name": "Herramientas"},
    {"id": "ferreteria", "name": "Ferretería"}
]

def clean_text(text):
    if not text: return ""
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace(';', '')
    return text

def parse_price(line):
    # Buscar el patrón de precio más fiable en Obramat: XX,XX€ o similar
    match = re.search(r'(\d+,\d{2})', line)
    if match:
        return float(match.group(1).replace(',', '.'))
    return 0.0

def process_csv(file_path):
    products = []
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
        for line in lines:
            line = line.strip()
            if not line: continue
            
            sku_match = re.search(r'\b([12]\d{7})\b', line)
            if sku_match:
                sku = sku_match.group(1)
                parts = line.split(';')
                name = ""
                for i, part in enumerate(parts):
                    if sku in part:
                        potential_name = part.replace(sku, '').strip()
                        if not potential_name and i > 0:
                            potential_name = parts[i-1].strip()
                        name = clean_text(potential_name)
                        break
                
                price = parse_price(line)
                if name and len(name) > 5:
                    products.append({
                        "sku": sku,
                        "nombre": name,
                        "precio": price
                    })
    return products

def main():
    all_prods = []
    for i in range(1, 6):
        file_path = f"public/csv/{i}.csv"
        if os.path.exists(file_path):
            all_prods.extend(process_csv(file_path))
    
    final_selections = []
    
    # 1. Buscar los materiales específicos de "la obra"
    for core in CORE_MATERIALS:
        matches = []
        for p in all_prods:
            name_lower = p["nombre"].lower()
            # Debe contener al menos 2 keywords o la principal
            match_count = sum(1 for k in core["keywords"] if k in name_lower)
            if match_count >= len(core["keywords"]) // 2 + 1 or core["keywords"][0] in name_lower:
                matches.append(p)
        
        if matches:
            # Ordenar por precio > 0 y longitud de nombre (más largo suele ser más descriptivo)
            matches.sort(key=lambda x: (x["precio"] == 0, -len(x["nombre"])))
            
            # El primero es el "Standard"
            std = matches[0]
            final_selections.append({
                "sku": std["sku"],
                "nombre": f"{core['name']} ({std['nombre']})",
                "categoriaId": core["category"],
                "precio": std["precio"],
                "tipo": "estandar"
            })
            
            # Los siguientes 2 son "Frecuentes"
            for i in range(1, min(3, len(matches))):
                frec = matches[i]
                final_selections.append({
                    "sku": frec["sku"],
                    "nombre": f"{core['name']} Alt ({frec['nombre']})",
                    "categoriaId": core["category"],
                    "precio": frec["precio"],
                    "tipo": "frecuente"
                })

    # Guardar resultado
    with open(".gemini/antigravity/scratch/csv_catalog_refined.json", "w", encoding="utf-8") as f:
        json.dump(final_selections, f, indent=2, ensure_ascii=False)
    
    print(f"Catálogo refinado generado con {len(final_selections)} productos específicos de la obra.")

if __name__ == "__main__":
    main()
