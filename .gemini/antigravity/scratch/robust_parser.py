import re
import json

def process_txt_robust(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Dividir por páginas o bloques grandes
    # Intentaremos capturar el título más reciente
    lines = content.split('\n')
    
    products = []
    current_title = "GENERAL"
    current_description = ""
    
    for i, line in enumerate(lines):
        line = line.strip()
        if not line: continue
        
        # Detectar si es un título (Mayúsculas, largo > 5, no empieza por número)
        if line.isupper() and len(line) > 5 and not re.match(r'^\d', line) and "PÁG." not in line and "UNIDAD" not in line:
            current_title = line
            current_description = ""
        elif len(line) > 10 and not re.search(r'\d{8}', line):
            # Guardar como posible descripción
            current_description = line

        # Detectar SKU + Precio
        # Patrón: [8 dígitos] [Precio con €]
        match = re.search(r'\b([12]\d{7})\b\s+(\d+,\d{2})€?', line)
        if match:
            sku = match.group(1)
            price = float(match.group(2).replace(',', '.'))
            
            # El nombre es el Título + la línea de descripción justo encima (si existe)
            name = current_title
            if current_description and len(current_description) < 100:
                name += f" {current_description}"
            
            products.append({
                "sku": sku,
                "nombre": name,
                "precio": price
            })
            
    return products

def main():
    prods = process_txt_robust("Catalogo_2026_fixed.txt")
    
    # Validar ejemplos del usuario
    for p in prods:
        if p["sku"] in ["10355464", "10734381"]:
            print(f"VALIDATED: {p}")
            
    with open(".gemini/antigravity/scratch/robust_catalog.json", "w", encoding="utf-8") as f:
        json.dump(prods, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
