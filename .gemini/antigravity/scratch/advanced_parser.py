import re
import json
import os

def clean_text(text):
    if not text: return ""
    text = re.sub(r'["\s;]+', ' ', text).strip()
    return text

def parse_price(text):
    match = re.search(r'(\d+,\d{2})', text)
    if match:
        return float(match.group(1).replace(',', '.'))
    return None

def process_csv_advanced(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    
    products = []
    for i, line in enumerate(lines):
        sku_match = re.search(r'\b([12]\d{7})\b', line)
        if sku_match:
            sku = sku_match.group(1)
            
            # 1. Buscar Nombre arriba (hasta 5 líneas)
            name = ""
            for j in range(i-1, max(0, i-6), -1):
                prev_line = clean_text(lines[j])
                if len(prev_line) > 10 and not re.search(r'\d+,\d{2}', prev_line):
                    name = prev_line
                    break
            
            # 2. Buscar Título (líneas en mayúsculas un poco más arriba)
            title = ""
            for j in range(i-1, max(0, i-15), -1):
                upper_line = clean_text(lines[j])
                if upper_line.isupper() and len(upper_line) > 5 and "UNIDAD" not in upper_line:
                    title = upper_line
                    break
            
            # 3. Buscar Precio abajo (hasta 10 líneas)
            price = 0.0
            for j in range(i, min(len(lines), i+15)):
                p = parse_price(lines[j])
                if p is not None:
                    # Si hay varios precios en la línea, a veces el primero es unidad y segundo kilo
                    # Pero el orden en el CSV parece ser un bloque de precios más abajo
                    # El usuario dice 2,95€ para 10734381, que está en la línea 524 (i+6)
                    price = p
                    break
            
            full_name = f"{title} {name}".strip()
            if not full_name: full_name = clean_text(line)
            
            products.append({
                "sku": sku,
                "nombre": full_name,
                "precio": price,
                "linea": i + 1
            })
    return products

def main():
    # Solo procesamos el primer CSV para validar con el usuario
    all_prods = process_csv_advanced("public/csv/1.csv")
    
    # Validar los ejemplos del usuario
    for p in all_prods:
        if p["sku"] in ["10355464", "10734381"]:
            print(f"DEBUG: {p}")

    # Seleccionar algunos materiales clave para "La Obra"
    # Filtrar por palabras clave
    keywords = ["MORTERO", "CEMENTO", "LADRILLO", "PLACA", "PINTURA", "WC", "GRES"]
    filtered = []
    seen_skus = set()
    
    for p in all_prods:
        if p["sku"] in seen_skus: continue
        if any(k in p["nombre"].upper() for k in keywords):
            filtered.append(p)
            seen_skus.add(p["sku"])
    
    # Ordenar por línea para que mantenga el orden del catálogo
    filtered.sort(key=lambda x: x["linea"])
    
    with open(".gemini/antigravity/scratch/debug_catalog.json", "w", encoding="utf-8") as f:
        json.dump(filtered, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
